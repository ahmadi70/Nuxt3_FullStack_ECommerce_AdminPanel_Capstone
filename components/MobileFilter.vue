<script setup lang="ts">
import type { Color, Size, Category } from '@prisma/client'

interface FilterProps {
  sizes: Size[]
  colors: Color[]
  categories: Category[]
}

defineProps<FilterProps>()

</script>

<template>
  <Sheet>
    <SheetTrigger>
      <Button class="rounded-full lg:hidden">
        <Icon class="size-4 mr-2" name="lucide:plus" />
        Filters
      </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader class="mb-6">
        <SheetTitle>Filters</SheetTitle>
      </SheetHeader>
      <Filter value-key="sizeId" name="Sizes" :data="sizes" />
      <Filter value-key="colorId" name="Colors" :data="colors" />
      <Filter value-key="categoryId" name="Categories" :data="categories" />
    </SheetContent>
  </Sheet>
</template>