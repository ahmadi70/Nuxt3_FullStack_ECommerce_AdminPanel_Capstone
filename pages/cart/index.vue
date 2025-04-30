<script setup lang="ts">
import useCart from '~/composables/useCart'

const { cartItems } = useCart()
</script>

<template>
  <div class="px-4 py-16 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold text-black">Shopping Cart</h1>
    <div class="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
      <div class="lg:col-span-7">
        <ul>
          <ClientCartItem    
            v-for="item in cartItems"
            :key="item.id"
            :data="item"        
          />
          <p class="text-neutral-500" v-if="!cartItems.length">
            No Items added to the cart
          </p>
        </ul>
      </div>
      <ClientCartSummary />
    </div>
  </div>
</template>