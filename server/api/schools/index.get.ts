export default eventHandler(async () => {
  const schools = await useDrizzle().select().from(tables.schools).all()
  return schools
})
