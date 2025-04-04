<template>
  <Section class="bg-rose-100">
    <div class="hidden sm:mb-8 sm:flex sm:justify-center">
      <div class="relative rounded-full text-sm px-3 py-1 leading-6 text-foreground ring-1 ring-gray-900/10 hover:ring-gray-900/20">
        Announcing our next summer products
        <NuxtLink to="/products" class="font-semibold text-primary" >
          <span aria-hidden="true">
            Explore Products
            <span aria-hidden="true">&rarr;</span>
          </span>
        </NuxtLink>
      </div>
    </div>
    <div class="text-center">
      <h1 class="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
        Summer Styles are finally here
      </h1>
      <p class="mt-6 text-lg leading-8 text-foreground">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus quia molestias deleniti doloribus? Corrupti sint maiores possimus ipsa in nesciunt!
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <NuxtLink to="/products">
          <Button>Shop collection</Button>
        </NuxtLink>
      </div>
    </div>
  </Section>
</template>