import { z } from 'zod'

const createSchoolSchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich').max(255, 'Name darf maximal 255 Zeichen haben'),
  contactPerson: z.string().max(255, 'Ansprechpartner darf maximal 255 Zeichen haben').optional().or(z.literal('')).nullish(),
  phone: z.string().max(50, 'Telefonnummer darf maximal 50 Zeichen haben').optional().or(z.literal('')).nullish(),
  email: z.string().email('Ungültige E-Mail-Adresse').max(255, 'E-Mail darf maximal 255 Zeichen haben').optional().or(z.literal('')).nullish()
})

export default eventHandler(async (event) => {
  const body = await readBody(event)

  // Validierung
  const validationResult = createSchoolSchema.safeParse(body)
  if (!validationResult.success) {
    throw createError({
      statusCode: 400,
      message: 'Validierungsfehler',
      data: {
        errors: validationResult.error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      }
    })
  }

  const validatedData = validationResult.data

  const newSchool = await useDrizzle().insert(tables.schools).values({
    name: validatedData.name,
    contactPerson: validatedData.contactPerson,
    phone: validatedData.phone,
    email: validatedData.email,
    createdAt: new Date()
  }).returning().get()

  return newSchool
})
