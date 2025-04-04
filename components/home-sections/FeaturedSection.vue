<script setup lang="ts">
import type { SafeProduct } from '~/types'

const { data, status } = await useFetch<{ featuredProducts: SafeProduct[] }>('/api/admin/products', {
  lazy: true
})

const featuredProducts = computed(() => data.value?.featuredProducts || [])

</script>

<template>
  <Section>
    <ProductList :items="featuredProducts" title="Featured Products" :is-loading="status === 'pending'" />
  </Section>
</template>