import { useDrizzle, tables } from '../../utils/drizzle'
import { eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const schoolId = Number(id)

  const school = await useDrizzle()
    .select()
    .from(tables.schools)
    .where(eq(tables.schools.id, schoolId))
    .get()

  if (!school) {
    throw createError({
      statusCode: 404,
      message: 'Schule nicht gefunden'
    })
  }

  return school
}) 