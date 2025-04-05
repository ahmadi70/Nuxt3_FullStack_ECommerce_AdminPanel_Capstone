<script setup lang="ts">
import type { SafeProduct } from '@/types'

interface InfoProps {
  data: SafeProduct
}

defineProps<InfoProps>()
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900">{{ data.name }}</h1>
    <div class="mt-3 flex items-end justify-between">
      <div class="text-2xl text-gray-900">
        <div class="flex items-center justify-between">
          <div class="font-semibold">
            {{ formatter.format(Number(data?.price)) }}
          </div>
        </div>
      </div>
    </div>
    <hr class="my-4">
    <div class="flex flex-col gap-y-6">
      <div class="flex items-center gap-x-4">
        <h3 class="font-semibold text-black">Size:</h3>
        <div>{{ data?.size?.value }}</div>
      </div>
      <div class="flex items-center gap-x-4">
        <h3 class="font-semibold text-black">Color:</h3>
        <div class="h-6 w-6 rounded-full border border-gray-600" :style="`background-color: ${data.color.value}`" />
      </div>
    </div>
    <div class="mt-10 flex items-center gap-x-3">
      <Button class="rounded-full">
        Add to Cart
        <Icon name="lucide:shopping-cart" class="h-4 w-4 mr-2" />
      </Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>