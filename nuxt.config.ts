// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  // Register the Tailwind CSS module
  modules: ['@nuxtjs/tailwindcss'],

  // Import CSS files
  css: ['~/assets/css/main.css'],

  // Define app-wide metadata
  app: {
    head: {
      title: 'Daffodil Studios',
      meta: [
        { name: 'description', content: 'Daffodil Studios Official Website.' }
      ],
    }
  }
})
