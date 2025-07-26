import { useDrizzle, tables } from '../../utils/drizzle'

export default eventHandler(async () => {
  const db = useDrizzle()

  // Alle eindeutigen Jahre aus den weekStartDates extrahieren
  const weeks = await db
    .select({ weekStartDate: tables.weeks.weekStartDate })
    .from(tables.weeks)
    .all()

  // Jahre extrahieren und eindeutig machen
  const years = [...new Set(weeks.map(w => w.weekStartDate.substring(0, 4)))]
  const availableYears = years.map(y => parseInt(y)).sort((a, b) => a - b)

  return { years: availableYears }
}) 