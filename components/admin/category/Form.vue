<script setup lang="ts">
import type { RouteParams } from '~/types'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import useStore from '~/composables/useStore'

const { isLoading, toggleLoading, showMessage, showError } = useStore()

const title = ref('Edit Category')
const description = ref('Edit Category')
const toastMessage = ref('Category Updated')
const action = ref('Save Changes')
const isEditing = ref(true)
const isAlertPopupVisible = ref(false)

const route = useRoute()
const categoryId = (route.params as RouteParams).categoryId
const { data: currentCategory } = categoryId !== "new" 
  ? await useFetch(`/api/admin/categories/${categoryId}`)
  : { data: ref(null) }

watchEffect(() => {
  if(!currentCategory.value) {
    title.value = 'Add Category'
    description.value = 'Add a new Category'
    toastMessage.value = 'Category Added'
    action.value = 'Create Category'
    isEditing.value = false
  }
})

const formSchema = toTypedSchema(categorySchema)

const form = useForm({
  validationSchema: formSchema,
  initialValues: currentCategory.value || {
    name: ''
  }
})

const onSubmit = form.handleSubmit(async (values) => {
  try {

    toggleLoading(true)

    if (isEditing.value) {
      await $fetch(`/api/admin/categories/${(route.params as RouteParams).categoryId}`, {
        method: 'PATCH',
        body: values
      })

    } else {
      const data = await $fetch('/api/admin/categories/', {
        method: 'POST',
        body: values
      })
    }

    showMessage({
      title: toastMessage.value
    })

    // Todo: refresh data
    await navigateTo('/admin/categories')
    
  } catch (error) {
    
    const err = handleError(error)
    showError(err)

  } finally {
    toggleLoading(false)
  }
})

const deleteCategory = async () => {
  try {

    toggleLoading(true) 

    await $fetch(`/api/admin/categories/${(route.params as RouteParams).categoryId}`, {
        method: 'DELETE'
      })

    showMessage({
      title: 'Delete Category'
    })

    await navigateTo('/admin/categories')

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
      <div class="md:grid md:grid-cols-3 gap-8">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                v-bind="componentField"
                :disabled="isLoading"
                placeholder="Category Name"
              />
            </FormControl>
            <FormDescription />
            <FormMessage />
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
    @on-confirm="deleteCategory"
    :is-open="isAlertPopupVisible"
    @on-close="isAlertPopupVisible = false"
  ></BaseAlertPopup>
</template>