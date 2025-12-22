import { db, schema } from 'hub:db'
import { getAllMondaysOfYear, getYearsWithMissingWeeks } from '../../utils/date'

export default eventHandler(async () => {
  const currentYear = new Date().getFullYear()
  const weeks = await db.select({ weekStartDate: schema.weeks.weekStartDate }).from(schema.weeks).all()
  const weekStartDates = weeks.map((w: { weekStartDate: string }) => w.weekStartDate)
  const yearsWithMissing = getYearsWithMissingWeeks(weekStartDates, currentYear, 5)
  if (!yearsWithMissing || yearsWithMissing.length === 0) {
    return { year: null, created: 0 }
  }
  const year = yearsWithMissing[0]
  if (year === undefined) {
    return { year: null, created: 0 }
  }
  const mondays = getAllMondaysOfYear(year)
  const missingMondays = mondays.filter(monday => !weekStartDates.includes(monday))
  const now = new Date()
  const newWeeks = missingMondays.map(monday => ({
    weekStartDate: String(monday), // explizit als String
    status: 'free',
    studentId: null,
    notes: null,
    createdAt: now,
    updatedAt: now,
  } as WeekInsert))
  const batchSize = 5
  if (newWeeks.length > 0) {
    for (let i = 0; i < newWeeks.length; i += batchSize) {
      const batch = newWeeks.slice(i, i + batchSize)
      await db.insert(schema.weeks).values(batch)
    }
  }
  return { year, created: newWeeks.length }
})
