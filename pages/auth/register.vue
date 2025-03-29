<script setup lang="ts">
type PAYLOAD = {
  password: string
  name: string
  email: string
}

const form = ref<PAYLOAD>({
  name: '',
  email: '',
  password: ''
})
</script>

<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="w-full max-w-sm">
      <form action="">
        <Card class="w-full max-w-md">
          <CardHeader>
            <CardTitle class="text-2xl font-bold">Register</CardTitle>
            <CardDescription>Enter your email and password to create your account</CardDescription>
          </CardHeader>
          <CardContent class="grid gap-4">
            <div class="grid gap-2">
              <div className="space-y-2">
                <Label for="name">Name</Label>
                <Input
                  v-model="form.name"
                  id="name"
                  placeholder="Name"
                  type="text"
                />
              </div>
              <div className="space-y-2">
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
            </div>
          </CardContent>
          <CardFooter class="flex-col space-y-2">
            <Button type="submit" class="w-full">
              Register
            </Button>
            <p>
              Already have an account

              <NuxtLink
                class="border-b border-gray-500 text-muted-foreground hover:text-primary"
                to="/auth/login"
              >Login</NuxtLink>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  </div>
</template>