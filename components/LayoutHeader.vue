<template>
  <header class="fixed top-0 left-0 right-0 bg-gray-900 shadow-2xl backdrop-blur-sm border-b border-gray-700" style="z-index: 10000;">
    <nav class="container mx-auto px-6 sm:px-8 py-4 sm:py-5 flex justify-between items-center">
      <!-- Logo -->
      <NuxtLink 
        to="/" 
        class="flex items-center space-x-2 text-xl font-bold text-white hover:text-gray-300 transition-all duration-300 transform hover:scale-105"
      >
        <div class="relative">
          <img src="~/public/logo.webp" alt="Daffodil Studios Logo" class="h-10 sm:h-12 w-auto filter drop-shadow-lg">
          <div class="absolute inset-0 bg-white opacity-0 hover:opacity-20 rounded-full transition-opacity duration-300"></div>
        </div>
      </NuxtLink>
      
      <!-- Navigation Links - Desktop -->
      <ul class="hidden md:flex space-x-8 items-center">
        <li>
          <NuxtLink 
            to="/" 
            class="relative text-base text-gray-300 hover:text-brand-yellow font-semibold transition-all duration-300 group"
          >
            Home
            <span class="nav-underline"></span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink 
            to="/screenings" 
            class="relative text-base text-gray-300 hover:text-brand-yellow font-semibold transition-all duration-300 group"
          >
            Screenings
            <span class="nav-underline"></span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink 
            to="/movies" 
            class="relative text-base text-gray-300 hover:text-brand-yellow font-semibold transition-all duration-300 group"
          >
            Movies
            <span class="nav-underline"></span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink 
            to="/press" 
            class="relative text-base text-gray-300 hover:text-brand-yellow font-semibold transition-all duration-300 group"
          >
            Press
            <span class="nav-underline"></span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink 
            to="/about" 
            class="relative text-base text-gray-300 hover:text-brand-yellow font-semibold transition-all duration-300 group"
          >
            About
            <span class="nav-underline"></span>
          </NuxtLink>
        </li>
      </ul>

      <!-- Action Buttons -->
      <div class="flex items-center space-x-2 sm:space-x-4">
        <!-- Donate Button with Dropdown -->
        <div class="relative">
          <button 
            @click="showDonationModal = true"
            :disabled="isProcessingDonation"
            class="bg-gradient-to-br from-brand-yellow via-brand-yellow-light to-brand-yellow hover:from-brand-yellow-light hover:to-brand-yellow text-gray-900 px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-bold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-glow-yellow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="flex items-center space-x-1">
              <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 6.5a.5.5 0 11-1 0 .5.5 0 011 0zm-2.5.5a.5.5 0 100 1 .5.5 0 000-1zm6.5.5a.5.5 0 11-1 0 .5.5 0 011 0z" clip-rule="evenodd"/>
              </svg>
              <span class="hidden sm:inline">{{ isProcessingDonation ? 'Processing...' : 'Donate' }}</span>
              <span class="sm:hidden">{{ isProcessingDonation ? '...' : 'Donate' }}</span>
            </span>
          </button>
          
          <!-- Donation Amount Modal -->
          <Transition
            enter-active-class="transition-opacity duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div 
              v-if="showDonationModal" 
              @click="showDonationModal = false"
              class="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 backdrop-blur-sm z-[10001] flex items-center justify-center p-4"
              style="animation: fadeIn 0.3s ease-out; position: fixed;"
            >
              <div 
                @click.stop
                class="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 sm:p-10 max-w-lg w-full shadow-2xl transform transition-all duration-300 mx-auto max-h-[90vh] overflow-y-auto"
                style="animation: slideUp 0.3s ease-out; margin-top: auto; margin-bottom: auto;"
              >
                <!-- Header -->
                <div class="text-center mb-6 sm:mb-8">
                  <div class="w-16 h-16 sm:w-20 sm:h-20 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg border-4 border-brand-accent">
                    <img src="~/public/logo.webp" alt="Daffodil Studios" class="w-12 h-12 sm:w-16 sm:h-16 object-contain">
                  </div>
                  <h3 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Support Our Mission</h3>
                  <p class="text-sm sm:text-base text-gray-600">Choose an amount to donate</p>
                </div>
                
                <!-- Preset Amounts -->
                <div class="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <button
                    v-for="amount in presetAmounts"
                    :key="amount"
                    @click="selectedAmount = amount; customAmount = ''"
                    :class="[
                      'py-3 sm:py-4 px-2 sm:px-4 rounded-xl font-bold text-base sm:text-lg transition-all transform active:scale-95 min-h-[48px]',
                      selectedAmount === amount 
                        ? 'bg-gradient-to-br from-brand-yellow to-brand-yellow-dark text-gray-900 shadow-glow-yellow scale-105' 
                        : 'bg-white text-gray-900 hover:bg-brand-yellow-50 border-2 border-gray-200 hover:border-brand-yellow-300'
                    ]"
                  >
                    ${{ amount }}
                  </button>
                </div>
                
                <!-- Custom Amount -->
                <div class="mb-4 sm:mb-6">
                  <label class="block text-sm font-bold text-gray-700 mb-2 sm:mb-3">
                    Or enter a custom amount
                  </label>
                  <div class="relative">
                    <span class="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg sm:text-xl font-bold">$</span>
                    <input
                      v-model="customAmount"
                      @input="selectedAmount = null"
                      type="number"
                      min="1"
                      placeholder="0"
                      class="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-3 sm:py-4 border-2 border-gray-300 rounded-xl focus:border-brand-yellow focus:outline-none focus:ring-2 focus:ring-brand-yellow/30 text-gray-900 text-lg sm:text-xl font-semibold transition-all min-h-[48px]"
                    >
                  </div>
                  <p class="text-xs text-gray-500 mt-2">Minimum donation: $1</p>
                </div>
                
                <!-- Email Address -->
                <div class="mb-6 sm:mb-8">
                  <label class="block text-sm font-bold text-gray-700 mb-2 sm:mb-3">
                    Email Address (for receipt)
                  </label>
                  <input
                    v-model="donorEmail"
                    type="email"
                    placeholder="your@email.com"
                    required
                    class="w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-gray-300 rounded-xl focus:border-brand-yellow focus:outline-none focus:ring-2 focus:ring-brand-yellow/30 text-gray-900 text-base sm:text-lg transition-all min-h-[48px]"
                  >
                  <p class="text-xs text-gray-500 mt-2">You'll receive a receipt from Stripe after your donation</p>
                </div>
                
                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    @click="showDonationModal = false"
                    class="flex-1 py-3 sm:py-4 px-4 sm:px-6 bg-gray-200 text-gray-900 rounded-full font-bold hover:bg-gray-300 transition-all transform active:scale-95 min-h-[48px]"
                  >
                    Cancel
                  </button>
                  <button
                    @click="processDonation"
                    :disabled="(!selectedAmount && !customAmount) || !donorEmail"
                    class="flex-1 py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-br from-brand-yellow via-brand-yellow-light to-brand-yellow text-gray-900 rounded-full font-bold hover:scale-105 transition-all shadow-lg hover:shadow-glow-yellow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-h-[48px]"
                  >
                    Donate ${{ customAmount || selectedAmount || 0 }}
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="showMobileMenu = !showMobileMenu"
          class="md:hidden text-gray-300 p-2 rounded-lg active:bg-gray-700 active:bg-opacity-50 transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Toggle mobile menu"
        >
          <svg v-if="!showMobileMenu" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="showMobileMenu" class="md:hidden bg-gray-900 border-t border-gray-700 shadow-lg">
        <ul class="container mx-auto px-4 py-3 space-y-1">
          <li>
            <NuxtLink 
              to="/" 
              @click="showMobileMenu = false"
              class="block text-sm text-gray-300 font-semibold py-3 px-3 rounded-lg active:bg-gray-700 active:bg-opacity-50 transition-colors duration-200 min-h-[48px] flex items-center"
            >
              Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink 
              to="/screenings" 
              @click="showMobileMenu = false"
              class="block text-sm text-gray-300 font-semibold py-3 px-3 rounded-lg active:bg-gray-700 active:bg-opacity-50 transition-colors duration-200 min-h-[48px] flex items-center"
            >
              Screenings
            </NuxtLink>
          </li>
          <li>
            <NuxtLink 
              to="/movies" 
              @click="showMobileMenu = false"
              class="block text-sm text-gray-300 font-semibold py-3 px-3 rounded-lg active:bg-gray-700 active:bg-opacity-50 transition-colors duration-200 min-h-[48px] flex items-center"
            >
              Movies
            </NuxtLink>
          </li>
          <li>
            <NuxtLink 
              to="/press" 
              @click="showMobileMenu = false"
              class="block text-sm text-gray-300 font-semibold py-3 px-3 rounded-lg active:bg-gray-700 active:bg-opacity-50 transition-colors duration-200 min-h-[48px] flex items-center"
            >
              Press
            </NuxtLink>
          </li>
          <li>
            <NuxtLink 
              to="/about" 
              @click="showMobileMenu = false"
              class="block text-sm text-gray-300 font-semibold py-3 px-3 rounded-lg active:bg-gray-700 active:bg-opacity-50 transition-colors duration-200 min-h-[48px] flex items-center"
            >
              About
            </NuxtLink>
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isProcessingDonation = ref(false)
const showDonationModal = ref(false)
const showMobileMenu = ref(false)
const selectedAmount = ref<number | null>(25)
const customAmount = ref('')
const donorEmail = ref('')

// Preset donation amounts
const presetAmounts = [10, 25, 50, 100, 250, 500]

const processDonation = async () => {
  const amount = customAmount.value ? parseFloat(customAmount.value) : selectedAmount.value
  
  if (!amount || amount < 1) {
    alert('Please enter a valid donation amount (minimum $1)')
    return
  }
  
  if (!donorEmail.value || !donorEmail.value.includes('@')) {
    alert('Please enter a valid email address to receive your receipt')
    return
  }
  
  isProcessingDonation.value = true
  showDonationModal.value = false
  
  try {
    const response = await $fetch('/api/stripe/create-donation', {
      method: 'POST',
      body: { 
        amount,
        email: donorEmail.value
      }
    })

    if (response.url) {
      // Redirect to Stripe Checkout
      window.location.href = response.url
    }
  } catch (error) {
    console.error('Donation error:', error)
    alert('Sorry, there was an error processing your donation. Please try again.')
    showDonationModal.value = true
  } finally {
    isProcessingDonation.value = false
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
