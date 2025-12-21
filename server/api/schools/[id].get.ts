import { db, schema } from 'hub:db'
import { eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const schoolId = Number(id)

  const school = await db
    .select()
    .from(schema.schools)
    .where(eq(schema.schools.id, schoolId))
    .get()

  if (!school) {
    throw createError({
      statusCode: 404,
      message: 'Schule nicht gefunden'
    })
  }

  return school
}) 