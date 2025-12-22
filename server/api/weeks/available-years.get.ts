import { db, schema } from 'hub:db'

export default eventHandler(async () => {
  // Alle eindeutigen Jahre aus den weekStartDates extrahieren
  const weeks = await db
    .select({ weekStartDate: schema.weeks.weekStartDate })
    .from(schema.weeks)
    .all()

  // Jahre extrahieren und eindeutig machen
  const years = [...new Set(weeks.map(w => w.weekStartDate.substring(0, 4)))]
  const availableYears = years.map(y => parseInt(y)).sort((a, b) => a - b)

  return { years: availableYears }
})
