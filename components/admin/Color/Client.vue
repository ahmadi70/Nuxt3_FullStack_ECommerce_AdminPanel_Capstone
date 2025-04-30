<script setup lang="ts">
import { columns } from '~/components/Admin/Color/Column'

const { data: colors, status } = await useFetch('/api/admin/colors', {
  key: 'colors',
  transform: (colors) => {
    return colors.map(item => {
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
      description="Manage Colors"
      title="Colors"
    >
    </BaseHeading>
    <NuxtLink to="/admin/colors/new">
      <Button>
        <Icon name="lucide:plus" class="mr-2 h-4 w-4"></Icon>
        Add New
      </Button>
    </NuxtLink>
  </div>
  <WidgetDataTable
    :columns="columns"
    v-if="status !== 'pending'"
    :data="colors ? colors : []"
    column-to-search="name"
  ></WidgetDataTable>
</template>