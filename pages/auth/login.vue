<script setup lang="ts">
import useStore from '~/compsables/useStore'


type PAYLOAD = {
  email: string
  password: string
}

const form = ref<PAYLOAD>({
  email: '',
  password: ''
})

const { toggleLoading, showMessage, showError, isLoading } = useStore()
const onSubmit = async () => {
  try {
    toggleLoading(true)

    await $fetch('/api/auth/login', {
      method: 'POST',
      body: form.value 
    })

    showMessage({
      title: 'Welcome Back'
    })

    await navigateTo('/')

  } catch (error) {
    const err = handleError(error)
    showError(err)
  } finally {
    toggleLoading(false)
  }
}

</script>

<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="w-full max-w-sm">
      <form @submit.prevent="onSubmit">
        <Card class="w-full max-w-md">
          <CardHeader>
            <CardTitle class="text-2xl font-bold">Login</CardTitle>
            <CardDescription>Enter your email and password to login to your account.</CardDescription>
          </CardHeader>
          <CardContent class="grid gap-4">
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input
                v-model="form.email"
                id="email"
                placeholder="nahid@test.com"
                type="email"
                required
              />
            </div>
            <div class="grid gap-2">
              <Label for="password">Password</Label>
              <Input
                v-model="form.password"
                id="password"
                type="password"
                required
              />
            </div>
            <div class="grid grid-cols-1 mt-2">
              <SocialButton
                icon="radix-icons:github-logo"
                label="Github"
              ></SocialButton>
            </div>
          </CardContent>
          <CardFooter class="flex-col space-y-2">
            <Button type="submit" class="w-full" :disabled="isLoading">
              Login
            </Button>
            <p>
              Don't have an account

              <NuxtLink
                class="border-b border-gray-500 text-muted-foreground hover:text-primary"
                to="/auth/register"
              >Register</NuxtLink>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  </div>
</template>