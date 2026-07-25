# Aktuelles als `page`-Collection mit Build-Zeit-Sichtbarkeitsfenster und täglichem Rebuild

Neuigkeiten (`aktuelles`) bleiben eine `page`-Collection, verlieren aber ihre
Einzelseiten: es gibt **keine** `[...path].vue`-Route und keine `/aktuelles`-Route mehr,
die Einträge erscheinen nur noch als Liste auf der Startseite. Sichtbarkeit steuert ein
optionales Datumsfenster (`anzeigenAb` / `anzeigenBis`, beide Grenzen inklusive), das den
bisherigen `hidden`-Boolean ersetzt. Der Fensterfilter wird zur **Build-Zeit**
ausgewertet, und ein **täglich per GitHub-Action-Cron ausgelöster Deploy-Hook** baut die
Seite neu, damit Einträge am Stichtag ohne manuelles Zutun auf- bzw. abtauchen.

## Considered Options

- **Client-seitige Auswertung des Fensters** — verworfen: Die Seite ist statisch
  vorgerendert (`ssr: true` + `prerender: true`). Ein abgelaufener Eintrag steckt dann
  bereits im ausgelieferten HTML und würde erst nach der Hydration entfernt →
  sichtbares **Flackern** bei jedem Aufruf. Build-Zeit-Filter + täglicher Rebuild
  vermeidet das (HTML ist immer korrekt), zum Preis einer kleinen Cron-Infrastruktur.
- **Umstellung auf `type: 'data'`** — zunächst gewählt, dann **verworfen**: `data` hätte
  ein schlankeres Studio-Formular gegeben, aber Nuxt Studio bietet den
  **WYSIWYG-Markdown-Editor** ausschließlich für `page`-Collections. Bei `data` mit
  `.md`-Body erscheint kein brauchbares Formular (Studio bricht in
  `generateContentFromMarkdownDocument` mit `Cannot read properties of undefined
  (reading 'type')` ab). Da die Redakteurinnen den Editor behalten wollen, bleibt es bei
  `page`. Die Nachteile von `page` (Sitemap-Einträge, aufgeblähtes Settings-Panel) werden
  anders entschärft: die `[...path].vue`-Route wird entfernt, wodurch keine
  `/aktuelles/*`-URLs mehr prerendert werden → weder Route noch Sitemap-Eintrag je Eintrag.

## Consequences

- `page` bleibt erhalten → der WYSIWYG-Editor in Studio funktioniert wie bisher, der
  Markdown-Body wird automatisch geführt (kein explizites `body`-Feld nötig).
- Weil keine `/aktuelles/*`-Route mehr prerendert wird, entstehen **keine** Sitemap-
  Einträge je Neuigkeit; der frühere `defineSitemapSchema`-Block entfällt. Alte, evtl.
  indexierte URLs werden per `routeRules` 301 auf `/` umgeleitet.
- Ein täglicher Rebuild ist Voraussetzung dafür, dass das Sichtbarkeitsfenster ohne
  manuellen Push greift. Fällt der Cron aus, bleiben Einträge bis zum nächsten Deploy
  im zuletzt gebauten Zustand stehen.
