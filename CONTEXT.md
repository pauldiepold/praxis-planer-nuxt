# Domain Context

Diese Datei sammelt die kanonische Sprache des Projekts. Bei Konflikten gilt diese Datei.

## Glossar

### Kinder- und Jugendarztpraxis Holstein-Diepold & Dr. Diepold
Offizieller Name der Praxis. **Immer exakt diese Schreibweise verwenden** — insbesondere
das "Dr." vor dem zweiten Namen weglassen oder andere Reihenfolgen wählen ist falsch.

Verwendet in: Site-Name (`nuxt.config.ts`), JSON-LD `MedicalClinic.name`, Title-Template,
Footer, Impressum, Descriptions.

Kurzform für interne Verweise: **die Praxis**.

### Berufsausübungsgemeinschaft (BAG)
Rechtsform der Praxis (Gemeinschaftspraxis von Thomas Holstein-Diepold und
Dr. med. Katharina Diepold). Im JSON-LD als `alternateName` hinterlegt.

### Pflege-Planer
Interner SPA-Bereich unter `/pflege-planer/**` für Schülerinnen-/Wochenplanung.
Auth-geschützt, **nicht** öffentlich, `noindex` via `routeRules`.

### Aktuelles
Nuxt-Content-Collection (`type: 'page'`) für Praxis-Neuigkeiten. `page` bleibt erhalten,
damit Nuxt Studio den WYSIWYG-Markdown-Editor bietet (`data` kann das nicht, siehe ADR
0001). Es gibt aber **keine** `[...path].vue`-Route: die Einträge werden ausschließlich
als Liste auf der **Startseite** ausgegeben (alte `/aktuelles/**`-URLs → 301 auf `/`).
Weil nichts unter `/aktuelles/*` prerendert wird, entsteht auch **kein** Sitemap-Eintrag
je Neuigkeit. Felder: die von `page` mitgelieferten `title`/`description` (im Studio mit
deutschen Labels) plus `datum`, `farbe` (Akzent `grün|gelb|rot`), `anzeigenAb`,
`anzeigenBis`; der Markdown-Body ist wie üblich Teil der `page`-Collection.

### Sichtbarkeitsfenster (`anzeigenAb` / `anzeigenBis`)
Zwei optionale Daten an einer Neuigkeit, die steuern, in welchem Zeitraum sie
öffentlich ist. Sichtbar, solange `anzeigenAb ≤ heute ≤ anzeigenBis` (beide Grenzen
**inklusive**, beide optional):

- `anzeigenAb` leer → von Anfang an sichtbar; gesetzt → erscheint erst ab diesem Tag
  (geplante Veröffentlichung).
- `anzeigenBis` leer → dauerhaft sichtbar; gesetzt → verschwindet ab dem Folgetag
  (Ablauf).

Außerhalb des Fensters ist der Eintrag schlicht **nicht in der Liste** (es gibt weder
URL noch Sitemap-Eintrag). Der Filter greift zur **Build-Zeit**; ein täglicher
Rebuild sorgt dafür, dass Einträge ohne manuelles Zutun am Stichtag auf- bzw.
abtauchen. Gedacht für zeitlich begrenzte Hinweise (z. B. temporäre Schließzeiten).
Dauerhaftes Entfernen = Eintrag löschen (es gibt kein manuelles `hidden`-Flag mehr).
