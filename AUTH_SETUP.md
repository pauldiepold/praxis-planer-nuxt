# GitHub Authentifizierung Setup

## Einrichtung

1. **GitHub OAuth App erstellen:**
   
   - Gehe zu [GitHub Developer Settings](https://github.com/settings/developers)
   - Klicke auf "New OAuth App"
   - Fülle die Felder aus:
     - **Application name:** Praxis Planer
     - **Homepage URL:** `http://localhost:3000` (für Entwicklung)
     - **Authorization callback URL:** `http://localhost:3000/auth/github`
   - Speichere die **Client ID** und **Client Secret**

2. **Umgebungsvariablen konfigurieren:**
   
   Kopiere `env.example` zu `.env` und setze die erforderlichen Werte:
   
   ```bash
   cp env.example .env
   ```
   
   Bearbeite die `.env`-Datei:
   ```
   NUXT_SESSION_PASSWORD=dein-super-geheimes-session-passwort-mit-mindestens-32-zeichen
   NUXT_ALLOWED_USERS=dein-github-username,weitere-github-usernames
   NUXT_OAUTH_GITHUB_CLIENT_ID=deine-github-client-id
   NUXT_OAUTH_GITHUB_CLIENT_SECRET=dein-github-client-secret
   ```

3. **Session-Passwort generieren:**
   
   Das `NUXT_SESSION_PASSWORD` muss mindestens 32 Zeichen lang sein:
   
   ```bash
   openssl rand -base64 32
   ```

4. **Erlaubte Benutzer konfigurieren:**
   
   In `NUXT_ALLOWED_USERS` kannst du eine kommagetrennte Liste von GitHub-Benutzernamen angeben, die sich anmelden dürfen.

## Funktionalität

### Geschützte Routen
- **Frontend-Seiten:** Alle Seiten außer der Startseite sind geschützt
- **API-Endpunkte:** Alle API-Routen außer `/auth/*` und `/api/_auth/*` sind geschützt

### Authentifizierung
- **Login:** GitHub OAuth über `/auth/github`
- **Session:** Automatische Session-Verwaltung mit Cookies
- **Logout:** Session-Löschung über Navbar-Button

### Middleware
- **Client-Middleware:** `app/middleware/auth.ts` - Leitet nicht-authentifizierte Benutzer zur Startseite weiter
- **Server-Middleware:** `server/middleware/auth.ts` - Schützt alle API-Routen

### Komponenten
- **LayoutNavbar:** Navigation mit Auth-State und Logout-Funktionalität
- **AuthState:** Vue-Komponente für sichere Auth-Zustandsanzeige

## Sicherheit

- Sessions sind verschlüsselt und in Cookies gespeichert
- Nur GitHub-Benutzer aus der erlaubten Liste können sich anmelden
- Automatische Weiterleitung bei fehlender Authentifizierung
- Sichere Session-Konfiguration

## Produktions-Setup

Für die Produktion:
1. Ändere die GitHub OAuth App URLs auf deine Domain
2. Setze die Umgebungsvariablen auf deinem Server
3. Stelle sicher, dass `NUXT_SESSION_PASSWORD` sicher gespeichert ist 