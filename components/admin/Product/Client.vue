<script setup lang="ts">
import { columns } from '~/components/Admin/Product/Column'

const { data: products, status } = await useFetch('/api/admin/products', {
  key: 'products',
  transform: (products) => {
    return products.map(item => ({
      id: item.id,
      name: item.name,
      price: formatter.format(item.price),
      isFeatured: item.isFeatured,
      isArchived: item.isArchived,
      category: item.category.name,
      size: item.size.value,
      color: item.color.value,
      createdAt: useDateFormat(new Date(item.createdAt), 'D. MMMM YYYY')
    }))
  }
})

</script>

<template>
  <div class="flex items-center justify-between">
    <BaseHeading
      description="Manage Products"
      title="Products"
    >
    </BaseHeading>
    <NuxtLink to="/admin/products/new">
      <Button>
        <Icon name="lucide:plus" class="mr-2 h-4 w-4"></Icon>
        Add New
      </Button>
    </NuxtLink>
  </div>
  <WidgetDataTable
    :columns="columns"
    v-if="status !== 'pending'"
    :data="products ? products : []"
    column-to-search="name"
  ></WidgetDataTable>
</template>