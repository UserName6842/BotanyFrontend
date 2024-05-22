// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},
  modules: [
    "@pinia/nuxt",
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    'nuxt-svgo',
    'nuxt-icon',
    '@nuxtjs/apollo',
    '@nuxt/image',
  ],

  svgo: {
    autoImportPath: false,
    defaultImport: "component",
  },

  css: [
    "./assets/styles/color.scss"
  ],

  ui: {
    icons: ['ph']
  },

  apollo: {
    autoImports: true,
    authType: 'Bearer',
    authHeader: 'Authorization',
    tokenStorage: 'cookie',
    proxyCookies: true,
    clients: {
      default: {
        httpEndpoint: 'http://localhost/api'
      }
    },
  },


})
