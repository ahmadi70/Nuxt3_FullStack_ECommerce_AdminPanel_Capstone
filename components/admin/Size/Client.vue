<script setup lang="ts">
import { columns } from '~/components/Admin/Size/Column'

const { data: sizes, status } = await useFetch('/api/admin/sizes', {
  key: 'sizes',
  transform: (sizes) => {
    return sizes.map(item => {
      return {
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: useDateFormat(new Date(item.createdAt), 'D. MMMM YYYY')
      }
    })
  }
})

</script>

<template>
  <div class="flex items-center justify-between">
    <BaseHeading
      description="Manage Sizes"
      title="Sizes"
    >
    </BaseHeading>
    <NuxtLink to="/admin/sizes/new">
      <Button>
        <Icon name="lucide:plus" class="mr-2 h-4 w-4"></Icon>
        Add New
      </Button>
    </NuxtLink>
  </div>
  <DataTable
    :columns="columns"
    v-if="status !== 'pending'"
    :data="sizes ? sizes : []"
    column-to-search="name"
  ></DataTable>
</template>