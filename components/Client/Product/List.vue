<script setup lang="ts">
import type { SafeProduct } from '~/types'

defineProps<{
  title: string
  items: SafeProduct[]
  isLoading: boolean
}>()
</script>

<template>
  <div class="space-y-4">
    <h3 class="font-bold text-3xl">{{ title }}</h3>
    <BaseNoResult v-if="!items.length"></BaseNoResult>
    <div class="grid grid-cols-3 gap-8">
      <template v-if="!isLoading">
        <ClientProductCard v-for="item in items" :key="item.id" :data="item"></ClientProductCard>
      </template>
      <template v-else>
        <BaseCardLoader v-for="i in 3" :key="i"></BaseCardLoader>
      </template>
    </div>
  </div>
</template>