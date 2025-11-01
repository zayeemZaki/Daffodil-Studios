<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative flex items-center justify-center">
    <!-- Background Pattern -->
    <div class="absolute inset-0 section-bg-animated">
      <div class="floating-orbs">
        <div class="floating-orbs-center"></div>
      </div>
    </div>

    <!-- Canceled Content -->
    <div class="relative z-10 container mx-auto px-6 py-24">
      <div class="max-w-2xl mx-auto">
        <!-- Canceled Card -->
        <div class="glass-card rounded-3xl p-12 text-center">
          <!-- Canceled Icon -->
          <div class="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>

          <!-- Message -->
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
            Payment Canceled
          </h1>
          
          <p class="text-xl text-gray-300 mb-8">
            {{ isTicket 
              ? 'Your ticket purchase was not completed.' 
              : 'Your donation was not completed.' 
            }}
          </p>

          <!-- Info Box -->
          <div class="bg-white/10 rounded-xl p-6 mb-8 text-left">
            <h3 class="text-lg font-bold text-white mb-4">What Happened?</h3>
            <ul class="space-y-3 text-gray-300">
              <li class="flex items-start">
                <svg class="w-6 h-6 text-orange-400 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                </svg>
                <span>You canceled the payment or closed the checkout page</span>
              </li>
              <li class="flex items-start">
                <svg class="w-6 h-6 text-orange-400 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
                <span>No charges were made to your account</span>
              </li>
              <li class="flex items-start">
                <svg class="w-6 h-6 text-orange-400 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
                </svg>
                <span>You can try again anytime</span>
              </li>
            </ul>
          </div>

          <!-- Help Text -->
          <p class="text-gray-400 mb-8">
            Need help? Contact us at <a href="mailto:contact@daffodilstudios.org" class="text-brand-accent hover:text-yellow-400">contact@daffodilstudios.org</a>
          </p>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              v-if="isTicket"
              @click="$router.back()"
              class="bg-brand-accent text-white px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Try Again
            </button>
            <button
              v-else
              @click="showDonateModal"
              class="bg-brand-accent text-white px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Try Donation Again
            </button>
            <NuxtLink 
              to="/"
              class="bg-white/10 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition-all duration-300"
            >
              Back to Home
            </NuxtLink>
          </div>

          <!-- Alternative Options -->
          <div class="mt-8 pt-8 border-t border-white/10">
            <p class="text-gray-400 mb-4">Or explore:</p>
            <div class="flex flex-wrap gap-3 justify-center">
              <NuxtLink 
                to="/screenings"
                class="text-brand-accent hover:text-yellow-400 transition-colors font-semibold"
              >
                View All Screenings
              </NuxtLink>
              <span class="text-gray-600">•</span>
              <NuxtLink 
                to="/movies"
                class="text-brand-accent hover:text-yellow-400 transition-colors font-semibold"
              >
                Our Films
              </NuxtLink>
              <span class="text-gray-600">•</span>
              <NuxtLink 
                to="/about"
                class="text-brand-accent hover:text-yellow-400 transition-colors font-semibold"
              >
                About Us
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isTicket = ref(false)

// Set page metadata
useHead({
  title: 'Payment Canceled - Daffodil Studios',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

onMounted(() => {
  // Check if this is a ticket purchase or donation
  isTicket.value = route.query.type === 'ticket'
  
  // Optional: Log canceled transaction (you can send this to analytics)
  console.log('Transaction canceled:', {
    type: isTicket.value ? 'ticket' : 'donation'
  })
})

const showDonateModal = () => {
  // Navigate to home and trigger donate modal (you may need to add event bus or state management)
  router.push('/')
}
</script>
