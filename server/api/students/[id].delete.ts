export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const studentId = Number(id)

  // First check if the student exists
  const student = await useDrizzle().select().from(tables.students).where(eq(tables.students.id, studentId)).get()
  
  if (!student) {
    throw createError({
      statusCode: 404,
      message: 'Student not found'
    })
  }

  // Einfach löschen
  const deletedStudent = await useDrizzle()
    .delete(tables.students)
    .where(eq(tables.students.id, studentId))
    .returning()
    .get()

  return deletedStudent
}) 