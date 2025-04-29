<script setup lang="ts">
definePageMeta({
  middleware: 'admin'
})

const { data, status } = await useFetch<any>('/api/admin/analytics', {
  lazy: true
})
</script>

<template>
  <div class="flex-col">
    <div class="flex-1 space-y-4 p-8 pt-6">
      <BaseHeading title="Dashboard" description="Overview of your store" />
      <Separator />
    </div>
    <div class="grid gap-4 grid-cols-3">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Total Revenue</CardTitle>
          <Icon name="subway:usd" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold" v-if="data?.totalRevenue">
            {{ formatter.format(data.totalRevenue) }}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Sales</CardTitle>
          <Icon name="lucide:credit-card" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold" v-if="data?.salesCount">
            +{{ data.salesCount }}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Products in Stock</CardTitle>
          <Icon name="lucide:package" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold" v-if="data?.stockCount">
            {{ data.stockCount }}
          </div>
        </CardContent>
      </Card>
    </div>
    <Card v-if="data.graphData" class="w-full">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Overview</CardTitle>
      </CardHeader>
      <CardContent class="pl-2">
        <Overview :data="data?.graphData" />
      </CardContent>
    </Card>
  </div>
</template>