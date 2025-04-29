<script setup lang="ts">
import useCart from '~/composables/useCart'
import useStore from '~/composables/useStore'

const { cartItems, removeAll} = useCart()

const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + Number(item.price)
  }, 0)
})

const haveItem = computed(() => cartItems.value.length)

const onCheckout = async () => {
  const orderItems = cartItems.value.map(item => item.id)

  const data = await $fetch('/api/checkout', {
    method: 'POST',
    body: orderItems
  })

  console.log(data)

  if (data) {
    window.location.href = data
  }

  removeAll()

  return
}

const route = useRoute()
const { showMessage } = useStore()
onMounted(() => {
  if(route.query.success) {
    showMessage({
      title: 'Payment Completed'
    })
  }
  if(route.query.canceled) {
    showMessage({
      title: 'Something went wrong',
      variant: 'destructive'
    })
  }
})
</script>

<template>
  <div class="lg:ml-16 rounded-lg bg-gray-50 px-4 py-6 lg:col-span-5 lg:mt-0 lg:p-8">
    <h2 class="text-lg font-medium text-gray-900">Order summary for this</h2>
    <div class="mt-6 space-y-4">
      <div class="flex items-center justify-between border-t border-gray-200 pt-4">
        <div class="text-base font-medium text-gray-900">Order total</div>
        <div class="font-semibold">{{ formatter.format(Number(totalPrice)) }}</div>
      </div>
    </div>
    <Button
      @click="onCheckout"
      type="button"
      :disabled="!haveItem"
      class="w-full mt-6"      
    >Checkout</Button>
  </div>
</template>