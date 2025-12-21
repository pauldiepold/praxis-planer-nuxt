import { db, schema } from 'hub:db'

import { eq } from 'drizzle-orm'
export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const companyId = Number(id)

  // First, check if the company exists
  const company = await db.select().from(schema.companies).where(eq(schema.companies.id, companyId)).get()
  
  if (!company) {
    throw createError({
      statusCode: 404,
      message: 'Company not found'
    })
  }

  // Check if there are any students referencing this company
  const studentsWithCompany = await db
    .select()
    .from(schema.students)
    .where(eq(schema.students.companyId, companyId))
    .all()

  if (studentsWithCompany.length > 0) {
    throw createError({
      statusCode: 400,
      message: `Der Betrieb "${company.name}" kann nicht gelöscht werden, da er noch mit ${studentsWithCompany.length} Schüler(inne)n verknüpft ist. Bitte entfernen oder weisen Sie diese Schüler zuerst neu zu.`
    })
  }

  // If no students are referencing this company, we can safely delete it
  return await db
    .delete(schema.companies)
    .where(eq(schema.companies.id, companyId))
    .returning()
    .get()
})