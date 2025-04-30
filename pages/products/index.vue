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
        <AppMobileFilter :sizes="sizes" :colors="colors" :categories="categories"></AppMobileFilter>
        <div class="lg:grid lg:grid-cols-5 lg:gap-x-8">
          <div class="hidden lg:block">
             <WidgetFilter value-key="sizeId" name="Sizes" :data="sizes" />
             <WidgetFilter value-key="colorId" name="Colors" :data="colors" />
             <WidgetFilter value-key="categoryId" name="Categories" :data="categories" />
          </div>
          <div class="mt-6 lg:col-span-4 lg:mt-0">
            <BaseNoResult v-if="status !== 'pending' && (!products || !products.length)"></BaseNoResult>
            <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <template v-if="status !== 'pending' && products && products.length">
                <ClientProductCard v-for="item in products" :key="item.id" :data="item"></ClientProductCard>
              </template>
              <template v-else>
                <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  <BaseCardLoader v-for="i in 6" :key="i"></BaseCardLoader>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>