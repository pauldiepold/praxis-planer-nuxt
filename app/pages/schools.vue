<script setup lang="ts">
import { h, resolveComponent, ref  } from 'vue'
import type {Ref} from 'vue';
import type { TableColumn, FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

import type { School } from '../../types/database'


const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

definePageMeta({
  name: 'schools-management-page',
  middleware: 'auth'
})

// Seitenspezifischer Titel
useHead({
  title: 'Pflegeschulen'
})

// Entities Composable verwenden
const { 
  schools, 
  addSchool, 
  updateSchool, 
  deleteSchool,
  isLoading
} = useEntities()

const toast = useToast()

// Modal state
const isDeleteModalOpen = ref(false)
const schoolToDelete = ref<School | null>(null)

// Edit modal state
const isEditModalOpen = ref(false)
const schoolToEdit = ref<School | null>(null)

// Add modal state
const isAddModalOpen = ref(false)

// Loading states
const isSubmitting = ref(false)
const isDeleting = ref(false)

// Zod schema for form validation
const schoolSchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich').max(255, 'Name kann maximal 255 Zeichen haben'),
  contactPerson: z.string().max(255, 'Ansprechpartner kann maximal 255 Zeichen haben').optional().or(z.literal('')).nullish(),
  phone: z.string().max(50, 'Telefonnummer kann maximal 50 Zeichen haben').optional().or(z.literal('')).nullish(),
  email: z.string().email('Ungültige E-Mail-Adresse').max(255, 'E-Mail kann maximal 255 Zeichen haben').optional().or(z.literal('')).nullish()
})

type SchoolSchema = z.output<typeof schoolSchema>

// Form state
const editForm = reactive<Partial<SchoolSchema>>({
  name: '',
  contactPerson: '',
  phone: '',
  email: ''
})

const addForm = reactive<Partial<SchoolSchema>>({
  name: '',
  contactPerson: '',
  phone: '',
  email: ''
})

const globalFilter = ref('')

const sortColumn: Ref<'name' | 'contactPerson' | 'phone' | 'email' | 'createdAt' | 'updatedAt'> = ref('name')
const sortDirection: Ref<'asc' | 'desc'> = ref('asc')

const sortOptions = [
  { value: 'name', label: 'Name' },
  { value: 'contactPerson', label: 'Ansprechpartner' },
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
  let data = schools.value || []

  if (globalFilter.value) {
    const searchTerm = globalFilter.value.toLowerCase()
    data = data.filter(school => 
      school.name.toLowerCase().includes(searchTerm) ||
      (school.contactPerson && school.contactPerson.toLowerCase().includes(searchTerm)) ||
      (school.phone && school.phone.toLowerCase().includes(searchTerm)) ||
      (school.email && school.email.toLowerCase().includes(searchTerm))
    )
  }

  // Sortierung anwenden
  const col = sortColumn.value
  const dir = sortDirection.value
  data = [...data].sort((a, b) => {
    let aVal = a[col] || ''
    let bVal = b[col] || ''
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

const columns: TableColumn<School>[] = [
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
          'aria-label': 'Schule bearbeiten',
          onClick() {
            schoolToEdit.value = row.original
            Object.assign(editForm, {
              name: row.original.name,
              contactPerson: row.original.contactPerson || '',
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
          'aria-label': 'Schule löschen',
          onClick() {
            schoolToDelete.value = row.original
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
    accessorKey: 'contactPerson',
    header: 'Ansprechpartner',
    cell: ({ row }) => row.getValue('contactPerson') || '-',
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

// Deutsche Labels für die Spalten
const getColumnLabel = (columnId: string): string => {
  const labels: Record<string, string> = {
    id: 'ID',
    name: 'Name',
    contactPerson: 'Ansprechpartner',
    phone: 'Telefon',
    email: 'E-Mail',
    createdAt: 'Erstellt am',
    updatedAt: 'Aktualisiert am'
  }
  return labels[columnId] || columnId
}

// Standard-Sichtbarkeit der Spalten konfigurieren
const defaultColumnVisibility = {
  id: false,
  name: true,
  contactPerson: true,
  phone: true,
  email: true,
  createdAt: false,
  updatedAt: false
}

const handleEditSubmit = async (event: FormSubmitEvent<SchoolSchema>) => {
  if (!schoolToEdit.value) return

  isSubmitting.value = true

  try {
    await updateSchool(schoolToEdit.value.id, event.data)

    toast.add({
      title: 'Schule erfolgreich bearbeitet',
      color: 'success',
      icon: 'i-lucide-check-circle'
    })

    handleEditCancel()
  } catch (error: unknown) {
    const errorToasts = handleApiError(error, 'Fehler beim Bearbeiten der Schule')
    errorToasts.forEach((toastData) => toast.add(toastData))
  } finally {
    isSubmitting.value = false
  }
}

const handleAddSubmit = async (event: FormSubmitEvent<SchoolSchema>) => {
  isSubmitting.value = true

  try {
    await addSchool(event.data)

    toast.add({
      title: 'Schule erfolgreich erstellt',
      color: 'success',
      icon: 'i-lucide-check-circle'
    })

    handleAddCancel()
  } catch (error: unknown) {
    const errorToasts = handleApiError(error, 'Fehler beim Erstellen der Schule')
    errorToasts.forEach((toastData) => toast.add(toastData))
  } finally {
    isSubmitting.value = false
  }
}

const handleEditCancel = () => {
  isEditModalOpen.value = false
  schoolToEdit.value = null
  resetForm(editForm, { name: '', contactPerson: '', phone: '', email: '' })
}

const handleAddCancel = () => {
  isAddModalOpen.value = false
  resetForm(addForm, { name: '', contactPerson: '', phone: '', email: '' })
}

const handleDeleteConfirm = async () => {
  if (!schoolToDelete.value) return

  isDeleting.value = true

  try {
    await deleteSchool(schoolToDelete.value.id)

    toast.add({
      title: 'Schule erfolgreich gelöscht',
      color: 'success',
      icon: 'i-lucide-check-circle'
    })


  } catch (error: unknown) {
    const errorMessage = error && typeof error === 'object' && 'data' in error && error.data && typeof error.data === 'object' && 'message' in error.data 
      ? String(error.data.message) 
      : 'Bitte versuche es erneut'
    
    toast.add({
      title: 'Fehler beim Löschen der Schule',
      description: errorMessage,
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
  } finally {
    // Modal immer schließen
    isDeleteModalOpen.value = false
    schoolToDelete.value = null
    isDeleting.value = false
  }
}

const handleDeleteCancel = () => {
  isDeleteModalOpen.value = false
  schoolToDelete.value = null
}
</script>

<template>
  <div>
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h1 class="text-xl font-semibold">
            Pflegeschulen
          </h1>
          <UButton
            icon="i-lucide-plus"
            color="primary"
            @click="isAddModalOpen = true"
          >
            Schule hinzufügen
          </UButton>
        </div>
      </template>

      <div class="flex-1 divide-y divide-accented w-full">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:gap-4 md:justify-between pb-4">
          <UInput
            v-model="globalFilter"
            class="grow max-w-sm md:max-w-sm"
            placeholder="Schulen durchsuchen..."
          />

          <div class="flex gap-2 w-full md:w-auto md:ml-auto">
            <UDropdownMenu
              :items="table?.tableApi?.getAllColumns().filter(column => column.getCanHide()).map(column => ({
                label: getColumnLabel(column.id),
                type: 'checkbox' as const,
                checked: column.getIsVisible(),
                onUpdateChecked(checked: boolean) {
                  table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
                },
                onSelect(e?: Event) {
                  e?.preventDefault()
                }
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
                class="w-full md:w-auto"
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
          :loading="isLoading.schools"
          :column-visibility="defaultColumnVisibility"
          sticky
          class="flex-1"
        >
          <template #empty-state>
            <div class="text-center py-8">
              <p class="text-gray-500">
                Keine Pflegeschulen gefunden
              </p>
            </div>
          </template>
        </UTable>

        <div class="px-4 py-3.5 text-sm text-muted">
          {{ tableData.length }} Schule{{ tableData.length !== 1 ? 'n' : '' }} gefunden.
        </div>
      </div>
    </UCard>

    <!-- Edit Modal -->
    <UModal v-model:open="isEditModalOpen" title="Schule bearbeiten" description="Bearbeite die Informationen der ausgewählten Schule." :close="false">
      <template #body>
        <UForm :schema="schoolSchema" :state="editForm" class="space-y-6" @submit="handleEditSubmit">
          <UFormField label="Schulname" name="name">
            <UInput
              v-model="editForm.name"
              placeholder="z.B. Pflegeschule Musterstadt"
              size="lg"
              class="w-full"
            />
          </UFormField>
          
          <UFormField label="Ansprechpartner/in" name="contactPerson">
            <UInput
              v-model="editForm.contactPerson"
              placeholder="z.B. Max Mustermann"
              size="lg"
              class="w-full"
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
              placeholder="z.B. kontakt@pflegeschule.de"
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
    <UModal v-model:open="isAddModalOpen" title="Neue Schule hinzufügen" description="Füge eine neue Pflegeschule hinzu." :close="false">
      <template #body>
        <UForm :schema="schoolSchema" :state="addForm" class="space-y-6" @submit="handleAddSubmit">
          <UFormField label="Schulname" name="name">
            <UInput
              v-model="addForm.name"
              placeholder="z.B. Pflegeschule Musterstadt"
              size="lg"
              class="w-full"
            />
          </UFormField>
          
          <UFormField label="Ansprechpartner/in" name="contactPerson">
            <UInput
              v-model="addForm.contactPerson"
              placeholder="z.B. Max Mustermann"
              size="lg"
              class="w-full"
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
              placeholder="z.B. kontakt@pflegeschule.de"
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
    <UModal v-model:open="isDeleteModalOpen" title="Schule löschen" description="Diese Aktion kann nicht rückgängig gemacht werden." :close="false">
      <template #body>
        <p class="text-sm text-gray-600 dark:text-gray-300">
          Bist du sicher, dass du die Schule '{{ schoolToDelete?.name || '' }}' löschen möchtest?
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
