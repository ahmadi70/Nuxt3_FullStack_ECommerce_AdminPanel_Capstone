<script setup lang="ts">
import useStore from '~/compsables/useStore';

interface UploadImpageProps {
  value: string[]
  allowedFormats?: string[]
}

interface Result {
  info: {
    secure_url: string
  }
}

defineProps<UploadImpageProps>()

const { public: {uploadPreset} } = useRuntimeConfig()

const { isLoading, toggleLoading, showError, showMessage } = useStore()

const emits = defineEmits(['onChange', 'onRemove'])

const onUpload = (result: any) => {
  console.log('Upload result:', result)
  emits('onChange', result.info.secure_url)
}

const handleUploadError = (error: any) => {
  console.error("Upload Error:", error)
}

const handleUploadResult = (error: any) => {
  console.log("Upload Result:", error)
}

const deleteImage = async (url: string) => {
  try {
    toggleLoading(true)
    const resourceName = getResourceName(url)
    await $fetch(`/api/admin/cloudinary/${resourceName}`, {
      method: 'DELETE'
    })
    showMessage({
      title: 'Image Deleted'
    })
    emits('onRemove', url)
  } catch (error) {
    const err = handleError(error)
    showError(err)
  } finally {
    toggleLoading(false)
  }
}

</script>

<template>
  <div v-bind="$attrs" class="mb-4 flex items-center gap-4">
    <div
      v-for="(url, i) in value"
      :key="i"
      class="relative w-[200px] h-[200px] rounded-md overflow-hidden"
    >
      <div class="z-10 absolute top-2 right-2">
        <Button
          :disabled="isLoading"
          @click="deleteImage(url)"
          size="sm"
          type="button"
          variant="destructive"
        >
          <Icon name="lucide:trash" class="h-4 w-4"></Icon>
        </Button>
      </div>
      <img :src="url" class="object-cover w-full h-full" alt="Image" />
    </div>
  </div>
  <CldUploadWidget
      v-slot="{ open }"
      :uploadPreset="uploadPreset"
      :on-upload="onUpload"
      :on-error="handleUploadError"
      :on-result="handleUploadResult"
      :options="{
        clientAllowedFormats: allowedFormats,
        multiple: false,
        maxFiles: 3
      }"
    >
      <Button
        @click="open"
        type="button"
        :disabled="isLoading"
        variant="secondary"
      >
        <Icon name="lucide:image-plus" class="mr-2 w-4 h-4"></Icon>
        Upload an Image
      </Button>
    </CldUploadWidget>
</template>