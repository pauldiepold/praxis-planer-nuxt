import { useDrizzle, tables } from '../../utils/drizzle'
import { getYearsWithMissingWeeks } from '../../utils/date'

export default eventHandler(async () => {
  const db = useDrizzle()
  const currentYear = new Date().getFullYear()
  const maxYears = 5

  // Alle weekStartDates aus der DB holen
  const weeks = await db.select({ weekStartDate: tables.weeks.weekStartDate }).from(tables.weeks).all()
  const weekStartDates = weeks.map(w => w.weekStartDate)

  // Fehlende Jahre ermitteln
  const yearsWithMissing = getYearsWithMissingWeeks(weekStartDates, currentYear, maxYears)
  const nextYear = yearsWithMissing.length > 0 ? yearsWithMissing[0] : null

  return { nextYear }
}) 