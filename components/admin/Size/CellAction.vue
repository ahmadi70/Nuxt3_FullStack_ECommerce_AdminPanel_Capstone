<script setup lang="ts">
import useStore from '~/composables/useStore'

const props = defineProps<{
  size: {
    id: string
  }
}>()

function copy(id: string) {
  navigator.clipboard.writeText(id)
  showMessage({
    title: 'Size Id copied'
  })
}

const { showMessage, showError, toggleLoading} = useStore()

const isAlertPopupVisible = ref(false)

const deleteSize = async () => {
  try {

    toggleLoading(true) 

    await $fetch(`/api/admin/sizes/${props.size.id}`, {
        method: 'DELETE'
      })

    showMessage({
      title: 'Delete Size'
    })

    refreshNuxtData('sizes')

  } catch (error) {

    const err = handleError(error)
    showError(err)

  } finally {
    toggleLoading(false)
  }
}

</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <Icon name="lucide:more-horizontal" class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="copy(size.id)">
        <Icon name="lucide:copy" class="mr-2 w-4 h-4" />
        <span>Copy ID</span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="navigateTo(`/admin/sizes/${size.id}`)">
        <Icon name="lucide:pencil" class="mr-2 w-4 h-4" />
        <span>Edit</span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="isAlertPopupVisible = !isAlertPopupVisible">
        <Icon name="lucide:trash" class="mr-2 w-4 h-4" />
        <span>Delete</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <BaseAlertPopup
    v-if="isAlertPopupVisible"
    @on-confirm="deleteSize"
    :is-open="isAlertPopupVisible"
    @on-close="isAlertPopupVisible = false"
  ></BaseAlertPopup>
</template>