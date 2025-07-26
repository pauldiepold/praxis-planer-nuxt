import { useDrizzle, tables } from '../../utils/drizzle'
import { eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const studentId = Number(id)

  const student = await useDrizzle()
    .select()
    .from(tables.students)
    .where(eq(tables.students.id, studentId))
    .get()

  if (!student) {
    throw createError({
      statusCode: 404,
      message: 'Schülerin nicht gefunden'
    })
  }

  return student
}) 