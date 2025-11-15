<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative">
    <!-- Background Pattern -->
    <div class="absolute inset-0 section-bg-animated">
      <div class="floating-orbs">
        <div class="floating-orbs-center"></div>
      </div>
      
      <!-- Film Grain Texture for Cinematic Feel -->
      <div class="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none" 
           style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E');"></div>
    </div>
    
    <!-- Hero Section -->
    <section class="relative pt-20 pb-12" style="z-index: 100;">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h1 class="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight gradient-text animate-fade-in">
            Find a Screening
          </h1>
          <div 
            class="bg-gradient-to-r from-brand-yellow via-brand-yellow-light to-brand-yellow mx-auto rounded-full w-56 h-2.5"
            style="box-shadow: 0 0 25px rgba(253, 185, 19, 0.6), 0 4px 15px rgba(253, 185, 19, 0.4);"
          ></div>
          <p class="text-gray-300 mx-auto mt-8 leading-relaxed text-xl md:text-2xl max-w-4xl">
            Experience the untold story of Kashmir in theaters worldwide. Discover upcoming screenings in your area.
          </p>
        </div>
        
        <!-- Filter Bar -->
        <div class="max-w-4xl mx-auto mb-8">
          <FilterBar 
            :locations="uniqueLocations"
            @filter-change="applyFilters"
            @search="applyFilters"
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
            />
            
            <div class="grid gap-6 max-w-6xl mx-auto">
              <CardScreening
                v-for="screening in filteredUpcomingScreenings"
                :key="screening.id"
                :screening-id="screening.id"
                :movie-name="screening.movieName"
                :screening-date="screening.date"
                :screening-time="screening.time"
                :location="screening.location"
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
            />
            
            <div class="grid gap-6 max-w-6xl mx-auto opacity-75">
              <CardScreening
                v-for="screening in filteredPastScreenings"
                :key="screening.id"
                :movie-name="screening.movieName"
                :screening-date="screening.date"
                :screening-time="screening.time"
                :location="screening.location"
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { FilterData } from '~/types'

// Saffron Kingdom screenings data
const allScreenings = ref([
  // United States
  {
    id: 1,
    movieName: "Saffron Kingdom",
    date: "2025-03-01",
    time: "",
    location: "Wake Forest Film Festival, Wake Forest, NC",
    country: "United States",
    ticketUrl: "",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  {
    id: 2,
    movieName: "Saffron Kingdom",
    date: "2025-04-22",
    time: "",
    location: "Georgia State University, Atlanta, GA",
    country: "United States",
    ticketUrl: "",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  {
    id: 3,
    movieName: "Saffron Kingdom",
    date: "2025-04-25",
    time: "",
    location: "Julien Dubuque International Film Festival, Dubuque, IA",
    country: "United States",
    ticketUrl: "",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  {
    id: 4,
    movieName: "Saffron Kingdom",
    date: "2025-04-27",
    time: "",
    location: "Julien Dubuque International Film Festival, Dubuque, IA",
    country: "United States",
    ticketUrl: "",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  {
    id: 5,
    movieName: "Saffron Kingdom",
    date: "2025-06-29",
    time: "",
    location: "Tasveer Film Center, Seattle, WA",
    country: "United States",
    ticketUrl: "",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  {
    id: 6,
    movieName: "Saffron Kingdom",
    date: "2025-06-30",
    time: "",
    location: "Johns Hopkins University, Washington, DC",
    country: "United States",
    ticketUrl: "",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  {
    id: 7,
    movieName: "Saffron Kingdom",
    date: "2025-07-18",
    time: "",
    location: "Islamic Society of Akron & Kent, Akron, OH",
    country: "United States",
    ticketUrl: "",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  {
    id: 8,
    movieName: "Saffron Kingdom",
    date: "2025-08-30",
    time: "",
    location: "Islamic Society of North America, Chicago, IL",
    country: "United States",
    ticketUrl: "",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  {
    id: 9,
    movieName: "Saffron Kingdom",
    date: "2025-11-09",
    time: "3:00 PM",
    location: "Teaneck Cinemas, Teaneck, NJ",
    country: "United States",
    ticketUrl: "https://www.eventbrite.com/e/teaneck-international-film-festival-2025-tickets-1689684946159",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  {
    id: 10,
    movieName: "Saffron Kingdom",
    date: "2025-11-16",
    time: "3:00 PM",
    location: "The Nightlight Cinema, Akron, OH",
    country: "United States",
    ticketUrl: "https://nightlightcinema.com/movie/saffron-kingdom",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  {
    id: 11,
    movieName: "Saffron Kingdom",
    date: "2025-08-31",
    time: "",
    location: "Islamic Society of North America, Chicago, IL",
    country: "United States",
    ticketUrl: "",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  {
    id: 12,
    movieName: "Saffron Kingdom",
    date: "2025-09-13",
    time: "",
    location: "School of Visual Arts Theatre, New York, NY",
    country: "United States",
    ticketUrl: "",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  {
    id: 13,
    movieName: "Saffron Kingdom",
    date: "2025-10-19",
    time: "",
    location: "Muslim Public Affairs Council, Los Angeles, CA",
    country: "United States",
    ticketUrl: "",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  // United Kingdom
  {
    id: 14,
    movieName: "Saffron Kingdom",
    date: "2025-09-20",
    time: "",
    location: "Genesis Cinema, London, England",
    country: "United Kingdom",
    ticketUrl: "",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  {
    id: 15,
    movieName: "Saffron Kingdom",
    date: "2025-10-04",
    time: "",
    location: "Palestine House, London, England",
    country: "United Kingdom",
    ticketUrl: "",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  {
    id: 28,
    movieName: "Saffron Kingdom",
    date: "2025-11-20",
    time: "6:00 PM",
    location: "SOAS, University of London, London, UK",
    country: "UK",
    ticketUrl: "https://tinyurl.com/SKSOAS",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  {
    id: 29,
    movieName: "Saffron Kingdom",
    date: "2025-12-06",
    time: "5:00 PM",
    location: "SAN LA Office, 154 S. Vermont Ave, Los Angeles, CA",
    country: "United States",
    ticketUrl: "https://tinyurl.com/saffronkingdom",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  // Australia
  {
    id: 16,
    movieName: "Saffron Kingdom",
    date: "2025-08-06",
    time: "",
    location: "Australian National University, Canberra, ACT",
    country: "Australia",
    ticketUrl: "",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  {
    id: 17,
    movieName: "Saffron Kingdom",
    date: "2025-08-09",
    time: "",
    location: "Bryan Brown Theatre, Sydney, NSW",
    country: "Australia",
    ticketUrl: "",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  {
    id: 18,
    movieName: "Saffron Kingdom",
    date: "2025-08-09",
    time: "",
    location: "Institute of Postcolonial Studies, Melbourne, VIC",
    country: "Australia",
    ticketUrl: "",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  {
    id: 19,
    movieName: "Saffron Kingdom",
    date: "2025-08-15",
    time: "",
    location: "Reading Cinemas Belmont, Perth, WA",
    country: "Australia",
    ticketUrl: "",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  {
    id: 20,
    movieName: "Saffron Kingdom",
    date: "2025-08-23",
    time: "",
    location: "Five Star Cinemas, Brisbane, QLD",
    country: "Australia",
    ticketUrl: "",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  {
    id: 21,
    movieName: "Saffron Kingdom",
    date: "2025-10-05",
    time: "",
    location: "Muslim Film Festival, Perth, WA",
    country: "Australia",
    ticketUrl: "",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  {
    id: 22,
    movieName: "Saffron Kingdom",
    date: "2025-10-18",
    time: "",
    location: "Cinema Nova, Melbourne, VIC",
    country: "Australia",
    ticketUrl: "",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  // New Zealand
  {
    id: 23,
    movieName: "Saffron Kingdom",
    date: "2025-08-08",
    time: "",
    location: "Penthouse Cinema & Cafe, Wellington",
    country: "New Zealand",
    ticketUrl: "",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  {
    id: 24,
    movieName: "Saffron Kingdom",
    date: "2025-08-09",
    time: "",
    location: "Event Cinemas Chartwell, Hamilton",
    country: "New Zealand",
    ticketUrl: "",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  {
    id: 25,
    movieName: "Saffron Kingdom",
    date: "2025-08-09",
    time: "",
    location: "Focal Point Cinema and Cafe, Palmerston North",
    country: "New Zealand",
    ticketUrl: "",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  {
    id: 26,
    movieName: "Saffron Kingdom",
    date: "2025-09-06",
    time: "",
    location: "Event Cinemas St. Lukes, Auckland",
    country: "New Zealand",
    ticketUrl: "",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  // Canada
  {
    id: 27,
    movieName: "Saffron Kingdom",
    date: "2025-10-28",
    time: "",
    location: "Innis Town Hall, Toronto, ON",
    country: "Canada",
    ticketUrl: "",
    buttonText: "Buy Tickets",
    isDisabled: false
  }
])

// Get today's date for comparison
const today = new Date().toISOString().split('T')[0]

// Extract unique locations for filter dropdown (includes country)
const uniqueLocations = computed(() => {
  const locations = allScreenings.value.map(screening => {
    return `${screening.location}, ${screening.country}`
  })
  return [...new Set(locations)].sort()
})

// Extract unique countries
const uniqueCountries = computed(() => {
  const countries = allScreenings.value.map(screening => screening.country)
  return [...new Set(countries)].sort()
})

// Current filter state
const currentFilters = ref<FilterData>({
  selectedLocations: [],
  sortByDate: ''
})

// Helper function to filter screenings
const filterScreenings = (screenings: any[]) => {
  let result = [...screenings]

  // Filter by selected locations (which now includes country)
  if (currentFilters.value.selectedLocations.length > 0) {
    result = result.filter(screening => {
      const fullLocation = `${screening.location}, ${screening.country}`
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
