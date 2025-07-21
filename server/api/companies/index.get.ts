export default eventHandler(async () => {
  const companies = await useDrizzle().select().from(tables.companies).all()
  return companies
}) 