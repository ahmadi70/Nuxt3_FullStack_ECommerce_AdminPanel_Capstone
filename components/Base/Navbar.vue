<script setup lang="ts">
import useCart from '~/composables/useCart'

const { user, clear } = useUserSession()

const logout = async () => {
  await clear()
  navigateTo('/auth/login')
}

const { cartItems } = useCart()

</script>

<template>
  <nav class="flex items-center space-x-4 lg:space-x-6">
    <template v-if="user">
      <DropdownMenu v-if="user.role === 'ADMIN'">
        <DropdownMenuTrigger as-child>
          <Button variant="secondary" class="relative">
            Admin 
            <Icon name="lucide:chevron-down" class="h-4 w-4 ml-2"></Icon>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56" align="end">
          <NuxtLink to="/admin">
            <DropdownMenuItem>
              Analytics
            </DropdownMenuItem>
          </NuxtLink>
          <NuxtLink to="/admin/categories">
            <DropdownMenuItem>
              Categories
            </DropdownMenuItem>
          </NuxtLink>
          <NuxtLink to="/admin/products">
            <DropdownMenuItem>
              Product
            </DropdownMenuItem>
          </NuxtLink>
          <NuxtLink to="/admin/sizes">
            <DropdownMenuItem>
              Sizes
            </DropdownMenuItem>
          </NuxtLink>
          <NuxtLink to="/admin/colors">
            <DropdownMenuItem>
              Colors
            </DropdownMenuItem>
          </NuxtLink>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" size="icon" class="h-8 w-8 rounded-full relative"> 
            <Avatar>
              <Icon name="radix-icons:avatar" class="h-4 w-4"></Icon>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56" align="end">
          <DropdownMenuLabel class="font-normal flex">
            <div class="flex flex-col space-y-1">
              <p class="text-sm font-medium leading-none">
                {{ user.name }}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="logout">
            <Icon name="solar:logout-2-broken" class="h-4 w-4"></Icon>
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </template>
    <NuxtLink to="/cart">
      <Button class="relative px-5 py-1 h-8 space-x-2">
        <Icon name="lucide:shopping-bag" class="h-4 w-4"></Icon>
        {{ cartItems ? cartItems.length : 0 }}
      </Button>
    </NuxtLink>
  </nav>
</template>