<template>
  <header class="fixed top-0 left-0 right-0 bg-brand-primary shadow-2xl backdrop-blur-sm border-b border-yellow-400" style="z-index: 10000;">
    <nav class="container mx-auto px-6 py-6 flex justify-between items-center">
      <!-- Logo -->
      <NuxtLink 
        to="/" 
        class="flex items-center space-x-3 text-2xl font-bold text-gray-900 hover:text-gray-700 transition-all duration-300 transform hover:scale-105"
      >
        <div class="relative">
          <img src="~/public/logo.webp" alt="Daffodil Studios Logo" class="h-16 w-auto filter drop-shadow-lg">
          <div class="absolute inset-0 bg-white opacity-0 hover:opacity-20 rounded-full transition-opacity duration-300"></div>
        </div>
      </NuxtLink>
      
      <!-- Navigation Links -->
      <ul class="hidden md:flex space-x-8 items-center">
        <li>
          <NuxtLink 
            to="/" 
            class="relative text-lg text-gray-900 hover:text-gray-700 font-semibold transition-all duration-300 group"
          >
            Home
            <span class="nav-underline"></span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink 
            to="/screenings" 
            class="relative text-lg text-gray-900 hover:text-gray-700 font-semibold transition-all duration-300 group"
          >
            Screenings
            <span class="nav-underline"></span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink 
            to="/movies" 
            class="relative text-lg text-gray-900 hover:text-gray-700 font-semibold transition-all duration-300 group"
          >
            Movies
            <span class="nav-underline"></span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink 
            to="/press" 
            class="relative text-lg text-gray-900 hover:text-gray-700 font-semibold transition-all duration-300 group"
          >
            Press
            <span class="nav-underline"></span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink 
            to="/about" 
            class="relative text-lg text-gray-900 hover:text-gray-700 font-semibold transition-all duration-300 group"
          >
            About
            <span class="nav-underline"></span>
          </NuxtLink>
        </li>
      </ul>

      <!-- Action Buttons -->
      <div class="flex items-center space-x-4">
        <!-- Donate Button with Dropdown -->
        <div class="relative">
          <button 
            @click="showDonationModal = true"
            :disabled="isProcessingDonation"
            class="bg-brand-accent text-white px-8 py-3 rounded-full text-lg font-bold hover:from-amber-800 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="flex items-center space-x-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 6.5a.5.5 0 11-1 0 .5.5 0 011 0zm-2.5.5a.5.5 0 100 1 .5.5 0 000-1zm6.5.5a.5.5 0 11-1 0 .5.5 0 011 0z" clip-rule="evenodd"/>
              </svg>
              <span>{{ isProcessingDonation ? 'Processing...' : 'Donate' }}</span>
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
                class="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-10 max-w-lg w-full shadow-2xl transform transition-all duration-300 mx-auto"
                style="animation: slideUp 0.3s ease-out; margin-top: auto; margin-bottom: auto;"
              >
                <!-- Header -->
                <div class="text-center mb-8">
                  <div class="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border-4 border-brand-accent">
                    <img src="~/public/logo.webp" alt="Daffodil Studios" class="w-16 h-16 object-contain">
                  </div>
                  <h3 class="text-3xl font-bold text-gray-900 mb-2">Support Our Mission</h3>
                  <p class="text-gray-600">Choose an amount to donate</p>
                </div>
                
                <!-- Preset Amounts -->
                <div class="grid grid-cols-3 gap-3 mb-6">
                  <button
                    v-for="amount in presetAmounts"
                    :key="amount"
                    @click="selectedAmount = amount; customAmount = ''"
                    :class="[
                      'py-4 px-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105',
                      selectedAmount === amount 
                        ? 'bg-brand-accent text-white shadow-lg scale-105' 
                        : 'bg-white text-gray-900 hover:bg-gray-100 border-2 border-gray-200'
                    ]"
                  >
                    ${{ amount }}
                  </button>
                </div>
                
                <!-- Custom Amount -->
                <div class="mb-8">
                  <label class="block text-sm font-bold text-gray-700 mb-3">
                    Or enter a custom amount
                  </label>
                  <div class="relative">
                    <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl font-bold">$</span>
                    <input
                      v-model="customAmount"
                      @input="selectedAmount = null"
                      type="number"
                      min="1"
                      placeholder="0"
                      class="w-full pl-10 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20 text-gray-900 text-xl font-semibold transition-all"
                    >
                  </div>
                  <p class="text-xs text-gray-500 mt-2">Minimum donation: $1</p>
                </div>
                
                <!-- Action Buttons -->
                <div class="flex gap-4">
                  <button
                    @click="showDonationModal = false"
                    class="flex-1 py-4 px-6 bg-gray-200 text-gray-900 rounded-full font-bold hover:bg-gray-300 transition-all transform hover:scale-105"
                  >
                    Cancel
                  </button>
                  <button
                    @click="processDonation"
                    :disabled="!selectedAmount && !customAmount"
                    class="flex-1 py-4 px-6 bg-brand-accent text-white rounded-full font-bold hover:scale-105 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    Donate ${{ customAmount || selectedAmount || 0 }}
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Mobile Menu Button -->
        <button class="md:hidden text-gray-900 hover:text-gray-700 p-2 rounded-full hover:bg-yellow-400 hover:bg-opacity-30 transition-all duration-300">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isProcessingDonation = ref(false)
const showDonationModal = ref(false)
const selectedAmount = ref<number | null>(25)
const customAmount = ref('')

// Preset donation amounts
const presetAmounts = [10, 25, 50, 100, 250, 500]

const processDonation = async () => {
  const amount = customAmount.value ? parseFloat(customAmount.value) : selectedAmount.value
  
  if (!amount || amount < 1) {
    alert('Please enter a valid donation amount (minimum $1)')
    return
  }
  
  isProcessingDonation.value = true
  showDonationModal.value = false
  
  try {
    const response = await $fetch('/api/stripe/create-donation', {
      method: 'POST',
      body: { amount }
    })

    if (response.url) {
      // Redirect to Stripe Checkout
      window.location.href = response.url
    }
  } catch (error) {
    console.error('Donation error:', error)
    alert('Sorry, there was an error processing your donation. Please try again.')
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
