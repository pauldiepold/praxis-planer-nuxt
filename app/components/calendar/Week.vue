<script setup lang="ts">
import { format, addDays } from 'date-fns'
import { de } from 'date-fns/locale'
import { ref, reactive } from 'vue'
import * as z from 'zod'

interface Props {
  week: {
    id: number
    weekStartDate: string
    status: 'free' | 'booked' | 'vacation' | 'reserved'
    studentId: number | null
    studentName: string | null
    schoolName: string | null
    companyId: number | null
    companyName: string | null
    notes: string | null
  }
}

const props = defineProps<Props>()

// Emit für das Aktualisieren der Woche
const emit = defineEmits<{
  updated: [week: { id: number, weekStartDate: string, status: 'free' | 'booked' | 'vacation' | 'reserved', studentId: number | null, companyId: number | null, notes: string | null, studentName: string | null, schoolName: string | null, companyName: string | null }]
}>()

// Modal state
const isEditModalOpen = ref(false)

// Loading states
const isSubmitting = ref(false)

// Entities Composable verwenden
const { studentOptionsWithSchool, companyOptions } = useEntities()

// Zod schema für Formularvalidierung
const weekSchema = z.object({
  status: z.enum(['free', 'booked', 'vacation', 'reserved']),
  studentId: z.number().nullable(),
  companyId: z.number().nullable(),
  notes: z.string().max(1000, 'Notizen können maximal 1000 Zeichen haben').optional().or(z.literal('')).nullish(),
})

type WeekSchema = z.output<typeof weekSchema>

// Form state
const editForm = reactive<Partial<WeekSchema>>({
  status: 'free',
  studentId: null,
  companyId: null,
  notes: '',
})

const toast = useToast()

// Hilfsfunktion für ISO-Kalenderwoche
function getISOWeek(date: Date): number {
  const tmp = new Date(date.getTime())
  tmp.setHours(0, 0, 0, 0)
  // Donnerstag in dieser Woche finden
  tmp.setDate(tmp.getDate() + 3 - ((tmp.getDay() + 6) % 7))
  // 1. Januar der ISO-Woche
  const week1 = new Date(tmp.getFullYear(), 0, 4)
  // KW berechnen
  return 1 + Math.round(((tmp.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7)
}

// Hilfsfunktion für Wochenbereich (Montag bis Freitag)
function getWeekRange(weekStartDate: string): string {
  const startDate = new Date(weekStartDate)
  const endDate = addDays(startDate, 4) // Montag + 4 Tage = Freitag
  const startFormatted = format(startDate, 'd.M.', { locale: de })
  const endFormatted = format(endDate, 'd.M.', { locale: de })
  return `${startFormatted} - ${endFormatted}`
}

function getWeekYear(weekStartDate: string): number {
  return new Date(weekStartDate).getFullYear()
}

// Schülerinnen-Optionen für das Select
const studentOptions = computed(() => studentOptionsWithSchool.value)

// Modal öffnen
function openEditModal() {
  Object.assign(editForm, {
    status: props.week.status,
    studentId: props.week.studentId,
    companyId: props.week.companyId,
    notes: props.week.notes || '',
  })
  isEditModalOpen.value = true
}

// Formular absenden
async function handleEditSubmit(event: { data: WeekSchema }) {
  isSubmitting.value = true

  try {
    // Validierung basierend auf Status
    let submitData: Partial<WeekSchema>

    if (event.data.status === 'reserved') {
      // Bei 'reserved': companyId senden, studentId auf null
      submitData = {
        ...event.data,
        companyId: event.data.companyId,
        studentId: null,
      }
    }
    else if (event.data.status === 'booked') {
      // Bei 'booked': studentId senden, companyId auf null
      submitData = {
        ...event.data,
        studentId: event.data.studentId,
        companyId: null,
      }
    }
    else {
      // Bei 'free' oder 'vacation': beide auf null
      submitData = {
        ...event.data,
        studentId: null,
        companyId: null,
      }
    }

    const updatedWeek = await $fetch(`/api/weeks/${props.week.id}`, {
      method: 'PATCH',
      body: submitData,
    })

    toast.add({
      title: 'Woche erfolgreich bearbeitet',
      color: 'success',
      icon: 'i-lucide-check-circle',
    })

    // Aktuelle Schülerin- und Schulinformationen aus dem Store holen
    const currentStudent = studentOptionsWithSchool.value.find(s => s.id === updatedWeek.studentId)

    // Aktuelle Company-Informationen aus dem Store holen
    const currentCompany = companyOptions.value.find(c => c.id === updatedWeek.companyId)

    // Emit für Parent-Komponente
    emit('updated', {
      ...updatedWeek,
      studentName: currentStudent?.name || null,
      schoolName: currentStudent?.school || null,
      companyName: currentCompany?.label || null,
    })

    // Modal schließen
    isEditModalOpen.value = false
  }
  catch (error: unknown) {
    const errorToasts = handleApiError(error, 'Fehler beim Bearbeiten der Woche')
    errorToasts.forEach(toastData => toast.add(toastData))
  }
  finally {
    isSubmitting.value = false
  }
}

// Modal schließen
function handleEditCancel() {
  isEditModalOpen.value = false
}

// Status-Label für das Select
const statusOptions = [
  { value: 'free', label: 'Frei' },
  { value: 'booked', label: 'Belegt' },
  { value: 'vacation', label: 'Urlaub' },
  { value: 'reserved', label: 'Reserviert' },
]
</script>

<template>
  <div>
    <!-- Woche Card (klickbar) -->
    <div
      class="flex items-center gap-4 bg-default rounded-lg p-3 hover:bg-muted/50 hover:ring hover:ring-yellow-400/60 hover:scale-[1.02] transition-all duration-300 ease-out cursor-pointer border border-transparent hover:border-yellow-300/40"
      @click="openEditModal"
    >
      <!-- KW und Datum links -->
      <div class="flex flex-col items-start min-w-[60px]">
        <span class="text-base font-bold">KW {{ getISOWeek(new Date(week.weekStartDate)) }}</span>
        <span class="text-sm text-muted">{{ getWeekRange(week.weekStartDate) }}</span>
      </div>

      <!-- Schüler/Betrieb und Pflegeschule in der Mitte (rechtsbündig) -->
      <div class="flex flex-col flex-1 min-w-0 text-right">
        <span class="text-sm font-medium truncate">{{ week.status === 'reserved' ? week.companyName : week.studentName }}</span>
        <span class="text-xs text-muted truncate">{{ week.status === 'reserved' ? '' : week.schoolName }}</span>
      </div>

      <!-- Badge rechts -->
      <div class="">
        <UBadge
          :color="week.status === 'free' ? 'success' : week.status === 'booked' ? 'error' : week.status === 'reserved' ? 'info' : 'warning'"
          variant="soft"
          size="lg"
          class="rounded-full px-4"
        >
          {{ week.status === 'free' ? 'frei' : week.status === 'booked' ? 'belegt' : week.status === 'reserved' ? 'reserviert' : 'Urlaub' }}
        </UBadge>
      </div>
    </div>
    <!-- Notizen innerhalb der Card, eigene Zeile, nur wenn vorhanden -->
    <template v-if="week.notes && week.notes.trim() !== ''">
      <div class="bg-default rounded-b-lg border-t border-muted -mt-1 px-3 pb-2 pt-2">
        <div class="text-xs text-muted break-words whitespace-pre-line">
          {{ week.notes }}
        </div>
      </div>
    </template>

    <!-- Edit Modal -->
    <UModal
      v-model:open="isEditModalOpen"
      title="Woche bearbeiten"
      description="Bearbeite die Informationen der ausgewählten Woche."
      :close="false"
    >
      <template #body>
        <UForm
          :schema="weekSchema"
          :state="editForm"
          class="space-y-6"
          @submit="handleEditSubmit"
        >
          <!-- Woche Info -->
          <div class="bg-muted rounded-lg p-4">
            <div class="flex items-center justify-between">
              <div class="font-medium">
                KW {{ getISOWeek(new Date(week.weekStartDate)) }} - {{ getWeekYear(week.weekStartDate) }}
              </div>
              <div class="text-sm text-muted">
                {{ getWeekRange(week.weekStartDate) }}
              </div>
            </div>
          </div>

          <!-- Status -->
          <UFormField
            label="Status"
            name="status"
          >
            <USelect
              v-model="editForm.status"
              :items="statusOptions"
              placeholder="Status auswählen"
              size="lg"
              class="w-full"
            />
          </UFormField>

          <!-- Schülerin (nur anzeigen wenn Status 'booked' ist) -->
          <UFormField
            v-if="editForm.status === 'booked'"
            label="Schülerin"
            name="studentId"
          >
            <USelectMenu
              :model-value="editForm.studentId || undefined"
              :items="studentOptions"
              value-key="id"
              label-key="label"
              placeholder="Schülerin auswählen"
              size="lg"
              class="w-full"
              searchable
              @update:model-value="val => editForm.studentId = val ?? null"
            >
              <template #item="{ item }">
                <div class="flex flex-col">
                  <span class="font-medium">{{ item.name }}</span>
                  <span
                    v-if="item.school"
                    class="text-sm text-muted"
                  >{{ item.school }}</span>
                </div>
              </template>
            </USelectMenu>
          </UFormField>

          <!-- Betrieb (nur anzeigen wenn Status 'reserved' ist) -->
          <UFormField
            v-if="editForm.status === 'reserved'"
            label="Betrieb"
            name="companyId"
          >
            <USelectMenu
              :model-value="editForm.companyId || undefined"
              :items="companyOptions"
              value-key="id"
              label-key="label"
              placeholder="Betrieb auswählen"
              size="lg"
              class="w-full"
              searchable
              @update:model-value="val => editForm.companyId = val ?? null"
            />
          </UFormField>

          <!-- Notizen -->
          <UFormField
            label="Notizen"
            name="notes"
          >
            <UTextarea
              v-model="editForm.notes"
              placeholder="Optionale Notizen zur Woche..."
              size="lg"
              class="w-full"
              :rows="3"
            />
          </UFormField>

          <div class="flex justify-end gap-3 pt-4">
            <UButton
              color="neutral"
              variant="soft"
              @click="handleEditCancel"
            >
              Abbrechen
            </UButton>
            <UButton
              color="primary"
              type="submit"
              :loading="isSubmitting"
              :disabled="isSubmitting"
            >
              Speichern
            </UButton>
          </div>
        </UForm>
      </template>
    </UModal>
  </div>
</template>
