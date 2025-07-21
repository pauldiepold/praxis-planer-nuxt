export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const companyId = Number(id)

  // First check if the company exists
  const company = await useDrizzle().select().from(tables.companies).where(eq(tables.companies.id, companyId)).get()
  
  if (!company) {
    throw createError({
      statusCode: 404,
      message: 'Company not found'
    })
  }

  // Check if there are any students referencing this company
  const studentsWithCompany = await useDrizzle()
    .select()
    .from(tables.students)
    .where(eq(tables.students.companyId, companyId))
    .all()

  if (studentsWithCompany.length > 0) {
    throw createError({
      statusCode: 400,
      message: `Der Betrieb "${company.name}" kann nicht gelöscht werden, da er noch mit ${studentsWithCompany.length} Schüler(inne)n verknüpft ist. Bitte entfernen oder weisen Sie diese Schüler zuerst neu zu.`
    })
  }

  // If no students are referencing this company, we can safely delete it
  const deletedCompany = await useDrizzle()
    .delete(tables.companies)
    .where(eq(tables.companies.id, companyId))
    .returning()
    .get()

  return deletedCompany
}) 