export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const schoolId = Number(id)

  // First check if the school exists
  const school = await useDrizzle().select().from(tables.schools).where(eq(tables.schools.id, schoolId)).get()
  
  if (!school) {
    throw createError({
      statusCode: 404,
      message: 'School not found'
    })
  }

  // Check if there are any students referencing this school
  const studentsWithSchool = await useDrizzle()
    .select()
    .from(tables.students)
    .where(eq(tables.students.schoolId, schoolId))
    .all()

  if (studentsWithSchool.length > 0) {
    throw createError({
      statusCode: 400,
      message: `Die Schule "${school.name}" kann nicht gelöscht werden, da sie noch mit ${studentsWithSchool.length} Schüler(inne)n verknüpft ist. Bitte entfernen oder weisen Sie diese Schüler zuerst neu zu.`
    })
  }

  // If no students are referencing this school, we can safely delete it
  const deletedSchool = await useDrizzle()
    .delete(tables.schools)
    .where(eq(tables.schools.id, schoolId))
    .returning()
    .get()

  return deletedSchool
})
