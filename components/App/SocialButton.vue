<script setup lang="ts">
defineProps<{
  label: string
  icon: string
}>()

const authenticate = () => {
  window.location.href = '/api/auth/github'
}
</script>

<template>
  <Button
    @click="authenticate"
    type="button"
    variant="outline"
  >
    <div class="flex items-center gap-1">
      <Icon :name="icon" class="w-4 h-4"></Icon>
      {{ label }}
    </div>
  </Button>
</template>