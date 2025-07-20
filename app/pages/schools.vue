<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

import type { School } from '../../types/database'

const UButton = resolveComponent('UButton')

definePageMeta({
  name: 'schools-management-page'
})

const { data: schools, pending, refresh } = await useFetch<School[]>('/api/schools')

const toast = useToast()

// Modal state
const isDeleteModalOpen = ref(false)
const schoolToDelete = ref<School | null>(null)

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
              // TODO: Implement edit functionality
              toast.add({
                title: 'Bearbeiten noch nicht implementiert',
                color: 'warning'
              })
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

const handleDeleteConfirm = async () => {
  if (!schoolToDelete.value) return

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
  }
}

const handleDeleteCancel = () => {
  isDeleteModalOpen.value = false
  schoolToDelete.value = null
}
</script>

<template>
  <div class="p-6">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h1 class="text-xl font-semibold">
            Pflegeschulen
          </h1>
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
            @click="handleDeleteConfirm"
          >
            Löschen
          </UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>
