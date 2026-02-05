<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative">
    <UiBackgroundPattern film-grain padding="none">
      <!-- Hero Section -->
      <section class="relative pt-20 pb-12" style="z-index: 100;">
        <div class="container mx-auto px-6">
        <UiSectionHeader 
          title="Find a Screening"
          subtitle="Experience the untold story of Kashmir in theaters worldwide. Discover upcoming screenings in your area."
          size="md"
        />
        
        <!-- Filter Bar -->
        <div class="max-w-4xl mx-auto mb-8">
          <FilterBar 
            :locations="uniqueLocations"
            @filter-change="applyFilters"
            @clear-filters="clearAllFilters"
          />
        </div>
      </div>
    </section>

    <!-- Screenings Content -->
    <section class="pb-16">
      <div class="container mx-auto px-6">
        <div class="space-y-16">
          <!-- Upcoming Screenings Section -->
          <div v-if="filteredUpcomingScreenings.length > 0" class="space-y-8">
            <UiSectionHeader 
              :title="getUpcomingResultsText()"
              size="md"
              align="center"
              :level="2"
            />
            
            <div class="grid gap-6 max-w-6xl mx-auto">
              <CardScreening
                v-for="screening in filteredUpcomingScreenings"
                :key="screening.id"
                :screening-id="screening.id"
                :movie-name="screening.movieName"
                :screening-date="screening.date"
                :screening-time="screening.time"
                :venue="screening.venue"
                :city="screening.city"
                :state="screening.state"
                :country="screening.country"
                :ticket-url="screening.ticketUrl"
                :ticket-price="screening.ticketPrice"
                :button-text="screening.buttonText"
                :is-disabled="screening.isDisabled"
                @buy-ticket="handleBuyTicket"
              />
            </div>
          </div>
          
          <!-- Past Screenings Section -->
          <div v-if="filteredPastScreenings.length > 0" class="space-y-8">
            <UiSectionHeader 
              :title="`Past Screenings (${filteredPastScreenings.length})`"
              size="md"
              align="center"
              :level="2"
            />
            
            <div class="grid gap-6 max-w-6xl mx-auto opacity-75">
              <CardScreening
                v-for="screening in filteredPastScreenings"
                :key="screening.id"
                :movie-name="screening.movieName"
                :screening-date="screening.date"
                :screening-time="screening.time"
                :venue="screening.venue"
                :city="screening.city"
                :state="screening.state"
                :country="screening.country"
                :ticket-url="''"
                :button-text="'Past Event'"
                :is-disabled="true"
                @buy-ticket="handleBuyTicket"
              />
            </div>
          </div>
          
          <!-- No Results Message -->
          <div v-if="filteredUpcomingScreenings.length === 0 && filteredPastScreenings.length === 0" class="text-center py-16">
            <div class="glass-card max-w-md mx-auto p-8">
              <div class="w-16 h-16 bg-gradient-to-br from-brand-yellow to-brand-yellow-dark rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow-yellow">
                <svg class="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold mb-3 text-white">No screenings found</h3>
              <p class="text-gray-300 mb-6 text-base leading-relaxed">
                Try adjusting your filters or check back later for new screenings.
              </p>
              <button 
                v-if="hasActiveFilters()"
                @click="clearAllFilters"
                class="text-brand-yellow hover:text-brand-yellow-light transition-colors font-bold text-base"
              >
                Clear all filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </UiBackgroundPattern>
  </div>
</template>

<script setup lang="ts">
import type { FilterData } from '~/types'
import screeningsData from '~/data/screenings.json'

// Saffron Kingdom screenings data
const allScreenings = ref(screeningsData)

// Get today's date for comparison
const today = new Date().toISOString().split('T')[0]

// Extract unique locations for filter dropdown (includes country)
const uniqueLocations = computed(() => {
  const locations = allScreenings.value.map(screening => {
    const cityState = screening.state ? `${screening.city}, ${screening.state}` : `${screening.city}`
    return `${cityState}, ${screening.country}`
  })
  return [...new Set(locations)].sort()
})

useHead({
  title: 'Screenings - Daffodil Studios',
  meta: [
    {
      name: 'description',
      content: 'Find upcoming and past screenings of Saffron Kingdom and explore where to watch.'
    },
    {
      property: 'og:title',
      content: 'Screenings - Daffodil Studios'
    },
    {
      property: 'og:description',
      content: 'Discover upcoming screenings of Saffron Kingdom around the world.'
    }
  ]
})

// Current filter state
const currentFilters = ref<FilterData>({
  selectedLocations: [],
  sortByDate: ''
})

// Helper function to filter screenings
const filterScreenings = (screenings: any[]) => {
  let result = [...screenings]

  // Filter by selected locations (reconstructed from city/state/country)
  if (currentFilters.value.selectedLocations.length > 0) {
    result = result.filter(screening => {
      const cityState = screening.state ? `${screening.city}, ${screening.state}` : `${screening.city}`
      const fullLocation = `${cityState}, ${screening.country}`
      return currentFilters.value.selectedLocations.some(selected => {
        // Match either the full location string or just the country
        return fullLocation === selected || screening.country === selected || fullLocation.includes(selected)
      })
    })
  }

  // Sort by date if specified
  if (currentFilters.value.sortByDate && currentFilters.value.sortByDate !== 'none') {
    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      
      if (currentFilters.value.sortByDate === 'asc') {
        return dateA - dateB // Earliest first
      } else {
        return dateB - dateA // Latest first
      }
    })
  }

  return result
}

// Separate upcoming and past screenings, then apply filters
const upcomingScreenings = computed(() => 
  allScreenings.value.filter(screening => screening.date >= today)
)

const pastScreenings = computed(() => {
  const past = allScreenings.value.filter(screening => screening.date < today)
  // Sort past screenings by date descending (most recent first)
  return past.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

const filteredUpcomingScreenings = computed(() => 
  filterScreenings(upcomingScreenings.value)
)

const filteredPastScreenings = computed(() => 
  filterScreenings(pastScreenings.value)
)

// Apply filters from FilterBar component
const applyFilters = (filters: FilterData) => {
  currentFilters.value = { ...filters }
}

// Clear all filters
const clearAllFilters = () => {
  currentFilters.value = {
    selectedLocations: [],
    sortByDate: ''
  }
}

// Get results text for upcoming screenings
const getUpcomingResultsText = () => {
  const count = filteredUpcomingScreenings.value.length
  const total = upcomingScreenings.value.length
  
  if (hasActiveFilters()) {
    return `Upcoming Screenings (${count} of ${total})`
  } else {
    return `Upcoming Screenings (${count})`
  }
}

// Check if any filters are active
const hasActiveFilters = () => {
  return currentFilters.value.selectedLocations.length > 0 ||
         currentFilters.value.sortByDate
}

function handleBuyTicket(screeningInfo: any) {
  // Handle buy ticket event when no direct URL is provided
  // In a real app, this would open a ticket purchasing modal or navigate to a ticket page
}
</script>
