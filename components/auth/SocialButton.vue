<script setup lang="ts">
defineProps<{
  label: string
  icon: string
}>()
</script>

<template>
  <Button type="button" variant="outline">
    <div class="flex items-center gap-1">
      <Icon :name="icon" class="w-4 h-4"></Icon>
      {{ label }}
    </div>
  </Button>
</template>