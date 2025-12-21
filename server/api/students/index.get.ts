import { db, schema } from 'hub:db'

export default eventHandler(async () => {
  return await db.select().from(schema.students).all()
})