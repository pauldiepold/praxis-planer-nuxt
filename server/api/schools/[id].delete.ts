import { db, schema } from 'hub:db'
import { eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const schoolId = Number(id)

  // First check if the school exists
  const school = await db.select().from(schema.schools).where(eq(schema.schools.id, schoolId)).get()
  
  if (!school) {
    throw createError({
      statusCode: 404,
      message: 'School not found'
    })
  }

  // Check if there are any students referencing this school
  const studentsWithSchool = await db
    .select()
    .from(schema.students)
    .where(eq(schema.students.schoolId, schoolId))
    .all()

  if (studentsWithSchool.length > 0) {
    throw createError({
      statusCode: 400,
      message: `Die Schule "${school.name}" kann nicht gelöscht werden, da sie noch mit ${studentsWithSchool.length} Schüler(inne)n verknüpft ist. Bitte entfernen oder weisen Sie diese Schüler zuerst neu zu.`
    })
  }

  // If no students are referencing this school, we can safely delete it
  return await db
    .delete(schema.schools)
    .where(eq(schema.schools.id, schoolId))
    .returning()
    .get()
})
