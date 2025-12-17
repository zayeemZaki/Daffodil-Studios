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

const showMobileMenu = ref(false)
</script>

<style scoped>
.nav-underline {
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #FDB913, #FDC94A);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.group:hover .nav-underline {
  width: 100%;
}
</style>
