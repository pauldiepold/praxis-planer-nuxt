import { z } from 'zod'
import { db, schema } from 'hub:db'
import { eq } from 'drizzle-orm'

const updateWeekSchema = z.object({
  status: z.enum(['free', 'booked', 'vacation']),
  studentId: z.number().nullable(),
  notes: z.string().max(1000, 'Notizen können maximal 1000 Zeichen haben').optional().or(z.literal('')).nullish(),
})

export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const body = await readBody(event)

  // Validierung
  const validationResult = updateWeekSchema.safeParse(body)
  if (!validationResult.success) {
    throw createError({
      statusCode: 400,
      message: 'Validierungsfehler',
      data: {
        errors: validationResult.error.issues.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      },
    })
  }

  const validatedData = validationResult.data

  // Wenn Status auf 'free' gesetzt wird, sollte studentId null sein
  if (validatedData.status === 'free' && validatedData.studentId !== null) {
    throw createError({
      statusCode: 400,
      message: 'Bei Status "frei" kann keine Schülerin zugeordnet werden',
    })
  }

  // Wenn Status auf 'booked' gesetzt wird, sollte eine Schülerin zugeordnet sein
  if (validatedData.status === 'booked' && validatedData.studentId === null) {
    throw createError({
      statusCode: 400,
      message: 'Bei Status "belegt" muss eine Schülerin zugeordnet werden',
    })
  }

  const updatedWeek = await db.update(schema.weeks).set({
    status: validatedData.status,
    studentId: validatedData.studentId,
    notes: validatedData.notes,
    updatedAt: new Date(),
  }).where(eq(schema.weeks.id, Number(id))).returning().get()

  if (!updatedWeek) {
    throw createError({
      statusCode: 404,
      message: 'Woche nicht gefunden',
    })
  }

  return updatedWeek
})
