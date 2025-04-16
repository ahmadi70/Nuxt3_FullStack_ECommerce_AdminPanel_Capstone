<script setup lang="ts">
import type { RouteParams } from '~/types'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import useStore from '~/composables/useStore'

const { isLoading, toggleLoading, showMessage, showError } = useStore()

const title = ref('Edit Size')
const description = ref('Edit Size')
const toastMessage = ref('Size Updated')
const action = ref('Save Changes')
const isEditing = ref(true)
const isAlertModalVisible = ref(false)

const route = useRoute()
const sizeId = (route.params as RouteParams).sizeId
const { data: currentSize } = sizeId !== "new" 
  ? await useFetch(`/api/admin/sizes/${sizeId}`)
  : { data: ref(null) }

watchEffect(() => {
  if(!currentSize.value) {
    title.value = 'Add Size'
    description.value = 'Add a new Size'
    toastMessage.value = 'Size Added'
    action.value = 'Create Size'
    isEditing.value = false
  }
})

const formSchema = toTypedSchema(sizeSchema)

const form = useForm({
  validationSchema: formSchema,
  initialValues: currentSize.value || {
    name: '',
    value: ''
  }
})

const onSubmit = form.handleSubmit(async (values) => {
  try {

    toggleLoading(true)

    if (isEditing.value) {
      await $fetch(`/api/admin/sizes/${(route.params as RouteParams).sizeId}`, {
        method: 'PATCH',
        body: values
      })

    } else {
      const data = await $fetch('/api/admin/sizes/', {
        method: 'POST',
        body: values
      })
    }

    showMessage({
      title: toastMessage.value
    })

    // Todo: refresh data
    await navigateTo('/admin/sizes')
    
  } catch (error) {
    
    const err = handleError(error)
    showError(err)

  } finally {
    toggleLoading(false)
  }
})

const deleteSize = async () => {
  try {

    toggleLoading(true) 

    await $fetch(`/api/admin/sizes/${(route.params as RouteParams).sizeId}`, {
        method: 'DELETE'
      })

    showMessage({
      title: 'Delete Size'
    })

    await navigateTo('/admin/sizes')

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
                placeholder="Size Name"
              />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="value">
          <FormItem>
            <FormLabel>Size Code</FormLabel>
            <FormControl>
              <Input
                v-bind="componentField"
                :disabled="isLoading"
                placeholder="xl"
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
    @on-confirm="deleteSize"
    :is-open="isAlertModalVisible"
    @on-close="isAlertModalVisible = false"
  ></AlertModal>
</template>