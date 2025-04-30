<script setup lang="ts">
import type { SafeProduct } from '~/types'

const { data: products, status } = await useFetch<SafeProduct[]>(`/api/admin/products?isFeatured=true`, {
  lazy: true
})

</script>

<template>
  <BaseSection>
    <ClientProductList :items="products" title="Featured Products" :is-loading="status === 'pending'" />
  </BaseSection>
</template>