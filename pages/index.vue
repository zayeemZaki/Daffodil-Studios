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
        <source src="~/assets/images/pages/home/hero-video.mov" type="video/mp4">
        <!-- Fallback image if video doesn't load -->
        <img src="~/assets/images/pages/home/movie-poster.jpg" alt="Daffodil Studios" class="w-full h-full object-cover object-center">
      </video>
      
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <!-- Floating particles -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-20 left-20 w-2 h-2 bg-yellow-400/30 rounded-full float-animation"></div>
        <div class="absolute top-40 right-32 w-1 h-1 bg-amber-300/40 rounded-full float-animation delay-2s"></div>
        <div class="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-orange-400/20 rounded-full float-animation delay-4s"></div>
        <div class="absolute top-1/3 right-1/4 w-1 h-1 bg-yellow-300/50 rounded-full float-animation delay-1s"></div>
      </div>
      
      <!-- Hero home-page -->
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-6xl md:text-7xl font-bold mb-6 leading-tight">
          <span class="text-brand-gradient typewriter-text">Daffodil Studios</span>
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
    <UiBackgroundPattern class="opacity-0" data-animate>
      <UiSectionHeader 
        title="Saffron Kingdom Film" 
        size="lg"
      />
      
      <div class="flex flex-col xl:flex-row items-center gap-16">
        <!-- Movie Poster with 3D Effect -->
        <div class="xl:w-5/12">
          <div class="relative group">
            <!-- Main Poster Container -->
            <div class="relative overflow-hidden rounded-2xl shadow-2xl poster-3d hover-lift">
              <img 
                src="~/assets/images/pages/home/movie-poster.jpg" 
                alt="The Golden Hour Movie Poster" 
                class="w-full h-auto aspect-[2/3] object-cover transition-transform duration-700 group-hover:scale-105"
              >
              <!-- Overlay Effects -->
              <div class="hover-overlay-dark"></div>
              <div class="hover-overlay-brand"></div>
            </div>
            
            <!-- Decorative Elements -->
            <div class="absolute -top-4 -right-4 w-20 h-20 bg-brand-gradient-br rounded-full opacity-20 blur-xl float-animation"></div>
            <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-gradient-tr rounded-full opacity-10 blur-2xl float-animation delay-2s"></div>
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
            <span class="tag-drama">Drama</span>
            <span class="tag-tragedy">Tragedy</span>
            <span class="tag-indie">Indie</span>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 pt-4">
            <UiActionButton 
              text="View Screenings"
              to="/screenings"
              variant="gradient"
              size="lg"
            >
              <template #icon-left>
                <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
                </svg>
              </template>
            </UiActionButton>
            <UiActionButton 
              text="Watch Trailer"
              variant="outline"
              size="lg"
            >
              <template #icon-left>
                <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9 3V7a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H9a2 2 0 01-2-2z"/>
                </svg>
              </template>
            </UiActionButton>
          </div>
        </div>
      </div>
    </UiBackgroundPattern>

    <!-- Clients Section -->
    <UiBackgroundPattern
      :gradient="'from-purple-900 via-blue-900 to-indigo-900'"
      :primary-orb="'from-blue-400/20 to-purple-500/20'"
      :secondary-orb="'from-purple-400/15 to-indigo-400/15'"
      :center-orb="'from-blue-300/10 to-purple-400/10'"
    >
      <div class="container mx-auto px-4">
        <UiSectionHeader
          title="Our Partners"
          subtitle="Trusted by leading brands and organizations worldwide to tell their stories through film."
          :divider-gradient="'from-blue-400 to-purple-500'"
        />
        
        <!-- Client logos sliding row -->
        <div class="overflow-hidden mb-8">
          <div class="animate-scroll flex items-center space-x-8">
            <!-- First set of logos -->
            <div class="client-logo-card">
              <img src="/assets/images/logos/clients/GSU.png" alt="GSU">
            </div>
            <div class="client-logo-card">
              <img src="/assets/images/logos/clients/american-job-exchange.png" alt="American Job Exchange">
            </div>
            <div class="client-logo-card">
              <img src="/assets/images/logos/clients/citi.png" alt="Citi">
            </div>
            <div class="client-logo-card">
              <img src="/assets/images/logos/clients/ge.png" alt="GE">
            </div>
            <div class="client-logo-card">
              <img src="/assets/images/logos/clients/gp.png" alt="GP">
            </div>
            <div class="client-logo-card">
              <img src="/assets/images/logos/clients/hcl.png" alt="HCL">
            </div>
            <div class="client-logo-card">
              <img src="/assets/images/logos/clients/islamic-relief.png" alt="Islamic Relief">
            </div>
            <div class="client-logo-card">
              <img src="/assets/images/logos/clients/lg.png" alt="LG">
            </div>
            <div class="client-logo-card">
              <img src="/assets/images/logos/clients/mercy-corps.png" alt="Mercy Corps">
            </div>
            <div class="client-logo-card">
              <img src="/assets/images/logos/clients/metlife.png" alt="MetLife">
            </div>
            <div class="client-logo-card">
              <img src="/assets/images/logos/clients/save-the-children.png" alt="Save the Children">
            </div>
            <div class="client-logo-card">
              <img src="/assets/images/logos/clients/uol.png" alt="UOL">
            </div>
            
            <!-- Duplicate set for seamless loop -->
            <div class="client-logo-card">
              <img src="/assets/images/logos/clients/GSU.png" alt="GSU">
            </div>
            <div class="client-logo-card">
              <img src="/assets/images/logos/clients/american-job-exchange.png" alt="American Job Exchange">
            </div>
            <div class="client-logo-card">
              <img src="/assets/images/logos/clients/citi.png" alt="Citi">
            </div>
            <div class="client-logo-card">
              <img src="/assets/images/logos/clients/ge.png" alt="GE">
            </div>
            <div class="client-logo-card">
              <img src="/assets/images/logos/clients/gp.png" alt="GP">
            </div>
            <div class="client-logo-card">
              <img src="/assets/images/logos/clients/hcl.png" alt="HCL">
            </div>
            <div class="client-logo-card">
              <img src="/assets/images/logos/clients/islamic-relief.png" alt="Islamic Relief">
            </div>
            <div class="client-logo-card">
              <img src="/assets/images/logos/clients/lg.png" alt="LG">
            </div>
            <div class="client-logo-card">
              <img src="/assets/images/logos/clients/mercy-corps.png" alt="Mercy Corps">
            </div>
            <div class="client-logo-card">
              <img src="/assets/images/logos/clients/metlife.png" alt="MetLife">
            </div>
            <div class="client-logo-card">
              <img src="/assets/images/logos/clients/save-the-children.png" alt="Save the Children">
            </div>
            <div class="client-logo-card">
              <img src="/assets/images/logos/clients/uol.png" alt="UOL">
            </div>
          </div>
        </div>
      </div>
    </UiBackgroundPattern>

    <!-- Services Section -->
    <UiBackgroundPattern
      :gradient="'from-gray-900 via-gray-800 to-black'"
      :primary-orb="'from-yellow-400/20 to-amber-500/20'"
      :secondary-orb="'from-amber-400/15 to-orange-400/15'"
      :center-orb="'from-yellow-300/10 to-amber-400/10'"
    >
      <div class="container mx-auto px-4">
        <UiSectionHeader
          title="What We Do"
          subtitle="From concept to screen, we provide comprehensive film production services that bring your vision to life."
          :divider-gradient="'from-yellow-400 to-amber-500'"
        />
        
        <!-- Services Grid -->
        <div class="grid md:grid-cols-3 gap-8 mb-12">
          <CardService variant="primary">
            <template #icon>
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            </template>
            <template #title>Film Production</template>
            <template #description>Complete film production from pre-production planning to post-production excellence.</template>
          </CardService>
          
          <CardService variant="secondary">
            <template #icon>
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
              </svg>
            </template>
            <template #title>Creative Direction</template>
            <template #description>Innovative storytelling and creative direction that captivates audiences worldwide.</template>
          </CardService>
          
          <CardService variant="tertiary">
            <template #icon>
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </template>
            <template #title>Distribution</template>
            <template #description>Strategic distribution and marketing to ensure your film reaches the right audience.</template>
          </CardService>
        </div>
        
        <!-- Call to Action -->
        <div class="text-center">
          <UiActionButton 
            to="/about" 
            variant="primary"
            size="lg"
            text="Learn More About Us"
          >
            <template #icon-right>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </template>
          </UiActionButton>
        </div>
      </div>
    </UiBackgroundPattern>
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
