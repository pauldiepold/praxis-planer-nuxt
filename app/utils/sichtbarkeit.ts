// Reines Sichtbarkeits-Prädikat für Neuigkeiten (siehe ADR 0001).
// Eine Neuigkeit ist sichtbar, solange `anzeigenAb ≤ heute ≤ anzeigenBis` gilt –
// beide Grenzen inklusive, beide optional. Vergleich rein datumsbasiert über den
// ISO-String (`YYYY-MM-DD`), tagesgenau. Ein verdrehtes Fenster (`anzeigenAb`
// nach `anzeigenBis`) ergibt automatisch „nie sichtbar"; es gibt bewusst keine
// zusätzliche Validierung.
export function istSichtbar(
  anzeigenAb: string | undefined,
  anzeigenBis: string | undefined,
  heute: string,
): boolean {
  return (!anzeigenAb || anzeigenAb <= heute) && (!anzeigenBis || heute <= anzeigenBis)
}

// „heute" als tagesgenauer ISO-String (UTC). Zur Build-Zeit (Prerender)
// ausgewertet – ein täglicher Rebuild sorgt dafür, dass Einträge am Stichtag
// auf- bzw. abtauchen.
export function heuteIso(): string {
  return new Date().toISOString().slice(0, 10)
}
