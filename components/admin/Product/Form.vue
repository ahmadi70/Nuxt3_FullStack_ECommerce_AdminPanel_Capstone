<script setup lang="ts">
import type { RouteParams } from '~/types'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import useStore from '~/composables/useStore'
import type { Category, Color, Size, Image } from '@prisma/client'

const { isLoading, toggleLoading, showMessage, showError } = useStore()

const title = ref('Edit Product')
const description = ref('Edit Product')
const toastMessage = ref('Product Updated')
const action = ref('Save Changes')
const isEditing = ref(true)
const isAlertPopupVisible = ref(false)

const route = useRoute()
const productId = (route.params as RouteParams).productId
const { data: currentProduct } = productId !== "new" 
  ? await useFetch(`/api/admin/products/${productId}`)
  : { data: ref(null) }
// const { data: currentProduct } = await useFetch(`/api/admin/products/${(route.params as RouteParams).productId}`)
const { data: categories } = await useFetch<Category[]>('/api/admin/categories')
const { data: colors } = await useFetch<Color[]>('/api/admin/colors')
  const { data: sizes } = await useFetch<Size[]>('/api/admin/sizes')

watchEffect(() => {
  if(!currentProduct.value) {
    title.value = 'Add Product'
    description.value = 'Add a new Product'
    toastMessage.value = 'Product Added'
    action.value = 'Create Product'
    isEditing.value = false
  }
})

const formSchema = toTypedSchema(productSchema)

const form = useForm({
  validationSchema: formSchema,
  initialValues: currentProduct.value  ? {
    ...currentProduct.value
  } : {
    name: '',
    price: 0,
    categoryId: '',
    sizeId: '',
    colorId: '',
    images: [],
    isFeatured: false,
    isArchived: false
  }
})

const onSubmit = form.handleSubmit(async (values) => {
  try {

    toggleLoading(true)

    if (isEditing.value) {
      await $fetch(`/api/admin/products/${(route.params as RouteParams).productId}`, {
        method: 'PATCH',
        body: values
      })

    } else {
      const data = await $fetch('/api/admin/products/', {
        method: 'POST',
        body: values
      })
    }

    showMessage({
      title: toastMessage.value
    })

    await navigateTo('/admin/products')
    
  } catch (error) {
    
    const err = handleError(error)
    showError(err)

  } finally {
    toggleLoading(false)
  }
})

const deleteProduct = async () => {
  try {

    toggleLoading(true) 

    await $fetch(`/api/admin/products/${(route.params as RouteParams).productId}`, {
        method: 'DELETE'
      })

    showMessage({
      title: 'Delete Product'
    })

    await navigateTo('/admin/products')

  } catch (error) {

    const err = handleError(error)
    showError(err)

  } finally {
    toggleLoading(false)
  }
}

</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <heading :title="title" :description="description"></heading>
      <Button
        @click="isAlertPopupVisible != isAlertPopupVisible"
        v-if="isEditing"
        size="sm"
        variant="destructive"
      >
        <Icon name="lucide:trash" class="w-4 h-4"></Icon>
      </Button>
    </div>
    <Separator class="my-4"></Separator>

    <form @submit.prevent="onSubmit" class="space-y-8 w-full">
      <FormField v-slot="{ componentField, resetField }" name="images">
        <FormItem>
          <FormLabel>Product Images</FormLabel>
          <FormControl>
            <WidgetImageUpload
              @on-change="(url) => resetField({ value: [...componentField.modelValue, { url }]})"
              @on-remove="(url) => resetField({ value: [...componentField.modelValue.filter((currentImage: Image) => currentImage.url !== url)]})"
              :value="componentField.modelValue.map((image: Image) => image.url)"
              v-bind="$attrs"
            >
            </WidgetImageUpload>
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      </FormField>
      <div class="md:grid md:grid-cols-3 gap-8">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                v-bind="componentField"
                :disabled="isLoading"
                placeholder="Product Name"
              />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="price">
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input
                type="number"
                v-bind="componentField"
                :disabled="isLoading"
                placeholder="Product Price"
              />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="categoryId">
          <FormItem>
            <FormLabel>Category</FormLabel>
              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="category in categories"
                      :key="category.id"
                      :value="category.id"
                    >
                      {{ category.name }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="sizeId">
          <FormItem>
            <FormLabel>Size</FormLabel>
              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="size in sizes"
                      :key="size.id"
                      :value="size.id"
                    >
                      {{ size.name }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="colorId">
          <FormItem>
            <FormLabel>Color</FormLabel>
              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Color" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="color in colors"
                      :key="color.id"
                      :value="color.id"
                    >
                      {{ color.name }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ value, handleChange }" name="isArchived">
          <FormItem class="flex flex-row items-start gap-x-3 space-y-0 border p-4">
            <FormControl>
              <Checkbox :model-value="value" @update:model-value="handleChange"/>
            </FormControl>
            <div class="space-y-1 leading-none">
              <FormLabel>Archived</FormLabel>
              <FormDescription>
                This product will not appear anywhere in the shop.
              </FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        </FormField>
        <FormField v-slot="{ value, handleChange }" name="isFeatured">
          <FormItem class="flex flex-row items-start gap-x-3 space-y-0 border p-4">
            <FormControl>
              <Checkbox :model-value="value" @update:model-value="handleChange" />
            </FormControl>
            <div class="space-y-1 leading-none">
              <FormLabel>Featured</FormLabel>
              <FormDescription>
                This product will appear in the features product section.
              </FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        </FormField>
      </div>
      <Button
        :disabled="isLoading"
        class="ml-auto"
        type="submit"
      >{{ action }}</Button>
    </form>
  </div>
  <BaseAlertPopup
    v-if="isAlertPopupVisible"
    @on-confirm="deleteProduct"
    :is-open="isAlertPopupVisible"
    @on-close="isAlertPopupVisible = false"
  ></BaseAlertPopup>
</template>