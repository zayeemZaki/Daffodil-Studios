// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  // Add compatibility date to resolve warnings
  compatibilityDate: '2025-10-21',
  
  // Enable TypeScript
  typescript: {
    strict: true,
    typeCheck: false
  },
  
  // Register the Tailwind CSS module
  modules: ['@nuxtjs/tailwindcss'],

  // Import CSS files
  css: ['~/assets/styles/main.css'],

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
