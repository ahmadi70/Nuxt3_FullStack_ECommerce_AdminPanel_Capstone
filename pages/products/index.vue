<script setup lang="ts">
import type { SafeProduct, RouteParams } from '~/types'

const route = useRoute()

const colorId = computed(() => (route.query as RouteParams).colorId)
const sizeId = computed(() => (route.query as RouteParams).sizeId)
const categoryId = computed(() => (route.query as RouteParams).categoryId)

const { data: products, status } = await useFetch<SafeProduct[]>('/api/admin/products', {
  lazy: true,
  query: {
    categoryId: categoryId,
    sizeId: sizeId,
    colorId: colorId
  }
})

const { data: cachedSizes } = useNuxtData('sizes')
const { data: sizes, status: sizeStatus } = await useFetch('/api/admin/sizes', {
  key: 'sizes',
  default() {
    return cachedSizes.value
  }
})

const { data: cachedColors } = useNuxtData('colors')
const { data: colors, status: colorStatus } = await useFetch('/api/admin/colors', {
  key: 'colors',
  default() {
    return cachedColors.value
  }
})

const { data: cachedCategories } = useNuxtData('categories')
const { data: categories, status: categoryStatus } = await useFetch('/api/admin/categories', {
  key: 'categories',
  default() {
    return cachedCategories.value
  }
})

</script>

<template>
  <div>
    <div class="mx-auto max-w-6xl w-full my-4">
      <div class="px-4 pb-24">
        <MobileFilter :sizes="sizes" :colors="colors" :categories="categories"></MobileFilter>
        <div class="lg:grid lg:grid-cols-5 lg:gap-x-8">
          <div class="hidden lg:block">
             <Filter value-key="sizeId" name="Sizes" :data="sizes" />
             <Filter value-key="colorId" name="Colors" :data="colors" />
             <Filter value-key="categoryId" name="Categories" :data="categories" />
          </div>
          <div class="mt-6 lg:col-span-4 lg:mt-0">
            <NoResult v-if="status !== 'pending' && (!products || !products.length)"></NoResult>
            <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <template v-if="status !== 'pending' && products && products.length">
                <ProductCard v-for="item in products" :key="item.id" :data="item"></ProductCard>
              </template>
              <template v-else>
                <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  <CardLoader v-for="i in 6" :key="i"></CardLoader>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>