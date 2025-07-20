export default eventHandler(async (event) => {
  const body = await readBody(event)

  const newSchool = await useDrizzle().insert(tables.schools).values({
    name: body.name,
    contactPerson: body.contactPerson,
    phone: body.phone,
    email: body.email,
    createdAt: new Date()
  }).returning().get()

  return newSchool
})
