# Anforderungen für die Migration: Pflegeplaner zu Nuxt (Nuxthub)

## Projektüberblick

Der Pflegeplaner ist eine Webanwendung zur Verwaltung von Pflegepraktikantinnen und deren Wochenplanung in einer Kinderarztpraxis. Die App bietet eine Kalenderansicht, Verwaltung von Schülerinnen, Pflegeschulen und Betrieben. Ziel ist es, die Anwendung als moderne Web-App mit Nuxt (Nuxthub) neu zu implementieren.

---

## Authentifizierung
- Anmeldung ausschließlich für autorisierte Nutzer:innen (E-Mail-Whitelist in .env, Authentifizierung via GitHub)
- E-Mail-Adressen der berechtigten Nutzer:innen werden in der .env-Datei gepflegt (z.B. `ALLOWED_EMAILS`)
- Login und Logout über GitHub (nuxt-auth-utils)
- Nicht angemeldete Nutzer:innen werden auf die Login-Seite weitergeleitet
- Nur eine Rolle: Praxispersonal (keine weiteren Berechtigungsstufen)

---

## Kernfunktionen

1. **Kalenderansicht (Jahres-/Wochenplaner)**
   - Übersicht aller Wochen eines Jahres
   - Status pro Woche: "Frei", "Belegt" (mit Schülerin), "Urlaub"
   - Details zu belegten Wochen (Schülerin, Schule, Betrieb, Notizen)
   - Jahr hinzufügen/löschen

2. **Schülerinnen-Verwaltung**
   - Anlegen, Bearbeiten, Löschen von Schülerinnen
   - Zuordnung zu Pflegeschule und Betrieb
   - Kontaktdaten (Telefon, E-Mail)

3. **Pflegeschulen-Verwaltung**
   - Anlegen, Bearbeiten, Löschen von Schulen
   - Ansprechpartner, Kontaktdaten

4. **Betriebe-Verwaltung**
   - Anlegen, Bearbeiten, Löschen von Betrieben
   - Ansprechpartner, Kontaktdaten

5. **Notizen**
   - Pro Woche können Notizen hinterlegt werden

6. **Dark Mode**
   - Umschaltbar (optional, aber gewünscht)

---

## Feedback & UI
- Alle Nutzeraktionen (Erfolg/Fehler) geben direktes Feedback über Nuxt UI Komponenten
- Es werden ausschließlich Nuxt UI Komponenten verwendet
- Die Bedienung bleibt stets einfach und übersichtlich

---

## Datenmodell (Entitäten)

### Schülerin (Student)
- id: number
- name: string
- school_id: number | null
- company_id: number | null
- phone: string | null
- email: string | null

### Pflegeschule (School)
- id: number
- name: string
- contact_person: string | null
- phone: string | null
- email: string | null

### Betrieb (Company)
- id: number
- name: string
- contact_person: string | null
- phone: string | null
- email: string | null

### Woche (Week)
- id: number
- year: number
- week_number: number (1-52/53)
- status: 'free' | 'booked' | 'vacation'
- student_id: number | null
- notes: string | null

### Pflichtfelder
- Alle Felder ohne `| null` im Datenmodell sind Pflichtfelder
- Felder mit `| null` sind optional

---

## Beziehungen
- Eine Schülerin gehört zu einer Schule und einem Betrieb (optional)
- Eine Woche kann einer Schülerin zugeordnet sein (wenn status = 'booked')

---

## Technische Anforderungen
- **Frontend:** Nuxt 3 (Vue 3, Composition API)
- **UI:** NuxtUi
- **Datenhaltung:** Über Nuxthub SQL Database
- **Deployment:** Nuxthub
- **Sprache:** Deutsch
- **Responsives Design**
- **Authentifizierung:** nuxt-auth-utils mit GitHub, E-Mail-Whitelist in .env
- **Logout:** Logout-Button vorhanden
- **Feedback:** Immer Rückmeldung über Nuxt UI Komponenten
- **Deployment:** Automatisch bei Push auf main
- **Dokumentation:** Kurze, stets aktuelle README.md

---

## Zusätzliche Hinweise
- Die App soll einfach, übersichtlich und für nicht-technische Nutzer:innen verständlich sein
- Das Datenmodell kann bei Bedarf erweitert werden (z.B. Felder für Praktikumszeitraum, Statushistorie)
- Keine Import-/Exportfunktion
- Backups werden zu einem späteren Zeitpunkt ergänzt
- Keine Mehrsprachigkeit, nur Deutsch
- Keine speziellen Anforderungen an Barrierefreiheit
- Performanceoptimierung ist nicht notwendig (geringe Datenmenge)

---

**ToDo-Liste für die nächsten Schritte**

1. Projekt-Setup auf Nuxthub (Nuxt 3, NuxtUi, nuxt-auth-utils, .env anlegen)
2. Authentifizierung mit GitHub und E-Mail-Whitelist einrichten
3. Logout-Button implementieren
4. Datenbank: Tabelle "Schülerin" (ohne Relationen) anlegen
5. Beispiel-Daten für Schülerinnen einfügen
6. API/Server-Route zum Auslesen der Schülerinnen-Daten erstellen
7. Einfache Seite, die die Schülerinnen mit Nuxt UI Komponenten anzeigt
8. Deployment auf Nuxthub testen
9. README.md mit kurzer Doku ergänzen
10. Feedbackschleife: Funktion prüfen, Feedback einholen, ggf. anpassen

**Diese Datei dient als Grundlage für die Neuimplementierung mit Nuxt auf Nuxthub.** 