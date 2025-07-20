<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn, FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

import type { School } from '../../types/database'

const UButton = resolveComponent('UButton')

definePageMeta({
  name: 'schools-management-page',
  middleware: 'auth'
})

const { data: schools, pending, refresh } = await useFetch<School[]>('/api/schools')

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
  name: z.string().min(1, 'Name ist erforderlich'),
  contactPerson: z.string().optional().or(z.literal('')).nullish(),
  phone: z.string().optional().or(z.literal('')).nullish(),
  email: z.string().email('Ungültige E-Mail-Adresse').optional().or(z.literal('')).nullish()
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

const tableData = computed(() => {
  return schools.value || []
})

const columns: TableColumn<School>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'contactPerson',
    header: 'Ansprechpartner',
    cell: ({ row }) => row.getValue('contactPerson') || '-'
  },
  {
    accessorKey: 'phone',
    header: 'Telefon',
    cell: ({ row }) => row.getValue('phone') || '-'
  },
  {
    accessorKey: 'email',
    header: 'E-Mail',
    cell: ({ row }) => row.getValue('email') || '-'
  },
  {
    id: 'actions',
    header: 'Aktionen',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'flex items-center gap-2 justify-end' },
        [
          h(UButton, {
            icon: 'i-lucide-edit',
            color: 'neutral',
            variant: 'ghost',
            size: 'sm',
            'aria-label': 'Bearbeiten',
            onClick: () => {
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
            icon: 'i-lucide-trash-2',
            color: 'red',
            variant: 'ghost',
            size: 'sm',
            'aria-label': 'Löschen',
            onClick: () => {
              schoolToDelete.value = row.original
              isDeleteModalOpen.value = true
            }
          })
        ]
      )
    }
  }
]

const handleEditSubmit = async (event: FormSubmitEvent<SchoolSchema>) => {
  if (!schoolToEdit.value) return

  isSubmitting.value = true

  try {
    await $fetch(`/api/schools/${schoolToEdit.value.id}`, {
      method: 'PATCH',
      body: event.data
    })

    toast.add({
      title: 'Schule erfolgreich bearbeitet',
      color: 'success',
      icon: 'i-lucide-check-circle'
    })

    await refresh()
    handleEditCancel()
  } catch (error: unknown) {
    console.error('Edit school error:', error)
    
    if (error && typeof error === 'object' && 'data' in error && error.data && typeof error.data === 'object' && 'errors' in error.data) {
      // Serverseitige Validierungsfehler
      const errors = error.data.errors as Array<{ field: string; message: string }>
      errors.forEach(err => {
        toast.add({
          title: `Validierungsfehler: ${err.field}`,
          description: err.message,
          color: 'error',
          icon: 'i-lucide-alert-circle'
        })
      })
    } else if (error && typeof error === 'object' && 'data' in error && error.data && typeof error.data === 'object' && 'message' in error.data) {
      // Allgemeine serverseitige Fehler
      toast.add({
        title: 'Fehler beim Bearbeiten der Schule',
        description: String(error.data.message),
        color: 'error',
        icon: 'i-lucide-alert-circle'
      })
    } else {
      // Unbekannte Fehler
      toast.add({
        title: 'Fehler beim Bearbeiten der Schule',
        description: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
        color: 'error',
        icon: 'i-lucide-alert-circle'
      })
    }
  } finally {
    isSubmitting.value = false
  }
}

const handleAddSubmit = async (event: FormSubmitEvent<SchoolSchema>) => {
  isSubmitting.value = true

  try {
    await $fetch('/api/schools', {
      method: 'POST',
      body: event.data
    })

    toast.add({
      title: 'Schule erfolgreich erstellt',
      color: 'success',
      icon: 'i-lucide-check-circle'
    })

    await refresh()
    handleAddCancel()
  } catch (error: unknown) {
    console.error('Add school error:', error)
    
    if (error && typeof error === 'object' && 'data' in error && error.data && typeof error.data === 'object' && 'errors' in error.data) {
      // Serverseitige Validierungsfehler
      const errors = error.data.errors as Array<{ field: string; message: string }>
      errors.forEach(err => {
        toast.add({
          title: `Validierungsfehler: ${err.field}`,
          description: err.message,
          color: 'error',
          icon: 'i-lucide-alert-circle'
        })
      })
    } else if (error && typeof error === 'object' && 'data' in error && error.data && typeof error.data === 'object' && 'message' in error.data) {
      // Allgemeine serverseitige Fehler
      toast.add({
        title: 'Fehler beim Erstellen der Schule',
        description: String(error.data.message),
        color: 'error',
        icon: 'i-lucide-alert-circle'
      })
    } else {
      // Unbekannte Fehler
      toast.add({
        title: 'Fehler beim Erstellen der Schule',
        description: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
        color: 'error',
        icon: 'i-lucide-alert-circle'
      })
    }
  } finally {
    isSubmitting.value = false
  }
}

const handleEditCancel = () => {
  isEditModalOpen.value = false
  schoolToEdit.value = null
  Object.assign(editForm, { name: '', contactPerson: '', phone: '', email: '' })
}

const handleAddCancel = () => {
  isAddModalOpen.value = false
  Object.assign(addForm, { name: '', contactPerson: '', phone: '', email: '' })
}

const handleDeleteConfirm = async () => {
  if (!schoolToDelete.value) return

  isDeleting.value = true

  try {
    await $fetch(`/api/schools/${schoolToDelete.value.id}`, {
      method: 'DELETE'
    })

    toast.add({
      title: 'Schule erfolgreich gelöscht',
      color: 'success',
      icon: 'i-lucide-check-circle'
    })

    await refresh()
  } catch (error: unknown) {
    const errorMessage = error && typeof error === 'object' && 'data' in error && error.data && typeof error.data === 'object' && 'message' in error.data 
      ? String(error.data.message) 
      : 'Bitte versuchen Sie es erneut'
    
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

      <UTable
        :data="tableData"
        :columns="columns"
        :loading="pending"
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
    </UCard>

    <!-- Edit Modal -->
    <UModal v-model:open="isEditModalOpen" title="Schule bearbeiten" description="Bearbeiten Sie die Informationen der ausgewählten Schule." :close="false">
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
    <UModal v-model:open="isAddModalOpen" title="Neue Schule hinzufügen" description="Fügen Sie eine neue Pflegeschule hinzu." :close="false">
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
          Sind Sie sicher, dass Sie die Schule '{{ schoolToDelete?.name || '' }}' löschen möchten?
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
