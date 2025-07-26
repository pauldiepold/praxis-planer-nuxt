// Hilfsfunktionen für Kalenderwochen-Logik
// Diese Datei liegt in shared/utils, damit sie sowohl im Server als auch im App-Code genutzt werden kann.

/**
 * Gibt alle Montage (ISO-Strings) eines Jahres zurück.
 * @param year z.B. 2024
 */
export function getAllMondaysOfYear(year: number): string[] {
  const mondays: string[] = []
  // Erster Tag des Jahres
  const date = new Date(year, 0, 1)
  // Zum ersten Montag springen
  while (date.getDay() !== 1) {
    date.setDate(date.getDate() + 1)
  }
  // Alle Montage bis Jahresende sammeln
  while (date.getFullYear() === year) {
    mondays.push(date.toISOString().slice(0, 10))
    date.setDate(date.getDate() + 7)
  }
  return mondays
}

/**
 * Gibt alle Jahre zurück, für die im Zeitraum [startYear, startYear+maxYears-1] noch nicht alle Montage als weekStartDate existieren.
 * @param existingWeekStartDates Array aller weekStartDate-Strings in der DB
 * @param startYear Startjahr (z.B. aktuelles Jahr)
 * @param maxYears Maximale Jahre im Voraus
 * @returns Array von Jahren, für die noch Wochen fehlen
 */
export function getYearsWithMissingWeeks(existingWeekStartDates: string[], startYear: number, maxYears: number): number[] {
  const yearsWithMissing: number[] = []
  for (let year = startYear; year < startYear + maxYears; year++) {
    const mondays = getAllMondaysOfYear(year)
    const missing = mondays.some(monday => !existingWeekStartDates.includes(monday))
    if (missing) yearsWithMissing.push(year)
  }
  return yearsWithMissing
}

/**
 * Legt alle fehlenden Wochen für das nächste Jahr mit fehlenden Wochen an.
 * Gibt das Jahr und die Anzahl der neu angelegten Wochen zurück.
 * @param db Drizzle-DB-Instanz
 * @param tables Tabellen-Objekt
 * @param maxYears Maximale Jahre im Voraus
 */
export async function fillNextMissingWeeks(db: any, tables: any, maxYears = 5) {
  const currentYear = new Date().getFullYear()
  const weeks = await db.select({ weekStartDate: tables.weeks.weekStartDate }).from(tables.weeks).all()
  const weekStartDates = weeks.map((w: any) => w.weekStartDate)
  const yearsWithMissing = getYearsWithMissingWeeks(weekStartDates, currentYear, maxYears)
  if (yearsWithMissing.length === 0) {
    return { year: null, created: 0 }
  }
  const year = yearsWithMissing[0]
  const mondays = getAllMondaysOfYear(year)
  const missingMondays = mondays.filter(monday => !weekStartDates.includes(monday))
  const now = new Date()
  const newWeeks = missingMondays.map(monday => ({
    weekStartDate: String(monday), // explizit als String
    status: 'free',
    studentId: null,
    notes: null,
    createdAt: now,
    updatedAt: now
  }))
  const batchSize = 5
  if (newWeeks.length > 0) {
    for (let i = 0; i < newWeeks.length; i += batchSize) {
      const batch = newWeeks.slice(i, i + batchSize)
      await db.insert(tables.weeks).values(batch)
    }
  }
  return { year, created: newWeeks.length }
} 