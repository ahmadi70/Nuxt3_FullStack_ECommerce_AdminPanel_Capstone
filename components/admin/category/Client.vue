<script setup lang="ts">

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
</template>