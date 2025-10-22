<template>
  <div>
    <h1 class="text-4xl font-bold mb-4">Find a Screening</h1>
    
    <!-- Include the FilterBar component with event handlers -->
    <FilterBar 
      :locations="uniqueLocations"
      @filter-change="applyFilters"
      @search="applyFilters"
      @clear-filters="clearAllFilters"
    />
    
    <div class="mt-6 space-y-8">
      <!-- Upcoming Screenings Section -->
      <div v-if="filteredUpcomingScreenings.length > 0">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">
          {{ getUpcomingResultsText() }}
        </h2>
        
        <div class="space-y-4">
          <CardScreening
            v-for="screening in filteredUpcomingScreenings"
            :key="screening.id"
            :movie-name="screening.movieName"
            :screening-date="screening.date"
            :screening-time="screening.time"
            :location="screening.location"
            :ticket-url="screening.ticketUrl"
            :button-text="screening.buttonText"
            :is-disabled="screening.isDisabled"
            @buy-ticket="handleBuyTicket"
          />
        </div>
      </div>
      
      <!-- Past Screenings Section -->
      <div v-if="filteredPastScreenings.length > 0">
        <h2 class="text-2xl font-semibold mb-4 text-gray-600">
          Past Screenings ({{ filteredPastScreenings.length }})
        </h2>
        
        <div class="space-y-4 opacity-75">
          <CardScreening
            v-for="screening in filteredPastScreenings"
            :key="screening.id"
            :movie-name="screening.movieName"
            :screening-date="screening.date"
            :screening-time="screening.time"
            :location="screening.location"
            :ticket-url="''"
            :button-text="'Past Event'"
            :is-disabled="true"
            @buy-ticket="handleBuyTicket"
          />
        </div>
      </div>
      
      <!-- No Results -->
      <div v-if="filteredUpcomingScreenings.length === 0 && filteredPastScreenings.length === 0" class="text-center py-8">
        <div class="mb-4">
          <svg class="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.5a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </div>
        <p class="text-lg text-gray-700 mb-2">
          No screenings found matching your criteria.
        </p>
        <p class="text-sm text-gray-500">
          Try adjusting your search filters or clearing them to see all available screenings.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { FilterData } from '~/types'

// Sample screenings data - including some past dates for testing
const allScreenings = ref([
  // Past screenings
  {
    id: 7,
    movieName: "Yesterday's Echo",
    date: "2025-10-15",
    time: "7:00 PM",
    location: "Downtown Cinema, New York",
    ticketUrl: "",
    buttonText: "Past Event",
    isDisabled: true
  },
  {
    id: 8,
    movieName: "Shadows of Time",
    date: "2025-10-18",
    time: "8:30 PM",
    location: "Arthouse Theater, Los Angeles",
    ticketUrl: "",
    buttonText: "Past Event",
    isDisabled: true
  },
  // Upcoming screenings
  {
    id: 1,
    movieName: "The Mystic Garden",
    date: "2025-10-25",
    time: "7:30 PM",
    location: "Downtown Cinema, New York",
    ticketUrl: "https://example.com/tickets/mystic-garden",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  {
    id: 2,
    movieName: "Urban Echoes",
    date: "2025-10-27",
    time: "8:00 PM",
    location: "Arthouse Theater, Los Angeles",
    ticketUrl: "",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  {
    id: 3,
    movieName: "Silent Waters",
    date: "2025-10-30",
    time: "6:00 PM",
    location: "Independent Cinema, Chicago",
    ticketUrl: "https://example.com/tickets/silent-waters",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  {
    id: 4,
    movieName: "Midnight Chronicles",
    date: "2025-11-02",
    time: "9:00 PM",
    location: "Metro Theater, Miami",
    ticketUrl: "",
    buttonText: "Sold Out",
    isDisabled: true
  },
  {
    id: 5,
    movieName: "Garden of Dreams",
    date: "2025-11-05",
    time: "7:00 PM",
    location: "Art House Cinema, New York",
    ticketUrl: "https://example.com/tickets/garden-dreams",
    buttonText: "Buy Tickets",
    isDisabled: false
  },
  {
    id: 6,
    movieName: "Echoes of Tomorrow",
    date: "2025-11-08",
    time: "8:30 PM",
    location: "Downtown Theater, Los Angeles",
    ticketUrl: "",
    buttonText: "Buy Tickets",
    isDisabled: false
  }
])

// Get today's date for comparison
const today = new Date().toISOString().split('T')[0]

// Extract unique locations for filter dropdown
const uniqueLocations = computed(() => {
  const locations = allScreenings.value.map(screening => screening.location)
  return [...new Set(locations)].sort()
})

// Current filter state
const currentFilters = ref<FilterData>({
  selectedLocations: [],
  sortByDate: ''
})

// Helper function to filter screenings
const filterScreenings = (screenings: any[]) => {
  let result = [...screenings]

  // Filter by selected locations
  if (currentFilters.value.selectedLocations.length > 0) {
    result = result.filter(screening => 
      currentFilters.value.selectedLocations.includes(screening.location)
    )
  }

  // Sort by date if specified
  if (currentFilters.value.sortByDate) {
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

const pastScreenings = computed(() => 
  allScreenings.value.filter(screening => screening.date < today)
)

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
