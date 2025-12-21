import { db, schema } from 'hub:db'
import { fillNextMissingWeeks } from '../../utils/date'

export default eventHandler(async () => {
  return await fillNextMissingWeeks(db, schema, 5)
})