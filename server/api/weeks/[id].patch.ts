import { z } from 'zod'
import { db, schema } from 'hub:db'
import { eq } from 'drizzle-orm'

const updateWeekSchema = z.object({
  status: z.enum(['free', 'booked', 'vacation', 'reserved']),
  studentId: z.number().nullable(),
  companyId: z.number().nullable(),
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

  // Validierung basierend auf Status
  if (validatedData.status === 'reserved') {
    // Bei 'reserved': companyId muss gesetzt sein, studentId muss null sein
    if (validatedData.companyId === null) {
      throw createError({
        statusCode: 400,
        message: 'Bei Status "reserviert" muss ein Betrieb zugeordnet werden',
      })
    }
    if (validatedData.studentId !== null) {
      throw createError({
        statusCode: 400,
        message: 'Bei Status "reserviert" kann keine Schülerin zugeordnet werden',
      })
    }
  }
  else if (validatedData.status === 'booked') {
    // Bei 'booked': studentId muss gesetzt sein, companyId muss null sein
    if (validatedData.studentId === null) {
      throw createError({
        statusCode: 400,
        message: 'Bei Status "belegt" muss eine Schülerin zugeordnet werden',
      })
    }
    if (validatedData.companyId !== null) {
      throw createError({
        statusCode: 400,
        message: 'Bei Status "belegt" kann kein Betrieb zugeordnet werden',
      })
    }
  }
  else {
    // Bei 'free' oder 'vacation': beide müssen null sein
    if (validatedData.studentId !== null) {
      throw createError({
        statusCode: 400,
        message: 'Bei Status "frei" oder "Urlaub" kann keine Schülerin zugeordnet werden',
      })
    }
    if (validatedData.companyId !== null) {
      throw createError({
        statusCode: 400,
        message: 'Bei Status "frei" oder "Urlaub" kann kein Betrieb zugeordnet werden',
      })
    }
  }

  const updatedWeek = await db.update(schema.weeks).set({
    status: validatedData.status,
    studentId: validatedData.studentId,
    companyId: validatedData.companyId,
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
