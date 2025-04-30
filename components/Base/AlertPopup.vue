<script setup lang="ts">
import useStore from '~/composables/useStore'

const { isLoading } = useStore()

const props = defineProps<{
  isOpen: boolean
}>()

const isModalVisible = computed(() => props.isOpen)

const emit = defineEmits(['onConfirm', 'onClose'])
</script>

<template>
  <WidgetModal
    :is-modal-visible="isModalVisible"
    title="Are you sure?"
    description="To continue the action click Confirm"
    @on-close="emit('onClose')"
    >

      <div class="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button
          :disabled="isLoading"
          variant="outline"
          @click="emit('onClose')"
          >Cancel</Button>
          <Button
          :disabled="isLoading"
          variant="destructive"
          @click="emit('onConfirm')"
          >Confirm</Button>
      </div>
    </WidgetModal>
</template>