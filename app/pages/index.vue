<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

const nextYear = ref<number|null>(null)
const isLoading = ref(false)
const isSuccess = ref(false)
const isError = ref(false)
const feedbackMsg = ref('')
const isWeeksLoading = ref(false)
const isWeeksError = ref(false)



const selectedYear = ref(new Date().getFullYear())

const years = ref<number[]>([])
const isLoadingYears = ref(false)

interface WeekEntry {
  id: number
  weekStartDate: string
  status: 'free' | 'booked' | 'vacation'
  studentId: number | null
  studentName: string | null
  schoolName: string | null
  notes: string | null
}

const weeksRaw = ref<WeekEntry[]>([])
const weeksByMonth = computed<Record<number, WeekEntry[]>>(() => {
  const grouped: Record<number, WeekEntry[]> = {}
  weeksRaw.value.forEach(week => {
    const month = new Date(week.weekStartDate).getMonth()
    if (!grouped[month]) grouped[month] = []
    grouped[month].push(week)
  })
  return grouped
})

async function fetchAvailableYears() {
  isLoadingYears.value = true
  try {
    const res = await $fetch<{ years: number[] }>('/api/weeks/available-years')
    years.value = res.years
    
    const currentYear = new Date().getFullYear()
    
    // Wähle das aktuelle Jahr aus, falls es verfügbar ist
    if (years.value.includes(currentYear)) {
      selectedYear.value = currentYear
    } else if (years.value.length > 0) {
      // Fallback: Wähle das erste verfügbare Jahr
      selectedYear.value = years.value[0]
    }
  } catch {
    console.error('Fehler beim Laden der verfügbaren Jahre')
  } finally {
    isLoadingYears.value = false
  }
}

async function fetchNextYear() {
  isLoading.value = true
  isError.value = false
  isSuccess.value = false
  feedbackMsg.value = ''
  try {
    const res = await $fetch<{ nextYear: number|null }>('/api/weeks/next-missing-year')
    nextYear.value = res.nextYear
  } catch {
    isError.value = true
    feedbackMsg.value = 'Fehler beim Laden des nächsten Jahres.'
  } finally {
    isLoading.value = false
  }
}

async function handleFillWeeks() {
  if (!nextYear.value) return
  isLoading.value = true
  isError.value = false
  isSuccess.value = false
  feedbackMsg.value = ''
  try {
    const res = await $fetch<{ year: number|null, created: number }>('/api/weeks/fill-missing', { method: 'POST' })
    if (res.created > 0) {
      isSuccess.value = true
      feedbackMsg.value = `Kalenderwochen für ${res.year} wurden angelegt.`
      
      // Aktualisiere die verfügbaren Jahre
      await fetchAvailableYears()
      
      // Wenn das neue Jahr hinzugefügt wurde, wähle es aus und lade die Daten
      if (res.year && years.value.includes(res.year)) {
        selectedYear.value = res.year
        await fetchWeeksForYear(res.year)
      }
    } else {
      feedbackMsg.value = 'Es wurden keine neuen Wochen angelegt.'
    }
    await fetchNextYear()
  } catch {
    isError.value = true
    feedbackMsg.value = 'Fehler beim Anlegen der Kalenderwochen.'
  } finally {
    isLoading.value = false
  }
}

async function fetchWeeksForYear(year: number) {
  isWeeksLoading.value = true
  isWeeksError.value = false
  try {
    const res = await $fetch<WeekEntry[]>(`/api/weeks?year=${year}`)
    weeksRaw.value = res
  } catch {
    isWeeksError.value = true
  } finally {
    isWeeksLoading.value = false
  }
}

watch(selectedYear, (year) => {
  fetchWeeksForYear(year)
})

// Funktion zum Aktualisieren einer Woche
function handleWeekUpdated(updatedWeek: { id: number; status: 'free' | 'booked' | 'vacation'; studentId: number | null; notes: string | null; studentName: string | null; schoolName: string | null }) {
  // Finde die Woche in der Liste und aktualisiere sie
  const weekIndex = weeksRaw.value.findIndex(w => w.id === updatedWeek.id)
  if (weekIndex !== -1) {
    // Aktualisiere die Woche mit den neuen Daten
    weeksRaw.value[weekIndex] = {
      ...weeksRaw.value[weekIndex],
      status: updatedWeek.status,
      studentId: updatedWeek.studentId,
      notes: updatedWeek.notes,
      // Verwende die übergebenen Daten oder lade sie neu
      studentName: updatedWeek.studentName || (updatedWeek.studentId ? 'Laden...' : null),
      schoolName: updatedWeek.schoolName || (updatedWeek.studentId ? 'Laden...' : null)
    }
    
    // Wenn eine Schülerin zugeordnet wurde, lade die Details
    if (updatedWeek.studentId) {
      loadStudentDetails(updatedWeek.studentId, weekIndex)
    }
  }
}

// Entities Composable verwenden
const { students, schools } = useEntities()

// Funktion zum Laden der Schülerin-Details
async function loadStudentDetails(studentId: number, weekIndex: number) {
  try {
    const student = students.value.find(s => s.id === studentId)
    if (student && weekIndex !== -1 && weeksRaw.value[weekIndex]) {
      weeksRaw.value[weekIndex].studentName = student.name
      
      // Schule-Name laden, falls verfügbar
      if (student.schoolId) {
        const school = schools.value.find(s => s.id === student.schoolId)
        weeksRaw.value[weekIndex].schoolName = school?.name || null
      } else {
        weeksRaw.value[weekIndex].schoolName = null
      }
    }
  } catch (error) {
    console.error('Fehler beim Laden der Schülerin-Details:', error)
  }
}

onMounted(async () => {
  await fetchAvailableYears()
  await fetchNextYear()
  if (years.value.length > 0) {
    await fetchWeeksForYear(selectedYear.value)
  }
})

definePageMeta({
  title: 'Startseite',
  colorMode: 'dark'
})
</script>

<template>
  <div class="mx-auto p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Jahresplaner</h1>
      <div class="flex items-center gap-4">
        <div class="flex flex-col gap-2">
          <label class="flex flex-col gap-1">
            <span class="text-sm font-medium text-muted">Jahr</span>
          </label>
          <USelect
            v-model="selectedYear"
            :items="years"
            class="min-w-[100px]"
            :placeholder="isLoadingYears ? 'Lade...' : 'Jahr auswählen'"
            :loading="isLoadingYears"
          />
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div class="bg-muted rounded-lg shadow-md mb-6">
      <div class="p-6">
        <div class="flex justify-center gap-8">
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-success rounded"/>
            <span>Frei</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-error rounded"/>
            <span>Belegt</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-warning rounded"/>
            <span>Urlaub</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Calendar Container -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <div v-for="month in 12" :key="month" class="bg-muted rounded-lg shadow-xl border-t-4 border-primary hover:shadow-2xl transition-all duration-200 cursor-pointer">
        <div class="p-4">
          <h2 class="text-2xl font-bold text-center mb-4">
            {{ new Date(selectedYear, month-1, 1).toLocaleString('de-DE', { month: 'long', year: 'numeric' }) }}
          </h2>
          <div v-if="weeksByMonth[month-1] && weeksByMonth[month-1].length > 0" class="space-y-3">
            <CalendarWeek
              v-for="week in weeksByMonth[month-1]"
              :key="week.id"
              :week="week"
              @updated="handleWeekUpdated"
            />
          </div>
          <div v-else class="text-sm text-muted text-center py-4">
            Keine Wochen in diesem Monat
          </div>
        </div>
      </div>
    </div>
    
    <!-- Trennelement -->
    <div class="border-t border-border my-8"/>
    
    <!-- Jahr hinzufügen Button -->
    <div class="flex justify-center">
      <UButton
        v-if="nextYear !== null"
        color="primary"
        variant="outline"
        :loading="isLoading"
        icon="i-lucide-plus"
        @click="handleFillWeeks"
      >
        Kalenderwochen für {{ nextYear }} anlegen
      </UButton>
      <div v-else class="text-muted text-sm">
        Alle Kalenderwochen bis 5 Jahre im Voraus sind angelegt.
      </div>
    </div>
  </div>
</template>
