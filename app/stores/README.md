# Entities Store

Der `entities` Store verwaltet global die Daten für Schulen, Schülerinnen und Betriebe in der Anwendung.

## Features

- **Zentrale Datenverwaltung**: Alle Entitäten werden in einem Store gespeichert
- **Automatische Updates**: Nach CRUD-Operationen wird der Store automatisch aktualisiert
- **Performance-Optimierung**: Daten werden nur einmal geladen und wiederverwendet
- **TypeScript-Support**: Vollständig typisiert
- **Composable-API**: Einfache Verwendung über `useEntities()`

## Verwendung

### Direkte Store-Verwendung

```typescript
import { useEntitiesStore } from '~/stores/entities'

const store = useEntitiesStore()

// Daten laden
await store.fetchAll()

// Auf Daten zugreifen
console.log(store.schools)
console.log(store.students)
console.log(store.companies)

// Select-Optionen
console.log(store.schoolOptions)
console.log(store.studentOptions)
console.log(store.companyOptions)
```

### Composable-Verwendung (Empfohlen)

```typescript
import { useEntities } from '~/composables/useEntities'

const { 
  schools, 
  students, 
  companies,
  schoolOptions,
  studentOptions,
  companyOptions,
  addSchool,
  updateSchool,
  deleteSchool,
  // ... weitere Funktionen
} = useEntities()

// Daten sind automatisch reaktiv
console.log(schools.value)
console.log(studentOptions.value)
```

## Store-Struktur

### State

```typescript
{
  schools: School[]
  students: Student[]
  companies: Company[]
  isLoading: {
    schools: boolean
    students: boolean
    companies: boolean
  }
  error: {
    schools: string | null
    students: string | null
    companies: string | null
  }
}
```

### Getters

- `schoolOptions`: Schulen als Select-Optionen
- `studentOptions`: Schülerinnen als Select-Optionen
- `companyOptions`: Betriebe als Select-Optionen
- `studentOptionsWithSchool`: Schülerinnen mit Schulinformationen
- `studentsWithDetails`: Schülerinnen mit Schul- und Betriebsinformationen

### Actions

#### Laden
- `fetchAll()`: Lädt alle Entitäten
- `fetchSchools()`: Lädt nur Schulen
- `fetchStudents()`: Lädt nur Schülerinnen
- `fetchCompanies()`: Lädt nur Betriebe

#### CRUD-Operationen
- `addSchool(data)`: Schule hinzufügen
- `updateSchool(id, data)`: Schule aktualisieren
- `deleteSchool(id)`: Schule löschen
- `addStudent(data)`: Schülerin hinzufügen
- `updateStudent(id, data)`: Schülerin aktualisieren
- `deleteStudent(id)`: Schülerin löschen
- `addCompany(data)`: Betrieb hinzufügen
- `updateCompany(id, data)`: Betrieb aktualisieren
- `deleteCompany(id)`: Betrieb löschen

## Composable-Features

Das `useEntities` Composable bietet zusätzliche Hilfsfunktionen:

### Hilfsfunktionen
- `getSchoolById(id)`: Schule anhand ID finden
- `getStudentById(id)`: Schülerin anhand ID finden
- `getCompanyById(id)`: Betrieb anhand ID finden
- `getSchoolName(id)`: Schulname anhand ID
- `getStudentName(id)`: Schülerinnenname anhand ID
- `getCompanyName(id)`: Betriebsname anhand ID

## Initialisierung

Der Store wird automatisch beim App-Start über das Plugin `plugins/entities.client.ts` initialisiert und lädt alle Daten.

## Best Practices

1. **Composable verwenden**: Nutze `useEntities()` statt direkter Store-Zugriff
2. **Reaktive Daten**: Alle Daten sind reaktiv und werden automatisch aktualisiert
3. **Fehlerbehandlung**: Überprüfe `isLoading` und `error` States
4. **Performance**: Daten werden nur einmal geladen und wiederverwendet

## Beispiel: Dropdown in einem Formular

```vue
<script setup>
const { schoolOptions, studentOptions } = useEntities()
</script>

<template>
  <USelectMenu
    :items="schoolOptions"
    value-key="id"
    placeholder="Schule wählen"
  />
  
  <USelectMenu
    :items="studentOptions"
    value-key="id"
    placeholder="Schülerin wählen"
  />
</template>
```

## Beispiel: CRUD-Operationen

```vue
<script setup>
const { addSchool, updateSchool, deleteSchool } = useEntities()

const handleAdd = async (schoolData) => {
  try {
    await addSchool(schoolData)
    // Store wird automatisch aktualisiert
  } catch (error) {
    console.error('Fehler beim Hinzufügen:', error)
  }
}
</script>
``` 