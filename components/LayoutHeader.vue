<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-brand-primary shadow-2xl backdrop-blur-sm border-b border-yellow-400">
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
        <button class="bg-brand-accent text-white px-8 py-3 rounded-full text-lg font-bold hover:from-amber-800 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
          <span class="flex items-center space-x-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 6.5a.5.5 0 11-1 0 .5.5 0 011 0zm-2.5.5a.5.5 0 100 1 .5.5 0 000-1zm6.5.5a.5.5 0 11-1 0 .5.5 0 011 0z" clip-rule="evenodd"/>
            </svg>
            <span>Donate</span>
          </span>
        </button>
        
        <button class="text-gray-900 hover:text-gray-700 p-2 rounded-full hover:bg-yellow-400 hover:bg-opacity-30 transition-all duration-300 transform hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>

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
