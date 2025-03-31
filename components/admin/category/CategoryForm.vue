<script setup lang="ts">
import type { RouteParams } from '~/types'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import useStore from '~/compsables/useStore'

const { isLoading, toggleLoading, showMessage, showError, toggleAlertModal, isAlertModalVisible } = useStore()

const title = ref('Edit Category')
const description = ref('Edit Category')
const toastMessage = ref('Category Updated')
const action = ref('Save Changes')
const isEditing = ref(true)

const route = useRoute()
const { data: currentCategory } = await useFetch(`/api/admin/categories/${(route.params as RouteParams).categoryId}`)

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
      console.log('Edit Category ', values)

      // await $fetch('')

    } else {
      const data = await $fetch('/api/admin/categories/', {
        method: 'POST',
        body: values
      })

      console.log(data)
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
    
    console.log('Delete Category')

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
        @click="toggleAlertModal(true)"
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
  <AlertModal @on-confirm="deleteCategory" v-if="isAlertModalVisible"></AlertModal>
</template>