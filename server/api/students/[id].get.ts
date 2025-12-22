import { db, schema } from 'hub:db'
import { eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const studentId = Number(id)

  const student = await db
    .select()
    .from(schema.students)
    .where(eq(schema.students.id, studentId))
    .get()

  if (!student) {
    throw createError({
      statusCode: 404,
      message: 'Schülerin nicht gefunden',
    })
  }

  return student
})
