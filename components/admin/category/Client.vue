<script setup lang="ts">
import { columns } from '~/components/Admin/Category/Column'

const { data: categories, status } = await useFetch('/api/admin/categories', {
  key: 'categories',
  transform: (colors) => {
    return colors.map(item => {
      return {
        id: item.id,
        name: item.name,
        createdAt: useDateFormat(new Date(item.createdAt), 'D. MMMM YYYY')
      }
    })
  }
})

</script>

<template>
  <div class="flex items-center justify-between">
    <BaseHeading
      description="Manage Categories"
      title="Categories"
    >
    </BaseHeading>
    <NuxtLink to="/admin/categories/new">
      <Button>
        <Icon name="lucide:plus" class="mr-2 h-4 w-4"></Icon>
        Add New
      </Button>
    </NuxtLink>
  </div>
  <WidgetDataTable
    :columns="columns"
    v-if="status !== 'pending'"
    :data="categories ? categories : []"
    column-to-search="name"
  ></WidgetDataTable>
</template>