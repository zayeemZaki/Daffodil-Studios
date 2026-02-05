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
  
  // Register modules
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@nuxt/image'],

  // Import CSS files
  css: ['~/assets/styles/main.css'],

  // Define app-wide metadata
  app: {
    head: {
      title: 'Daffodil Studios - Documentary Filmmaking | Saffron Kingdom',
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo.png' },
        { rel: 'apple-touch-icon', href: '/logo.png' },
        { rel: 'canonical', href: 'https://daffodilstudios.org' },
        // Donorbox preconnect for faster iframe load
        { rel: 'preconnect', href: 'https://donorbox.org', crossorigin: '' },
        { rel: 'dns-prefetch', href: 'https://donorbox.org' },
        // Google Fonts handled by @nuxtjs/google-fonts
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5' },
        { name: 'description', content: 'Daffodil Studios creates powerful documentary films exploring untold stories. Watch Saffron Kingdom, our award-winning documentary about Kashmir.' },
        { name: 'keywords', content: 'Daffodil Studios, Saffron Kingdom, documentary film, Kashmir, independent cinema, film screenings, Arfat Sheikh' },
        { name: 'author', content: 'Daffodil Studios' },
        
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://daffodilstudios.org' },
        { property: 'og:title', content: 'Daffodil Studios - Documentary Filmmaking | Saffron Kingdom' },
        { property: 'og:description', content: 'Creating powerful documentary films that tell untold stories. Watch Saffron Kingdom, our award-winning documentary about Kashmir.' },
        { property: 'og:image', content: 'https://daffodilstudios.org/og-image.jpg' },
        { property: 'og:site_name', content: 'Daffodil Studios' },
        
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: 'https://daffodilstudios.org' },
        { name: 'twitter:title', content: 'Daffodil Studios - Documentary Filmmaking' },
        { name: 'twitter:description', content: 'Creating powerful documentary films that tell untold stories. Watch Saffron Kingdom.' },
        { name: 'twitter:image', content: 'https://daffodilstudios.org/og-image.jpg' },
        
        // Additional
        { name: 'theme-color', content: '#4b5563' },
        { name: 'format-detection', content: 'telephone=no' }
      ]
    },

    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  },

  // Runtime configuration for environment variables
  runtimeConfig: {
    // Private keys (only available on server-side)
    resendApiKey: '',
    stripeSecretKey: '',
    // Public keys (available on both client and server)
    public: {
      stripePublishableKey: '',
      siteUrl: process.env.NODE_ENV === 'production' 
        ? 'https://daffodilstudios.org' 
        : 'http://localhost:3000'
    }
  },
  googleFonts: {
    families: {
      Inter: [300, 400, 500, 600, 700, 800, 900]
    },
    display: 'swap',
    preload: true,
    preconnect: true
  }
})
