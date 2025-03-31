<script setup lang="ts">
import useStore from '~/compsables/useStore'

const { isLoading, isAlertModalVisible, toggleAlertModal } = useStore()

const isModalVisible = computed(() => isAlertModalVisible.value)

const emit = defineEmits(['onConfirm'])
</script>

<template>
  <Modal
    :is-modal-visible="isModalVisible"
    title="Are you sure?"
    description="To continue the action click Confirm"
    @on-close="toggleAlertModal(false)"
    >

      <div class="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button
          :disabled="isLoading"
          variant="outline"
          @click="toggleAlertModal(false)"
          >Cancel</Button>
          <Button
          :disabled="isLoading"
          variant="destructive"
          @click="emit('onConfirm')"
          >Confirm</Button>
      </div>
    </Modal>
</template>