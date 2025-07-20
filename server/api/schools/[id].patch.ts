export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const body = await readBody(event)

  const updatedSchool = await useDrizzle().update(tables.schools).set({
    name: body.name,
    contactPerson: body.contactPerson,
    phone: body.phone,
    email: body.email
  }).where(eq(tables.schools.id, Number(id))).returning().get()

  if (!updatedSchool) {
    throw createError({
      statusCode: 404,
      message: 'School not found'
    })
  }

  return updatedSchool
})
