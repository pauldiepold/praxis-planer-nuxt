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
Nuxt-Content-Collection für Praxis-Neuigkeiten unter `/aktuelles`. Posts mit
`hidden: true` sind im UI versteckt und bekommen `noindex`-Meta.
