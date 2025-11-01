<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative flex items-center justify-center">
    <!-- Background Pattern -->
    <div class="absolute inset-0 section-bg-animated">
      <div class="floating-orbs">
        <div class="floating-orbs-center"></div>
      </div>
    </div>

    <!-- Success Content -->
    <div class="relative z-10 container mx-auto px-6 py-24">
      <div class="max-w-2xl mx-auto">
        <!-- Success Card -->
        <div class="glass-card rounded-3xl p-12 text-center">
          <!-- Success Icon -->
          <div class="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>

          <!-- Thank You Message -->
          <h1 class="text-4xl md:text-5xl font-bold text-brand-gradient mb-4">
            {{ isTicket ? 'Tickets Confirmed!' : 'Thank You!' }}
          </h1>
          
          <p class="text-xl text-gray-300 mb-8">
            {{ isTicket 
              ? 'Your ticket purchase was successful.' 
              : 'Your generous donation means the world to us.' 
            }}
          </p>

          <!-- Details -->
          <div class="bg-white/10 rounded-xl p-6 mb-8 text-left">
            <h3 class="text-lg font-bold text-white mb-4">What's Next?</h3>
            <ul class="space-y-3 text-gray-300">
              <li class="flex items-start">
                <svg class="w-6 h-6 text-brand-accent mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <span>
                  {{ isTicket 
                    ? 'Your tickets and receipt have been sent to your email' 
                    : 'A receipt has been sent to your email address' 
                  }}
                </span>
              </li>
              <li class="flex items-start" v-if="isTicket">
                <svg class="w-6 h-6 text-brand-accent mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                </svg>
                <span>Save the date and bring your tickets (digital or printed)</span>
              </li>
              <li class="flex items-start" v-if="!isTicket">
                <svg class="w-6 h-6 text-brand-accent mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span>Your support helps us create powerful documentaries</span>
              </li>
              <li class="flex items-start">
                <svg class="w-6 h-6 text-brand-accent mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                </svg>
                <span>Questions? Contact us at <a href="mailto:contact@daffodilstudios.org" class="text-brand-accent hover:text-yellow-400">contact@daffodilstudios.org</a></span>
              </li>
            </ul>
          </div>

          <!-- Session ID (for reference) -->
          <div v-if="sessionId" class="text-xs text-gray-500 mb-8">
            Transaction ID: {{ sessionId }}
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink 
              to="/"
              class="bg-brand-accent text-white px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Back to Home
            </NuxtLink>
            <NuxtLink 
              to="/screenings"
              v-if="isTicket"
              class="bg-white/10 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition-all duration-300"
            >
              View All Screenings
            </NuxtLink>
            <NuxtLink 
              to="/about"
              v-else
              class="bg-white/10 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition-all duration-300"
            >
              Learn More About Us
            </NuxtLink>
          </div>
        </div>

        <!-- Social Share -->
        <div class="text-center mt-8">
          <p class="text-gray-400 mb-4">Help spread the word!</p>
          <div class="flex justify-center gap-4">
            <a 
              href="https://twitter.com/intent/tweet?text=I%20just%20supported%20Daffodil%20Studios%20and%20their%20mission%20to%20create%20powerful%20documentaries!&url=https://daffodilstudios.org"
              target="_blank"
              class="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
              </svg>
            </a>
            <a 
              href="https://www.facebook.com/sharer/sharer.php?u=https://daffodilstudios.org"
              target="_blank"
              class="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const sessionId = ref('')
const isTicket = ref(false)

// Set page metadata
useHead({
  title: 'Payment Successful - Daffodil Studios',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

onMounted(() => {
  // Get session ID from URL query params
  sessionId.value = route.query.session_id as string || ''
  
  // Check if this is a ticket purchase or donation based on URL or query param
  isTicket.value = route.query.type === 'ticket'
  
  // Optional: Log successful transaction (you can send this to analytics)
  console.log('Transaction successful:', {
    sessionId: sessionId.value,
    type: isTicket.value ? 'ticket' : 'donation'
  })
})
</script>
