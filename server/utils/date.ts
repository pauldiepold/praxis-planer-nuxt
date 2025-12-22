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
