# Authentifizierung

Das Projekt hat **zwei voneinander unabhängige Anmeldungen**, beide über GitHub, aber mit
getrennten OAuth-Apps, getrennten Sessions und getrennten Berechtigten-Listen. Man kann in
genau einer, in beiden oder in keiner angemeldet sein.

| | Pflege-Planer | Redaktion (Nuxt Studio) |
| --- | --- | --- |
| Einstieg | `/auth/github` | `/_studio` |
| Umsetzung | `nuxt-auth-utils` | `nuxt-studio` (eigenes Auth) |
| Session-Cookie | `nuxt-session` | `studio-session` (+ `studio-session-check`) |
| Berechtigte | `NUXT_ALLOWED_USERS` (GitHub-**Logins**) | `STUDIO_GITHUB_MODERATORS` (**E-Mails**) |
| Ziel nach Login | `/pflege-planer` | zurück auf `/anmelden` |

Gemeinsamer Einstiegspunkt für beide ist der **Anmelde-Hub** `/anmelden` (im Footer
verlinkt, `noindex`, aus der Sitemap ausgeschlossen). Er zeigt je eine Karte pro Zugang mit
dem jeweiligen Anmeldestatus. Siehe `CONTEXT.md`.

## Einrichtung

### 1. Zwei GitHub-OAuth-Apps anlegen

Unter [GitHub Developer Settings](https://github.com/settings/developers) je eine App für
Planer und Studio. Callback-URLs:

| App | Callback (Dev) | Callback (Prod) |
| --- | --- | --- |
| Planer | `http://localhost:3000/auth/github` | `https://praxis-hd.de/auth/github` |
| Studio | `http://localhost:3000/__nuxt_studio/auth/github` | `https://praxis-hd.de/__nuxt_studio/auth/github` |

### 2. Umgebungsvariablen

`cp env.example .env` und ausfüllen – die Datei dokumentiert jede Variable. Das
Session-Passwort des Planers erzeugt `openssl rand -base64 32` (mindestens 32 Zeichen).

Zwei Fallstricke:

- **`STUDIO_GITHUB_MODERATORS` ist nicht optional.** Ist die Variable leer, entfällt die
  Zugangsprüfung komplett (`moderators.length > 0 && …`) – jeder GitHub-Account bekommt
  dann eine Studio-Session und damit Zugriff auf `/__nuxt_studio/medias/**` und
  `/__nuxt_studio/ai/**`. Nur das Publish scheitert noch, weil dafür Schreibrechte am
  Repository nötig sind.
- **`STUDIO_GITHUB_CLIENT_ID` und `_SECRET` müssen auch zur Build-Zeit gesetzt sein.**
  `nuxt-studio` leitet das Passwort des `studio-session`-Cookies beim Build aus
  `md5(clientId + clientSecret)` ab. Fehlen die Werte im Build-Environment (bei uns:
  Cloudflare Pages), ist das Passwort `md5('')` – öffentlich bekannt, die Session also
  fälschbar. Der Fehler ist zur Laufzeit nicht sichtbar.

## Schutzschichten

- **Client** (`app/middleware/auth.global.ts`, global): schickt nicht angemeldete Besucher
  von `/pflege-planer/**` auf `/anmelden`. **Nur dieser Pfad** ist geschützt, die
  öffentliche Website nicht.
- **Server** (`server/middleware/auth.ts`): schützt alle `/api/**` außer `/auth/**` und
  `/api/_auth/**`. Neue öffentliche Endpoints müssen unter diesen Pfaden liegen.
- **Studio**: das Modul schützt seine eigenen Endpoints über `requireStudioAuth`; unsere
  Server-Middleware greift dort nicht (`/__nuxt_studio/**` ist kein `/api/**`).

## Fehlerpfade

`server/routes/auth/github.get.ts` leitet nicht freigeschaltete Accounts auf
`/anmelden?fehler=nicht-berechtigt`, technische Fehler auf `/anmelden?fehler=oauth`; der
Hub zeigt den Grund an. Das Studio wirft bei nicht freigeschalteten Accounts eine englische
403-Seite aus dem Modul – bewusst nicht abgefangen.

## Produktion

Variablen als Secrets im Cloudflare-Pages-Projekt hinterlegen (für Build **und** Runtime)
und die Callback-URLs beider OAuth-Apps auf die Produktionsdomain setzen.
