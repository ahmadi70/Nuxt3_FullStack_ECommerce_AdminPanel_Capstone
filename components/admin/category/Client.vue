<script setup lang="ts">
import { columns } from '~/components/admin/category/column'

const { data: categories, status } = await useFetch('/api/admin/categories', {
  key: 'categories'
})

</script>

<template>
  <div class="flex items-center justify-between">
    <Heading
      description="Manage Categories"
      title="Categories"
    >
    </Heading>
    <NuxtLink to="/admin/categories/new">
      <Button>
        <Icon name="lucide:plus" class="mr-2 h-4 w-4"></Icon>
        Add New
      </Button>
    </NuxtLink>
  </div>
  <DataTable
    :columns="columns"
    v-if="status !== 'pending'"
    :data="categories ? categories : []"
    column-to-search="name"
  ></DataTable>
</template>