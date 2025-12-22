import { z } from 'zod'
import { db, schema } from 'hub:db'

const createStudentSchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich').max(255, 'Name kann maximal 255 Zeichen haben'),
  schoolId: z.number().nullable(),
  companyId: z.number().nullable(),
  phone: z.string().max(50, 'Telefonnummer kann maximal 50 Zeichen haben').optional().or(z.literal('')).nullish(),
  email: z.string().email('Ungültige E-Mail-Adresse').max(255, 'E-Mail kann maximal 255 Zeichen haben').optional().or(z.literal('')).nullish(),
})

export default eventHandler(async (event) => {
  const body = await readBody(event)

  // Validierung
  const validationResult = createStudentSchema.safeParse(body)
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

  return await db.insert(schema.students).values({
    name: validatedData.name,
    schoolId: validatedData.schoolId,
    companyId: validatedData.companyId,
    phone: validatedData.phone,
    email: validatedData.email,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning().get()
})
