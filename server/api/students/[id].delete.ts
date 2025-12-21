import { db, schema } from 'hub:db'
import { eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const studentId = Number(id)

  // First check if the student exists
  const student = await db.select().from(schema.students).where(eq(schema.students.id, studentId)).get()
  
  if (!student) {
    throw createError({
      statusCode: 404,
      message: 'Student not found'
    })
  }

  // Einfach löschen
  return await db
    .delete(schema.students)
    .where(eq(schema.students.id, studentId))
    .returning()
    .get()
}) 