<script setup lang="ts">
import useStore from '~/compsables/useStore'

const props = defineProps<{
  category: {
    id: string
  }
}>()

function copy(id: string) {
  navigator.clipboard.writeText(id)
}

const { showMessage, showError, toggleLoading} = useStore()

const isAlertModalVisible = ref(false)

const deleteCategory = async () => {
  try {

    toggleLoading(true) 

    await $fetch(`/api/admin/categories/${props.category.id}`, {
        method: 'DELETE'
      })

    showMessage({
      title: 'Delete Category'
    })

    refreshNuxtData('categories')

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
      <DropdownMenuItem @click="copy(category.id)">
        <Icon name="lucide:copy" class="mr-2 w-4 h-4" />
        <span>Copy ID</span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="navigateTo(`/admin/categories/${category.id}`)">
        <Icon name="lucide:pencil" class="mr-2 w-4 h-4" />
        <span>Edit</span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="isAlertModalVisible = !isAlertModalVisible">
        <Icon name="lucide:trash" class="mr-2 w-4 h-4" />
        <span>Delete</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <AlertModal
    v-if="isAlertModalVisible"
    @on-confirm="deleteCategory"
    :is-open="isAlertModalVisible"
    @on-close="isAlertModalVisible = false"
  ></AlertModal>
</template>