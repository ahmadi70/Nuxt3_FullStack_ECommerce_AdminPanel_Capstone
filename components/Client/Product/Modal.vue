<script setup lang="ts">
import usePreviewModal from '~/composables/usePreviewModal'

const { isOpen, onClose, selectedProduct } = usePreviewModal()

</script>

<template>
  <WidgetModal
    :is-modal-visible="isOpen"
    @on-close="onClose"
  >
    <div
      v-if="selectedProduct"
      class="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8"
    >
      <div class="sm:col-span-4 lg:col-span-6">
        <Carousel class="relative w-full">
          <CarouselContent>
            <CarouselItem v-for="(image, index) in selectedProduct.images" :key="index">
              <div
                class="p-2 flex aspect-square items-center justify-center border rounded"
              >
                <img
                  :src="image.url"
                  alt="product image"
                  class="size-[150px] object-cover object-center"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious class="previous-btn" />
          <CarouselNext class="next-btn" />
        </Carousel>
      </div>
      <div class="sm:col-span-8 lg:col-span-6">
        <ClientProductInfo :data="selectedProduct"></ClientProductInfo>
      </div>
    </div>
  </WidgetModal>
</template>

<style scoped>
.previous-btn {
  left: calc(50% - 40px);
  top: calc(100% + 30px);
}
.next-btn {
  left: 50%;
  top: calc(100% + 30px);
}
</style>