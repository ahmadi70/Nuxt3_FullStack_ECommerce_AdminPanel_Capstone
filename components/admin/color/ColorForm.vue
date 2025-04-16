<script setup lang="ts">
import type { RouteParams } from '~/types'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import useStore from '~/composables/useStore'

const { isLoading, toggleLoading, showMessage, showError } = useStore()

const title = ref('Edit Color')
const description = ref('Edit Color')
const toastMessage = ref('Color Updated')
const action = ref('Save Changes')
const isEditing = ref(true)
const isAlertModalVisible = ref(false)

const route = useRoute()
const colorId = (route.params as RouteParams).colorId
const { data: currentColor } = colorId !== "new" 
  ? await useFetch(`/api/admin/colors/${colorId}`)
  : { data: ref(null) }

watchEffect(() => {
  if(!currentColor.value) {
    title.value = 'Add Color'
    description.value = 'Add a new Color'
    toastMessage.value = 'Color Added'
    action.value = 'Create Color'
    isEditing.value = false
  }
})

const formSchema = toTypedSchema(colorSchema)

const form = useForm({
  validationSchema: formSchema,
  initialValues: currentColor.value || {
    name: '',
    value: '#000000'
  }
})

const onSubmit = form.handleSubmit(async (values) => {
  try {

    toggleLoading(true)

    if (isEditing.value) {
      await $fetch(`/api/admin/colors/${(route.params as RouteParams).colorId}`, {
        method: 'PATCH',
        body: values
      })

    } else {
      const data = await $fetch('/api/admin/colors/', {
        method: 'POST',
        body: values
      })
    }

    showMessage({
      title: toastMessage.value
    })

    // Todo: refresh data
    await navigateTo('/admin/colors')
    
  } catch (error) {
    
    const err = handleError(error)
    showError(err)

  } finally {
    toggleLoading(false)
  }
})

const deleteColor = async () => {
  try {

    toggleLoading(true) 

    await $fetch(`/api/admin/colors/${(route.params as RouteParams).colorId}`, {
        method: 'DELETE'
      })

    showMessage({
      title: 'Delete Color'
    })

    await navigateTo('/admin/colors')

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
        @click="isAlertModalVisible != isAlertModalVisible"
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
                placeholder="Color Name"
              />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="value">
          <FormItem>
            <FormLabel>Color Code</FormLabel>
            <FormControl>
              <Input
                v-bind="componentField"
                :disabled="isLoading"
                placeholder="#000000"
                type="color"
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
  <AlertModal
    v-if="isAlertModalVisible"
    @on-confirm="deleteColor"
    :is-open="isAlertModalVisible"
    @on-close="isAlertModalVisible = false"
  ></AlertModal>
</template>