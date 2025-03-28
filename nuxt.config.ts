// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@nuxt/icon',
    "@nuxtjs/cloudinary",
    'nuxt-auth-utils'
  ],
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  }
})