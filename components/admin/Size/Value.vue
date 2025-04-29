<script setup lang="ts">

defineProps<{
  sizeCode: string
}>()
</script>

<template>
  <div class="flex items-center gap-x-2">
    {{ sizeCode }}
  </div>
</template>