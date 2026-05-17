# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projekt

Nuxt-4-App mit zwei strikt getrennten Bereichen:

1. **Öffentliche Praxis-Website** – Inhalte teils über **Nuxt Content + Nuxt Studio**, damit die Praxisinhaberinnen Texte selbst pflegen.
2. **Pflege-Planer** (`/pflege-planer/**`) – interne SPA für Schülerinnen-/Wochenplanung. Auth-geschützt via GitHub OAuth + Whitelist.

Änderungen an einem Bereich sollen den anderen nicht treffen.

## Befehle

```bash
pnpm dev           # Dev-Server
pnpm build         # → dist/ (Deploy via wrangler)
pnpm lint[:fix]
pnpm typecheck        # TypeScript-Typen prüfen — immer mit Exit-Code prüfen: `pnpm typecheck 2>&1; echo "Exit: $?"`
pnpm db:generate   # Drizzle: Migration aus Schema
pnpm db:migrate
```

Kein Test-Setup.

## Deployment

Cloudflare Pages direkt via `wrangler` (kein NuxtHub-Dashboard). D1-Binding `DB` in `wrangler.jsonc`. Nuxt Studio publiziert in den Branch, der in `nuxt.config.ts → studio.repository` eingetragen ist.

## Gotchas

- **`ssr: false`** – die App ist eine SPA mit statischem Prerender. Default ist `'/**': { prerender: true }`; alles Dynamische (Planer, Studio) muss in `routeRules` explizit auf `prerender: false`.
- **Zwei Auth-Schichten**:
  - Client (`app/middleware/auth.ts`, global) blockiert **nur** `/pflege-planer/**`.
  - Server (`server/middleware/auth.ts`) schützt **alle** `/api/**` außer `/auth/**` und `/api/_auth/**`. Neue öffentliche Endpoints müssen unter diesen Pfaden liegen.
- **Pflege-Planer-Seiten** brauchen passendes Layout in `routeRules` + `prerender: false`.
- **DB-Typen** kommen aus `shared/types/db.ts` (Drizzle-inferred). Nicht parallel deklarieren.
- **Pflege-Planer-State** läuft über den Pinia-Store `app/stores/entities.ts` – Mutationen dort, nicht direkt `$fetch` in Komponenten.
- **DB-Schemaänderung**: `pnpm db:generate` → Migration prüfen → `pnpm db:migrate`. Migrationen liegen in `server/db/migrations/sqlite`.
- **Komponenten-Präfixe**: `Praxis*` = öffentliche Website, `Pflege*` = Planer, `Base*` = geteilt.
- **UI/Sprache**: ausschließlich Nuxt UI (`U*`), UI-Texte deutsch (Locale in `app/app.vue`).
- **Stil**: `@nuxt/eslint` mit `stylistic: true` – Formatierung via `pnpm lint:fix`, nicht manuell.

## Agent skills

### Issue tracker

Issues leben in GitHub Issues dieses Repos. Siehe `docs/agents/issue-tracker.md`.

### Triage labels

Standard-Vokabular: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. Siehe `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` + `docs/adr/` im Repo-Root. Siehe `docs/agents/domain.md`.
