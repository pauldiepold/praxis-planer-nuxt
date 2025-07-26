import { useDrizzle, tables } from '../../utils/drizzle'
import { fillNextMissingWeeks } from '../../utils/date'

export default eventHandler(async () => {
  const db = useDrizzle()
  return await fillNextMissingWeeks(db, tables, 5)
}) 