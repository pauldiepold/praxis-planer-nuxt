import { z } from 'zod'

const updateSchoolSchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich').max(255, 'Name darf maximal 255 Zeichen haben'),
  contactPerson: z.string().max(255, 'Ansprechpartner darf maximal 255 Zeichen haben').optional(),
  phone: z.string().max(50, 'Telefonnummer darf maximal 50 Zeichen haben').optional(),
  email: z.string().email('Ungültige E-Mail-Adresse').max(255, 'E-Mail darf maximal 255 Zeichen haben').optional()
})

export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const body = await readBody(event)

  // Validierung
  const validationResult = updateSchoolSchema.safeParse(body)
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

  const updatedSchool = await useDrizzle().update(tables.schools).set({
    name: validatedData.name,
    contactPerson: validatedData.contactPerson,
    phone: validatedData.phone,
    email: validatedData.email
  }).where(eq(tables.schools.id, Number(id))).returning().get()

  if (!updatedSchool) {
    throw createError({
      statusCode: 404,
      message: 'School not found'
    })
  }

  return updatedSchool
})
