<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative">
    <!-- Background Pattern -->
    <UiBackgroundPattern>
      <!-- Hero Section -->
      <section class="relative pb-16">
        <div class="container mx-auto px-6">
          <UiSectionHeader 
            title="Our Films" 
            subtitle="Discover our collection of powerful documentaries exploring untold stories and important narratives."
            size="lg"
          />
        </div>
      </section>

      <!-- Movies Section -->
      <section class="relative pb-24">
        <div class="container mx-auto px-6">
          <div class="space-y-32">
            <!-- Loop through movies -->
            <div 
              v-for="(movie, index) in movies" 
              :key="movie.id" 
              class="relative"
            >
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <!-- Media (Video or Image) - Left for odd, Right for even -->
                <div 
                  :class="[
                    'relative',
                    index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'
                  ]"
                >
                  <div class="aspect-video rounded-2xl overflow-hidden shadow-2xl" :style="movie.videoSrc ? 'pointer-events: auto;' : ''">
                    <!-- Video Player -->
                    <iframe
                      v-if="movie.videoSrc"
                      src="https://www.youtube.com/embed/Mcz-Ke_W4ow?rel=0&modestbranding=1"
                      class="w-full h-full object-cover"
                      frameborder="0"
                      allow="autoplay; encrypted-media"
                      allowfullscreen
                    ></iframe>
                    
                    <!-- Image -->
                    <img 
                      v-else-if="movie.imageSrc"
                      src="~/assets/images/pages/movies/whispers_of_the_valley.png"
                      :alt="movie.title" 
                      class="w-full h-full object-cover"
                    >
                  </div>
                  
                  <!-- Decorative Element -->
                  <div 
                    :class="[
                      'absolute w-32 h-32 bg-brand-gradient-br rounded-full opacity-20 blur-3xl pointer-events-none',
                      index % 2 === 0 ? '-bottom-6 -right-6' : '-bottom-6 -left-6'
                    ]"
                  ></div>
                </div>

                <!-- Movie Info - Right for odd, Left for even -->
                <div 
                  :class="[
                    'space-y-6',
                    index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'
                  ]"
                >
                  <!-- Badge -->
                  <div class="inline-block px-4 py-2 bg-brand-accent rounded-full text-sm font-semibold">
                    {{ movie.badge }}
                  </div>
                  
                  <!-- Title -->
                  <h2 class="text-4xl md:text-5xl font-bold text-brand-gradient">
                    {{ movie.title }}
                  </h2>
                  
                  <!-- Description -->
                  <p class="text-lg text-gray-300 leading-relaxed">
                    {{ movie.description }}
                  </p>
                  
                  <!-- Tags -->
                  <div class="flex flex-wrap gap-3">
                    <span class="px-4 py-2 bg-white/10 rounded-lg text-sm">{{ movie.year }}</span>
                    <span 
                      v-for="tag in movie.tags" 
                      :key="tag"
                      class="px-4 py-2 bg-white/10 rounded-lg text-sm"
                    >
                      {{ tag }}
                    </span>
                  </div>

                  <!-- Action Button -->
                  <div class="flex flex-wrap gap-4 pt-4">
                    <NuxtLink 
                      v-if="movie.buttonAction"
                      :to="movie.buttonAction" 
                      class="bg-brand-accent text-white px-8 py-3 rounded-full text-lg font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      {{ movie.buttonText }}
                    </NuxtLink>
                    <button 
                      v-else
                      :disabled="movie.comingSoon"
                      class="bg-brand-accent text-white px-8 py-3 rounded-full text-lg font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {{ movie.buttonText }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </UiBackgroundPattern>
  </div>
</template>

<script setup lang="ts">
interface Movie {
  id: number
  title: string
  description: string
  year: string
  tags: string[]
  badge: string
  videoSrc?: string
  imageSrc?: string
  videoPoster?: string
  buttonText: string
  buttonAction?: string
  comingSoon: boolean
}

const movies: Movie[] = [
  {
    id: 1,
    title: "Saffron Kingdom",
    description: "Experience the untold story of Kashmir through powerful narratives and compelling visuals. This documentary explores the complexities of the region's history, culture, and the resilient spirit of its people.",
    year: "2025",
    tags: ["Documentary", "Kashmir"],
    badge: "Documentary",
    videoSrc: "https://www.youtube.com/embed/Mcz-Ke_W4ow",
    videoPoster: "~/assets/images/pages/home/movie-poster.jpg",
    buttonText: "Find Screenings",
    buttonAction: "/screenings",
    comingSoon: false
  },
  {
    id: 2,
    title: "Whispers of the Valley",
    description: "Journey through the serene valleys and discover the voices that have long been silenced. This intimate documentary captures the essence of life in remote communities and their enduring connection to the land.",
    year: "2026",
    tags: ["Documentary", "Culture"],
    badge: "Documentary",
    imageSrc: "~/assets/images/pages/movies/whispers_of_the_valley.png",
    buttonText: "Coming Soon",
    comingSoon: true
  }
]
</script>
