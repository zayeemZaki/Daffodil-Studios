<template>
  <div class="relative">
    <!-- Navigation Progress Indicator -->
    <div class="nav-progress" :style="{ width: scrollProgress + '%' }"></div>
    
    <!-- Hero Section with Background Video -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden w-screen ml-[calc(-50vw+50%)] -mt-[120px]">
      <!-- Background Video -->
      <video 
        autoplay 
        muted 
        loop 
        class="absolute inset-0 w-full h-full object-cover object-center blur-sm parallax-element"
        style="width: 100vw; height: 100vh;"
      >
        <source src="~/assets/home-page/hero-video.mov" type="video/mp4">
        <!-- Fallback image if video doesn't load -->
        <img src="~/assets/home-page/movie-poster.jpg" alt="Daffodil Studios" class="w-full h-full object-cover object-center">
      </video>
      
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <!-- Floating particles -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-20 left-20 w-2 h-2 bg-yellow-400/30 rounded-full float-animation"></div>
        <div class="absolute top-40 right-32 w-1 h-1 bg-amber-300/40 rounded-full float-animation" style="animation-delay: 2s;"></div>
        <div class="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-orange-400/20 rounded-full float-animation" style="animation-delay: 4s;"></div>
        <div class="absolute top-1/3 right-1/4 w-1 h-1 bg-yellow-300/50 rounded-full float-animation" style="animation-delay: 1s;"></div>
      </div>
      
      <!-- Hero home-page -->
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-6xl md:text-7xl font-bold mb-6 leading-tight">
          <span class="typewriter-text bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 bg-clip-text text-transparent">Daffodil Studios</span>
          <span class="typewriter-cursor">|</span>
        </h1>
        <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-0 fade-in-delay">
          Where stories come to life through the art of cinema. We create compelling narratives 
          that inspire, entertain, and connect audiences across the globe.
        </p>
        <div class="space-x-4 opacity-0 fade-in-delay-2">
          <NuxtLink 
            to="/movies" 
            class="btn-primary text-white px-8 py-3 rounded-lg text-lg font-semibold"
          >
            Saffron Kingdom
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="border-2 border-white hover:bg-white hover:text-black text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Our Story
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Movie Section -->
    <section class="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-black relative overflow-hidden opacity-0" data-animate>
      <!-- Animated Background Elements -->
      <div class="absolute inset-0">
        <!-- Floating orbs -->
        <div class="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-full blur-xl animate-pulse float-animation"></div>
        <div class="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-tl from-amber-400/15 to-orange-400/15 rounded-full blur-2xl animate-pulse delay-700 float-animation" style="animation-delay: 3s;"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-yellow-300/10 to-amber-400/10 rounded-full blur-3xl animate-pulse delay-1000 float-animation" style="animation-delay: 5s;"></div>
        
        <!-- Grid pattern overlay -->
        <div class="absolute inset-0 opacity-5">
          <div class="absolute inset-0" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
        </div>
      </div>
      
      <div class="container mx-auto px-6 relative z-10">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 class="text-5xl font-bold mb-6 leading-tight hover-lift gradient-text">
            Saffron Kingdom Film
          </h2>
          <div class="w-48 h-1 bg-gradient-to-r from-yellow-500 to-amber-600 mx-auto rounded-full glow-border"></div>
        </div>
        
        <div class="flex flex-col xl:flex-row items-center gap-16">
          <!-- Movie Poster with 3D Effect -->
          <div class="xl:w-5/12">
            <div class="relative group">
              <!-- Main Poster Container -->
              <div class="relative overflow-hidden rounded-2xl shadow-2xl poster-3d hover-lift">
                <img 
                  src="~/assets/home-page/movie-poster.jpg" 
                  alt="The Golden Hour Movie Poster" 
                  class="w-full h-auto aspect-[2/3] object-cover transition-transform duration-700 group-hover:scale-105"
                >
                <!-- Overlay Effects -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div class="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
              </div>
              
              <!-- Decorative Elements -->
              <div class="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full opacity-20 blur-xl float-animation"></div>
              <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-amber-400 to-yellow-500 rounded-full opacity-10 blur-2xl float-animation" style="animation-delay: 2s;"></div>
            </div>
          </div>
          
          <!-- Movie Details -->
          <div class="xl:w-7/12 space-y-8">
            <!-- Title and Duration -->
            <div>
              <div class="flex items-center space-x-6 mb-4">
                <!-- Duration -->
                <div class="flex items-center space-x-2 text-gray-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span class="text-sm font-semibold">127 minutes</span>
                </div>
              </div>
            </div>

            <!-- Description -->
            <p class="text-xl text-gray-300 leading-relaxed">
              Saffron Kingdom is currently being showcased across North America, Europe, and select international venues. Audiences everywhere are experiencing the untold story of Kashmir — a tale of erasure, exile, and resilience. Join us for a screening near you and be part of the conversation that this groundbreaking film has sparked worldwide.
            </p>

            <!-- Movie Details Grid -->
            <div class="grid grid-cols-2 gap-6 py-6 border-t border-b border-gray-600">
              <div>
                <span class="text-sm font-semibold text-gray-400 uppercase tracking-wide">Director</span>
                <p class="text-lg font-semibold text-white mt-1">Arfat Sheikh</p>
              </div>
              <div>
                <span class="text-sm font-semibold text-gray-400 uppercase tracking-wide">Release Year</span>
                <p class="text-lg font-semibold text-white mt-1">2025</p>
              </div>
              <div>
                <span class="text-sm font-semibold text-gray-400 uppercase tracking-wide">Language</span>
                <p class="text-lg font-semibold text-white mt-1">English</p>
              </div>
              <div>
                <span class="text-sm font-semibold text-gray-400 uppercase tracking-wide">Awards</span>
                <p class="text-lg font-semibold text-white mt-1">12 Film Festival Wins</p>
              </div>
            </div>

            <!-- Genre Tags -->
            <div class="flex flex-wrap gap-3">
              <span class="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">Drama</span>
              <span class="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">Tragedy</span>
              <span class="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">Indie</span>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 pt-4">
              <NuxtLink 
                to="/screenings" 
                class="bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-700 hover:to-amber-800 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 inline-flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
                </svg>
                View Screenings
              </NuxtLink>
              <button class="border-2 border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 inline-flex items-center justify-center transform hover:scale-105">
                <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9 3V7a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H9a2 2 0 01-2-2z"/>
                </svg>
                Watch Trailer
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Clients Section -->
    <section class="py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-black relative overflow-hidden opacity-0" data-animate>
      <!-- Animated Background Elements -->
      <div class="absolute inset-0">
        <!-- Floating orbs -->
        <div class="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-full blur-xl animate-pulse float-animation"></div>
        <div class="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-tl from-amber-400/15 to-orange-400/15 rounded-full blur-2xl animate-pulse delay-700 float-animation" style="animation-delay: 2s;"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-yellow-300/10 to-amber-400/10 rounded-full blur-3xl animate-pulse delay-1000 float-animation" style="animation-delay: 4s;"></div>
        
        <!-- Grid pattern overlay -->
        <div class="absolute inset-0 opacity-5">
          <div class="absolute inset-0" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
        </div>
      </div>
      
      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4 hover-lift gradient-text">Our creators have provided services to</h2>
          <div class="w-32 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto rounded-full glow-border"></div>
        </div>
        
        <!-- Client Logos Scrolling with Enhanced Controls -->
        <div class="overflow-hidden relative w-full bg-gradient-to-r from-white/95 via-yellow-50/90 to-amber-50/95 py-8 rounded-xl border border-white/20 backdrop-blur-sm hover-lift group">
          <!-- Pause/Play Button -->
          <button @click="toggleScrolling" class="absolute top-2 right-2 z-20 w-8 h-8 bg-gray-800/80 hover:bg-gray-700 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg v-if="isScrolling" class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
            <svg v-else class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
          <!-- Left overlay tunnel entrance -->
          <div class="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-gray-900 via-gray-800/80 to-transparent z-10 pointer-events-none"></div>
          
          <!-- Right overlay tunnel entrance -->
          <div class="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-gray-900 via-gray-800/80 to-transparent z-10 pointer-events-none"></div>
          
          <!-- Top shadow overlay -->
          <div class="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-black/20 to-transparent z-10 pointer-events-none"></div>
          
          <!-- Bottom shadow overlay -->
          <div class="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none"></div>
          
          <!-- Animated depth indicators -->
          <div class="absolute left-8 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-yellow-400/60 rounded-full animate-pulse z-10"></div>
          <div class="absolute right-8 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-yellow-400/60 rounded-full animate-pulse delay-500 z-10"></div>
          
          <!-- Main scrolling content -->
          <div class="flex animate-scroll whitespace-nowrap relative z-0">
            <!-- First set of logos -->
            <div class="flex items-center space-x-16 flex-shrink-0">
              <img src="~/assets/client-logos/GSU.png" alt="GSU" class="h-12 w-auto opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
              <img src="~/assets/client-logos/american-job-exchange.png" alt="American Job Exchange" class="h-12 w-auto opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
              <img src="~/assets/client-logos/citi.png" alt="Citi" class="h-12 w-auto opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
              <img src="~/assets/client-logos/ge.png" alt="GE" class="h-12 w-auto opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
              <img src="~/assets/client-logos/gp.png" alt="GP" class="h-12 w-auto opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
              <img src="~/assets/client-logos/hcl.png" alt="HCL" class="h-12 w-auto opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
              <img src="~/assets/client-logos/islamic-relief.png" alt="Islamic Relief" class="h-12 w-auto opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
              <img src="~/assets/client-logos/lg.png" alt="LG" class="h-12 w-auto opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
              <img src="~/assets/client-logos/mercy-corps.png" alt="Mercy Corps" class="h-12 w-auto opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
              <img src="~/assets/client-logos/metlife.png" alt="MetLife" class="h-12 w-auto opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
              <img src="~/assets/client-logos/save-the-children.png" alt="Save the Children" class="h-12 w-auto opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
              <img src="~/assets/client-logos/uol.png" alt="UOL" class="h-12 w-auto opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
            </div>
            <!-- Spacer -->
            <div class="w-16 flex-shrink-0"></div>
            <!-- Duplicate set for seamless loop -->
            <div class="flex items-center space-x-16 flex-shrink-0">
              <img src="~/assets/client-logos/GSU.png" alt="GSU" class="h-12 w-auto opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
              <img src="~/assets/client-logos/american-job-exchange.png" alt="American Job Exchange" class="h-12 w-auto opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
              <img src="~/assets/client-logos/citi.png" alt="Citi" class="h-12 w-auto opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
              <img src="~/assets/client-logos/ge.png" alt="GE" class="h-12 w-auto opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
              <img src="~/assets/client-logos/gp.png" alt="GP" class="h-12 w-auto opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
              <img src="~/assets/client-logos/hcl.png" alt="HCL" class="h-12 w-auto opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
              <img src="~/assets/client-logos/islamic-relief.png" alt="Islamic Relief" class="h-12 w-auto opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
              <img src="~/assets/client-logos/lg.png" alt="LG" class="h-12 w-auto opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
              <img src="~/assets/client-logos/mercy-corps.png" alt="Mercy Corps" class="h-12 w-auto opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
              <img src="~/assets/client-logos/metlife.png" alt="MetLife" class="h-12 w-auto opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
              <img src="~/assets/client-logos/save-the-children.png" alt="Save the Children" class="h-12 w-auto opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
              <img src="~/assets/client-logos/uol.png" alt="UOL" class="h-12 w-auto opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-black relative overflow-hidden">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0">
        <!-- Floating orbs -->
        <div class="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-full blur-xl animate-pulse"></div>
        <div class="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-tl from-amber-400/15 to-orange-400/15 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-yellow-300/10 to-amber-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <!-- Grid pattern overlay -->
        <div class="absolute inset-0 opacity-5">
          <div class="absolute inset-0" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
        </div>
      </div>
      
      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4 hover-lift gradient-text">What We Do</h2>
          <div class="w-32 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto rounded-full mb-4 glow-border"></div>
          <p class="text-lg text-gray-300 max-w-3xl mx-auto">
            From concept to screen, we provide comprehensive film production services that bring your vision to life.
          </p>
        </div>
        
        <!-- Services Grid -->
                <!-- Services Grid -->
        <div class="grid md:grid-cols-3 gap-8 mb-12">
          <div class="text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div class="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-3">Film Production</h3>
            <p class="text-gray-300">Complete film production from pre-production planning to post-production excellence.</p>
          </div>
          
          <div class="text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-3">Creative Direction</h3>
            <p class="text-gray-300">Innovative storytelling and creative direction that captivates audiences worldwide.</p>
          </div>
          
          <div class="text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div class="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-3">Distribution</h3>
            <p class="text-gray-300">Strategic distribution and marketing to ensure your film reaches the right audience.</p>
          </div>
        </div>
        
        <!-- Call to Action -->
        <div class="text-center">
          <NuxtLink 
            to="/about" 
            class="btn-primary text-white px-8 py-3 rounded-lg text-lg font-semibold inline-flex items-center shadow-lg"
          >
            Learn More About Us
            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrollProgress = ref(0)
const isScrolling = ref(true)

const updateScrollProgress = () => {
  const scrollTop = window.pageYOffset
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrollPercent = (scrollTop / docHeight) * 100
  scrollProgress.value = scrollPercent
}

const toggleScrolling = () => {
  isScrolling.value = !isScrolling.value
  const scrollElement = document.querySelector('.animate-scroll')
  if (scrollElement) {
    scrollElement.style.animationPlayState = isScrolling.value ? 'running' : 'paused'
  }
}

const observeElements = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.classList.add('section-animate')
      }
    })
  }, { threshold: 0.1 })

  // Observe sections for animation
  const sections = document.querySelectorAll('[data-animate]')
  sections.forEach((section) => {
    observer.observe(section)
  })
}

// Add smooth scroll navigation
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress)
  updateScrollProgress()
  
  // Add intersection observer for scroll animations
  setTimeout(observeElements, 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
})
</script>
