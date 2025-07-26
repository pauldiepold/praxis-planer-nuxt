<script setup lang="ts">
import { h, resolveComponent, ref, computed } from 'vue'
import type { TableColumn, FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

import type { Student } from '../../types/database'

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

definePageMeta({
  name: 'students-management-page',
  middleware: 'auth'
})

// Seitenspezifischer Titel
useHead({
  title: 'Schülerinnen'
})

// Entities Composable verwenden
const { 
  students, 
  schools,
  companies,
  schoolOptions, 
  companyOptions, 
  addStudent, 
  updateStudent, 
  deleteStudent,
  isLoading
} = useEntities()

const toast = useToast()

// Modal state
const isDeleteModalOpen = ref(false)
const studentToDelete = ref<Student | null>(null)

// Edit modal state
const isEditModalOpen = ref(false)
const studentToEdit = ref<Student | null>(null)

// Add modal state
const isAddModalOpen = ref(false)

// Loading states
const isSubmitting = ref(false)
const isDeleting = ref(false)

// Zod schema für Formulare
const studentSchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich').max(255, 'Name kann maximal 255 Zeichen haben'),
  schoolId: z.number().nullable(),
  companyId: z.number().nullable(),
  phone: z.string().max(50, 'Telefonnummer kann maximal 50 Zeichen haben').optional().or(z.literal('')).nullish(),
  email: z.string().email('Ungültige E-Mail-Adresse').max(255, 'E-Mail kann maximal 255 Zeichen haben').optional().or(z.literal('')).nullish()
})

type StudentSchema = z.output<typeof studentSchema>

// Form state
const editForm = reactive<Partial<StudentSchema>>({
  name: '',
  schoolId: null,
  companyId: null,
  phone: '',
  email: ''
})

const addForm = reactive<Partial<StudentSchema>>({
  name: '',
  schoolId: null,
  companyId: null,
  phone: '',
  email: ''
})

const globalFilter = ref('')

// Sortier-Logik
const sortColumn = ref<'name' | 'school' | 'company' | 'phone' | 'email' | 'createdAt' | 'updatedAt'>('name')
const sortDirection = ref<'asc' | 'desc'>('asc')

const sortOptions = [
  { value: 'name', label: 'Name' },
  { value: 'school', label: 'Schule' },
  { value: 'company', label: 'Betrieb' },
  { value: 'phone', label: 'Telefon' },
  { value: 'email', label: 'E-Mail' },
  { value: 'createdAt', label: 'Erstellt am' },
  { value: 'updatedAt', label: 'Aktualisiert am' }
]

const sortDropdownItems = computed(() => [
  ...sortOptions.map(option => ({
    label: option.label,
    value: option.value,
    type: 'item' as const,
    slot: `sort-${option.value}`,
    onSelect() { sortColumn.value = option.value as typeof sortColumn.value },
  })),
  { type: 'divider' as const },
  {
    label: sortDirection.value === 'asc' ? 'Aufsteigend' : 'Absteigend',
    icon: sortDirection.value === 'asc' ? 'i-lucide-arrow-up' : 'i-lucide-arrow-down',
    type: 'item' as const,
    active: true,
    onSelect() { sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc' }
  }
])

const tableData = computed(() => {
  let data = students.value || []
  if (globalFilter.value) {
    const searchTerm = globalFilter.value.toLowerCase()
    data = data.filter(student => {
      const school = schools.value.find(s => s.id === student.schoolId)
      const company = companies.value.find(c => c.id === student.companyId)
      return (
        student.name.toLowerCase().includes(searchTerm) ||
        (student.phone && student.phone.toLowerCase().includes(searchTerm)) ||
        (student.email && student.email.toLowerCase().includes(searchTerm)) ||
        (school && school.name.toLowerCase().includes(searchTerm)) ||
        (company && company.name.toLowerCase().includes(searchTerm))
      )
    })
  }

  // Sortierung anwenden
  const col = sortColumn.value
  const dir = sortDirection.value
  data = [...data].sort((a, b) => {
    let aVal: string | number | null
    let bVal: string | number | null
    if (col === 'school') {
      aVal = schools.value.find(s => s.id === a.schoolId)?.name || ''
      bVal = schools.value.find(s => s.id === b.schoolId)?.name || ''
    } else if (col === 'company') {
      aVal = companies.value.find(c => c.id === a.companyId)?.name || ''
      bVal = companies.value.find(c => c.id === b.companyId)?.name || ''
    } else {
      aVal = a[col] || ''
      bVal = b[col] || ''
    }
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      aVal = aVal.toLowerCase()
      bVal = bVal.toLowerCase()
    }
    if (aVal === bVal) return 0
    if (dir === 'asc') return aVal > bVal ? 1 : -1
    return aVal < bVal ? 1 : -1
  })
  return data
})

const columns: TableColumn<Student>[] = [
  {
    id: 'actions',
    header: 'Aktionen',
    enableHiding: false,
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-2' }, [
        h(UButton, {
          'icon': 'i-lucide-edit',
          'color': 'primary',
          'variant': 'ghost',
          'size': 'sm',
          'aria-label': 'Schülerin bearbeiten',
          onClick() {
            studentToEdit.value = row.original
            Object.assign(editForm, {
              name: row.original.name,
              schoolId: row.original.schoolId,
              companyId: row.original.companyId,
              phone: row.original.phone || '',
              email: row.original.email || ''
            })
            isEditModalOpen.value = true
          }
        }),
        h(UButton, {
          'icon': 'i-lucide-trash-2',
          'color': 'error',
          'variant': 'ghost',
          'size': 'sm',
          'aria-label': 'Schülerin löschen',
          onClick() {
            studentToDelete.value = row.original
            isDeleteModalOpen.value = true
          }
        })
      ])
    }
  },
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => row.getValue('id'),
    enableHiding: true,
    enableSorting: true
  },
  {
    accessorKey: 'name',
    header: 'Name',
    enableHiding: true,
    enableSorting: true
  },
  {
    accessorKey: 'schoolId',
    header: 'Schule',
    cell: ({ row }) => {
      const id = row.getValue('schoolId')
      const school = schools.value.find(s => s.id === id)
      return school ? school.name : '-'
    },
    enableHiding: true,
    enableSorting: true
  },
  {
    accessorKey: 'companyId',
    header: 'Betrieb',
    cell: ({ row }) => {
      const id = row.getValue('companyId')
      const company = companies.value.find(c => c.id === id)
      return company ? company.name : '-'
    },
    enableHiding: true,
    enableSorting: true
  },
  {
    accessorKey: 'phone',
    header: 'Telefon',
    cell: ({ row }) => row.getValue('phone') || '-',
    enableHiding: true,
    enableSorting: true
  },
  {
    accessorKey: 'email',
    header: 'E-Mail',
    cell: ({ row }) => row.getValue('email') || '-',
    enableHiding: true,
    enableSorting: true
  },
  {
    accessorKey: 'createdAt',
    header: 'Erstellt am',
    cell: ({ row }) => formatGermanDate(row.getValue('createdAt')),
    enableHiding: true,
    enableSorting: true
  },
  {
    accessorKey: 'updatedAt',
    header: 'Aktualisiert am',
    cell: ({ row }) => formatGermanDate(row.getValue('updatedAt')),
    enableHiding: true,
    enableSorting: true
  }
]

const table = useTemplateRef('table')

const getColumnLabel = (columnId: string): string => {
  const labels: Record<string, string> = {
    id: 'ID',
    name: 'Name',
    schoolId: 'Schule',
    companyId: 'Betrieb',
    phone: 'Telefon',
    email: 'E-Mail',
    createdAt: 'Erstellt am',
    updatedAt: 'Aktualisiert am'
  }
  return labels[columnId] || columnId
}

const defaultColumnVisibility = {
  id: false,
  name: true,
  schoolId: true,
  companyId: true,
  phone: true,
  email: true,
  createdAt: false,
  updatedAt: false
}

const handleEditSubmit = async (event: FormSubmitEvent<StudentSchema>) => {
  if (!studentToEdit.value) return
  isSubmitting.value = true
  try {
    await updateStudent(studentToEdit.value.id, event.data)
    toast.add({
      title: 'Schülerin erfolgreich bearbeitet',
      color: 'success',
      icon: 'i-lucide-check-circle'
    })
    handleEditCancel()
  } catch (error: unknown) {
    const errorToasts = handleApiError(error, 'Fehler beim Bearbeiten der Schülerin')
    errorToasts.forEach((toastData) => toast.add(toastData))
  } finally {
    isSubmitting.value = false
  }
}

const handleAddSubmit = async (event: FormSubmitEvent<StudentSchema>) => {
  isSubmitting.value = true
  try {
    await addStudent(event.data)
    toast.add({
      title: 'Schülerin erfolgreich erstellt',
      color: 'success',
      icon: 'i-lucide-check-circle'
    })
    handleAddCancel()
  } catch (error: unknown) {
    const errorToasts = handleApiError(error, 'Fehler beim Erstellen der Schülerin')
    errorToasts.forEach((toastData) => toast.add(toastData))
  } finally {
    isSubmitting.value = false
  }
}

const handleEditCancel = () => {
  isEditModalOpen.value = false
  studentToEdit.value = null
  resetForm(editForm, { name: '', schoolId: null, companyId: null, phone: '', email: '' })
}

const handleAddCancel = () => {
  isAddModalOpen.value = false
  resetForm(addForm, { name: '', schoolId: null, companyId: null, phone: '', email: '' })
}

const handleDeleteConfirm = async () => {
  if (!studentToDelete.value) return
  isDeleting.value = true
  try {
    await deleteStudent(studentToDelete.value.id)
    toast.add({
      title: 'Schülerin erfolgreich gelöscht',
      color: 'success',
      icon: 'i-lucide-check-circle'
    })

  } catch (error: unknown) {
    const errorMessage = error && typeof error === 'object' && 'data' in error && error.data && typeof error.data === 'object' && 'message' in error.data 
      ? String(error.data.message) 
      : 'Bitte versuche es erneut'
    toast.add({
      title: 'Fehler beim Löschen der Schülerin',
      description: errorMessage,
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
  } finally {
    isDeleteModalOpen.value = false
    studentToDelete.value = null
    isDeleting.value = false
  }
}

const handleDeleteCancel = () => {
  isDeleteModalOpen.value = false
  studentToDelete.value = null
}

// Store-Optionen werden bereits aus dem Composable geladen
</script>

<template>
  <div>
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h1 class="text-xl font-semibold">
            Schülerinnen
          </h1>
          <UButton
            icon="i-lucide-plus"
            color="primary"
            @click="isAddModalOpen = true"
          >
            Schülerin hinzufügen
          </UButton>
        </div>
      </template>

      <div class="flex-1 divide-y divide-accented w-full">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:gap-4 md:justify-between pb-4">
          <UInput
            v-model="globalFilter"
            class="grow max-w-sm md:max-w-sm"
            placeholder="Schülerinnen durchsuchen..."
          />

          <div class="flex gap-2 w-full md:w-auto md:ml-auto">
          <UDropdownMenu
            :items="table?.tableApi?.getAllColumns().filter(column => column.getCanHide()).map(column => ({
              label: getColumnLabel(column.id),
              value: column.id,
              type: 'checkbox' as const,
              checked: column.getIsVisible(),
              onUpdateChecked(checked: boolean) {
                table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
              },
              onSelect(e?: Event) {
                e?.preventDefault()
              },
              slot: `col-${column.id}`
            }))"
            :content="{ align: 'end' }"
            :ui="{ content: 'min-w-[12rem]' }"
          >
            <UButton
              label="Spalten"
              color="neutral"
              variant="outline"
              trailing-icon="i-lucide-chevron-down"
              class="w-full md:w-auto"
              aria-label="Spalten-Auswahl Dropdown"
            />
            <template v-for="column in table?.tableApi?.getAllColumns().filter(c => c.getCanHide())" #[`col-${column.id}-trailing`] :key="column.id">
              <UIcon v-if="column.getIsVisible()" name="i-lucide-check" class="shrink-0 size-5 text-primary" />
            </template>
          </UDropdownMenu>
          <UDropdownMenu
            :items="sortDropdownItems"
            :content="{ align: 'end' }"
            :ui="{ content: 'min-w-[12rem]', item: { icon: 'order-last' } }"
          >
            <UButton
              label="Sortieren"
              color="neutral"
              variant="outline"
              trailing-icon="i-lucide-chevron-down"
              class="flex-1 min-w-0"
              aria-label="Sortier-Auswahl Dropdown"
            />
            <template v-for="option in sortOptions" #[`sort-${option.value}-trailing`] :key="option.value">
              <UIcon v-if="sortColumn === option.value" name="i-lucide-check" class="shrink-0 size-5 text-primary" />
            </template>
          </UDropdownMenu>
          </div>
        </div>

        <UTable
          ref="table"
          :data="tableData"
          :columns="columns"
          :loading="isLoading.students"
          :column-visibility="defaultColumnVisibility"
          sticky
          class="flex-1"
        >
          <template #empty-state>
            <div class="text-center py-8">
              <p class="text-gray-500">
                Keine Schülerinnen gefunden
              </p>
            </div>
          </template>
        </UTable>

        <div class="px-4 py-3.5 text-sm text-muted">
          {{ tableData.length }} Schülerin{{ tableData.length !== 1 ? 'nen' : '' }} gefunden.
        </div>
      </div>
    </UCard>

    <!-- Edit Modal -->
    <UModal v-model:open="isEditModalOpen" title="Schülerin bearbeiten" description="Bearbeite die Informationen der ausgewählten Schülerin." :close="false">
      <template #body>
        <UForm :schema="studentSchema" :state="editForm" class="space-y-6" @submit="handleEditSubmit">
          <UFormField label="Name" name="name">
            <UInput
              v-model="editForm.name"
              placeholder="z.B. Anna Mustermann"
              size="lg"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Pflegeschule" name="schoolId">
            <USelectMenu
              :model-value="editForm.schoolId || undefined"
              :items="schoolOptions"
              value-key="id"
              placeholder="Keine Schule zugeordnet"
              class="w-full"
              @update:model-value="val => editForm.schoolId = val ?? undefined"
            />
          </UFormField>
          <UFormField label="Betrieb" name="companyId">
            <USelectMenu
              :model-value="editForm.companyId || undefined"
              :items="companyOptions"
              value-key="id"
              placeholder="Kein Betrieb zugeordnet"
              class="w-full"
              @update:model-value="val => editForm.companyId = val ?? undefined"
            />
          </UFormField>
          <UFormField label="Telefonnummer" name="phone">
            <UInput
              v-model="editForm.phone"
              placeholder="z.B. +49 123 456789"
              type="tel"
              size="lg"
              class="w-full"
            />
          </UFormField>
          <UFormField label="E-Mail-Adresse" name="email">
            <UInput
              v-model="editForm.email"
              placeholder="z.B. anna@mustermann.de"
              type="email"
              size="lg"
              class="w-full"
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

    <!-- Add Modal -->
    <UModal v-model:open="isAddModalOpen" title="Neue Schülerin hinzufügen" description="Füge eine neue Schülerin hinzu." :close="false">
      <template #body>
        <UForm :schema="studentSchema" :state="addForm" class="space-y-6" @submit="handleAddSubmit">
          <UFormField label="Name" name="name">
            <UInput
              v-model="addForm.name"
              placeholder="z.B. Anna Mustermann"
              size="lg"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Pflegeschule" name="schoolId">
            <USelectMenu
              :model-value="addForm.schoolId || undefined"
              :items="schoolOptions"
              value-key="id"
              placeholder="Keine Schule zugeordnet"
              class="w-full"
              @update:model-value="val => addForm.schoolId = val ?? undefined"
            />
          </UFormField>
          <UFormField label="Betrieb" name="companyId">
            <USelectMenu
              :model-value="addForm.companyId || undefined"
              :items="companyOptions"
              value-key="id"
              placeholder="Kein Betrieb zugeordnet"
              class="w-full"
              @update:model-value="val => addForm.companyId = val ?? undefined"
            />
          </UFormField>
          <UFormField label="Telefonnummer" name="phone">
            <UInput
              v-model="addForm.phone"
              placeholder="z.B. +49 123 456789"
              type="tel"
              size="lg"
              class="w-full"
            />
          </UFormField>
          <UFormField label="E-Mail-Adresse" name="email">
            <UInput
              v-model="addForm.email"
              placeholder="z.B. anna@mustermann.de"
              type="email"
              size="lg"
              class="w-full"
            />
          </UFormField>
          <div class="flex justify-end gap-3 pt-4">
            <UButton
              color="neutral"
              variant="soft"
              @click="handleAddCancel"
            >
              Abbrechen
            </UButton>
            <UButton
              color="primary"
              type="submit"
              :loading="isSubmitting"
              :disabled="isSubmitting"
            >
              Hinzufügen
            </UButton>
          </div>
        </UForm>
      </template>
    </UModal>

    <!-- Delete Confirmation Modal -->
    <UModal v-model:open="isDeleteModalOpen" title="Schülerin löschen" description="Diese Aktion kann nicht rückgängig gemacht werden." :close="false">
      <template #body>
        <p class="text-sm text-gray-600 dark:text-gray-300">
          Bist du sicher, dass du die Schülerin '{{ studentToDelete?.name || '' }}' löschen möchtest?
        </p>
      </template>
      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton
            color="neutral"
            variant="soft"
            @click="handleDeleteCancel"
          >
            Abbrechen
          </UButton>
          <UButton
            color="error"
            :loading="isDeleting"
            :disabled="isDeleting"
            @click="handleDeleteConfirm"
          >
            Löschen
          </UButton>
        </div>
      </template>
    </UModal>
  </div>
</template> 