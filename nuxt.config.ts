// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr:false,
  runtimeConfig: {
    public: {
      apiURL: process.env.API_URL
    }
  },
  devtools: {enabled: false},
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
    "./assets/styles/color.scss",
    "./assets/styles/fonts.scss",
    "./assets/styles/root.scss"
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
        httpEndpoint: process.env.GRAPHQL_API_URL!
      }
    },
  },


})
