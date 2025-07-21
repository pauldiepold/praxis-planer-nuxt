export default eventHandler(async () => {
  const students = await useDrizzle().select().from(tables.students).all()
  return students
}) 