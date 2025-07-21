<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn, FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

import type { Company } from '../../types/database'

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

definePageMeta({
  name: 'companies-management-page',
  middleware: 'auth'
})

const { data: companies, pending, refresh } = await useFetch<Company[]>('/api/companies')

const toast = useToast()

// Modal state
const isDeleteModalOpen = ref(false)
const companyToDelete = ref<Company | null>(null)

// Edit modal state
const isEditModalOpen = ref(false)
const companyToEdit = ref<Company | null>(null)

// Add modal state
const isAddModalOpen = ref(false)

// Loading states
const isSubmitting = ref(false)
const isDeleting = ref(false)

// Zod schema for form validation
const companySchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich').max(255, 'Name darf maximal 255 Zeichen haben'),
  contactPerson: z.string().max(255, 'Ansprechpartner darf maximal 255 Zeichen haben').optional().or(z.literal('')).nullish(),
  phone: z.string().max(50, 'Telefonnummer darf maximal 50 Zeichen haben').optional().or(z.literal('')).nullish(),
  email: z.string().email('Ungültige E-Mail-Adresse').max(255, 'E-Mail darf maximal 255 Zeichen haben').optional().or(z.literal('')).nullish()
})

type CompanySchema = z.output<typeof companySchema>

// Form state
const editForm = reactive<Partial<CompanySchema>>({
  name: '',
  contactPerson: '',
  phone: '',
  email: ''
})

const addForm = reactive<Partial<CompanySchema>>({
  name: '',
  contactPerson: '',
  phone: '',
  email: ''
})

const globalFilter = ref('')

const tableData = computed(() => {
  const data = companies.value || []
  
  if (!globalFilter.value) {
    return data
  }
  
  const searchTerm = globalFilter.value.toLowerCase()
  
  return data.filter(company => 
    company.name.toLowerCase().includes(searchTerm) ||
    (company.contactPerson && company.contactPerson.toLowerCase().includes(searchTerm)) ||
    (company.phone && company.phone.toLowerCase().includes(searchTerm)) ||
    (company.email && company.email.toLowerCase().includes(searchTerm))
  )
})

const columns: TableColumn<Company>[] = [
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
  },
  {
    id: 'actions',
    header: 'Aktionen',
    enableHiding: false,
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-2 justify-end' }, [
        h(UButton, {
          'icon': 'i-lucide-edit',
          'color': 'primary',
          'variant': 'ghost',
          'size': 'sm',
          'aria-label': 'Betrieb bearbeiten',
          onClick() {
            companyToEdit.value = row.original
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
          'aria-label': 'Betrieb löschen',
          onClick() {
            companyToDelete.value = row.original
            isDeleteModalOpen.value = true
          }
        })
      ])
    }
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

const handleEditSubmit = async (event: FormSubmitEvent<CompanySchema>) => {
  if (!companyToEdit.value) return

  isSubmitting.value = true

  try {
    await $fetch(`/api/companies/${companyToEdit.value.id}`, {
      method: 'PATCH',
      body: event.data
    })

    toast.add({
      title: 'Betrieb erfolgreich bearbeitet',
      color: 'success',
      icon: 'i-lucide-check-circle'
    })

    await refresh()
    handleEditCancel()
  } catch (error: unknown) {
    const errorToasts = handleApiError(error, 'Fehler beim Bearbeiten des Betriebs')
    errorToasts.forEach((toastData) => toast.add(toastData))
  } finally {
    isSubmitting.value = false
  }
}

const handleAddSubmit = async (event: FormSubmitEvent<CompanySchema>) => {
  isSubmitting.value = true

  try {
    await $fetch('/api/companies', {
      method: 'POST',
      body: event.data
    })

    toast.add({
      title: 'Betrieb erfolgreich erstellt',
      color: 'success',
      icon: 'i-lucide-check-circle'
    })

    await refresh()
    handleAddCancel()
  } catch (error: unknown) {
    const errorToasts = handleApiError(error, 'Fehler beim Erstellen des Betriebs')
    errorToasts.forEach((toastData) => toast.add(toastData))
  } finally {
    isSubmitting.value = false
  }
}

const handleEditCancel = () => {
  isEditModalOpen.value = false
  companyToEdit.value = null
  resetForm(editForm, { name: '', contactPerson: '', phone: '', email: '' })
}

const handleAddCancel = () => {
  isAddModalOpen.value = false
  resetForm(addForm, { name: '', contactPerson: '', phone: '', email: '' })
}

const handleDeleteConfirm = async () => {
  if (!companyToDelete.value) return

  isDeleting.value = true

  try {
    await $fetch(`/api/companies/${companyToDelete.value.id}`, {
      method: 'DELETE'
    })

    toast.add({
      title: 'Betrieb erfolgreich gelöscht',
      color: 'success',
      icon: 'i-lucide-check-circle'
    })

    await refresh()
  } catch (error: unknown) {
    const errorMessage = error && typeof error === 'object' && 'data' in error && error.data && typeof error.data === 'object' && 'message' in error.data 
      ? String(error.data.message) 
      : 'Bitte versuchen Sie es erneut'
    
    toast.add({
      title: 'Fehler beim Löschen des Betriebs',
      description: errorMessage,
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
  } finally {
    // Modal immer schließen
    isDeleteModalOpen.value = false
    companyToDelete.value = null
    isDeleting.value = false
  }
}

const handleDeleteCancel = () => {
  isDeleteModalOpen.value = false
  companyToDelete.value = null
}
</script>

<template>
  <div>
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h1 class="text-xl font-semibold">
            Betriebe
          </h1>
          <UButton
            icon="i-lucide-plus"
            color="primary"
            @click="isAddModalOpen = true"
          >
            Betrieb hinzufügen
          </UButton>
        </div>
      </template>

      <div class="flex-1 divide-y divide-accented w-full">
        <div class="flex items-center gap-4 justify-between pb-4">
          <UInput
            v-model="globalFilter"
            class="grow max-w-sm"
            placeholder="Betriebe durchsuchen..."
          />

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
          >
            <UButton
              label="Spalten"
              color="neutral"
              variant="outline"
              trailing-icon="i-lucide-chevron-down"
              class="ml-auto"
              aria-label="Spalten-Auswahl Dropdown"
            />
          </UDropdownMenu>
        </div>

        <UTable
          ref="table"
          :data="tableData"
          :columns="columns"
          :loading="pending"
          :column-visibility="defaultColumnVisibility"
          sticky
          class="flex-1"
        >
          <template #empty-state>
            <div class="text-center py-8">
              <p class="text-gray-500">
                Keine Betriebe gefunden
              </p>
            </div>
          </template>
        </UTable>

        <div class="px-4 py-3.5 text-sm text-muted">
          {{ tableData.length }} Betrieb(e) gefunden.
        </div>
      </div>
    </UCard>

    <!-- Edit Modal -->
    <UModal v-model:open="isEditModalOpen" title="Betrieb bearbeiten" description="Bearbeiten Sie die Informationen des ausgewählten Betriebs." :close="false">
      <template #body>
        <UForm :schema="companySchema" :state="editForm" class="space-y-6" @submit="handleEditSubmit">
          <UFormField label="Betriebsname" name="name">
            <UInput
              v-model="editForm.name"
              placeholder="z.B. Pflegebetrieb Musterstadt"
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
              placeholder="z.B. kontakt@pflegebetrieb.de"
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
    <UModal v-model:open="isAddModalOpen" title="Neuen Betrieb hinzufügen" description="Fügen Sie einen neuen Betrieb hinzu." :close="false">
      <template #body>
        <UForm :schema="companySchema" :state="addForm" class="space-y-6" @submit="handleAddSubmit">
          <UFormField label="Betriebsname" name="name">
            <UInput
              v-model="addForm.name"
              placeholder="z.B. Pflegebetrieb Musterstadt"
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
              placeholder="z.B. kontakt@pflegebetrieb.de"
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
    <UModal v-model:open="isDeleteModalOpen" title="Betrieb löschen" description="Diese Aktion kann nicht rückgängig gemacht werden." :close="false">
      <template #body>
        <p class="text-sm text-gray-600 dark:text-gray-300">
          Sind Sie sicher, dass Sie den Betrieb '{{ companyToDelete?.name || '' }}' löschen möchten?
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