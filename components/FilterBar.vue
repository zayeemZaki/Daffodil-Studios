<template>
  <div class="glass-card rounded-2xl p-6 relative" style="overflow: visible !important; z-index: 2147483647;">
    <!-- Decorative Background -->
    <div class="absolute -top-4 -right-4 w-32 h-32 bg-brand-gradient-br rounded-full opacity-5 blur-3xl"></div>
    
    <div class="relative z-10" style="overflow: visible !important;">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6" style="overflow: visible !important;">
        <!-- Location Filter -->
        <div class="space-y-3 relative location-filter-container" style="overflow: visible !important; z-index: 2147483647;">
          <label class="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
            Filter by Location
          </label>
          
          <!-- Location Search Input (Dropdown Button) -->
          <div class="relative" style="overflow: visible !important;">
            <input
              ref="locationSearchInput"
              type="text"
              v-model="displayValue"
              @click="openLocationDropdown"
              @focus="openLocationDropdown"
              @input="onInputChange"
              :placeholder="getSearchPlaceholder()"
              class="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 pr-12 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
            >
            <button
              @click="toggleLocationDropdown"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg 
                class="w-5 h-5 text-gray-400 hover:text-yellow-400 transition-all duration-300" 
                :class="{ 'rotate-180': showLocationDropdown }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <!-- Dropdown Content positioned relative to input -->
            <div 
              v-if="showLocationDropdown" 
              class="absolute w-80 bg-gray-800/95 backdrop-blur-md rounded-xl shadow-2xl max-h-80 overflow-hidden border border-white/20 mt-2 left-0"
              style="z-index: 2147483647 !important;"
            >
              <!-- Location List -->
              <div class="p-2 max-h-60 overflow-y-auto space-y-1">
                <label 
                  v-for="location in filteredLocations" 
                  :key="location"
                  class="flex items-center p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer group"
                >
                  <div class="relative flex items-center">
                    <input
                      type="checkbox"
                      :value="location"
                      v-model="filters.selectedLocations"
                      class="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded bg-white/20 border-white/30"
                    >
                    <div 
                      v-if="filters.selectedLocations.includes(location)"
                      class="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                  <span 
                    class="ml-3 text-sm transition-colors"
                    :class="filters.selectedLocations.includes(location) 
                      ? 'text-white font-medium' 
                      : 'text-gray-300 group-hover:text-white'"
                  >
                    {{ location }}
                  </span>
                </label>
                
                <!-- No results message -->
                <div v-if="filteredLocations.length === 0" class="text-sm text-gray-400 py-4 px-3 text-center">
                  No locations found matching "{{ locationSearchTerm }}"
                </div>
              </div>
              
              <!-- Clear location filters -->
              <div v-if="filters.selectedLocations.length > 0" class="p-4 border-t border-white/10">
                <button
                  @click="clearLocationFilters"
                  class="w-full text-sm text-yellow-400 hover:text-yellow-300 transition-colors flex items-center justify-center space-x-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                  <span>Clear location filters</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Sort by Date -->
        <div class="space-y-3">
          <label class="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
            Sort by Date
          </label>
          
          <div class="relative">
            <select
              v-model="filters.sortByDate"
              class="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer hover:bg-white/15"
            >
              <option value="none" class="bg-gray-800 text-white">Default Order</option>
              <option value="asc" class="bg-gray-800 text-white">Earliest First</option>
              <option value="desc" class="bg-gray-800 text-white">Latest First</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Clear All Filters -->
      <div v-if="hasActiveFilters" class="flex justify-center mt-6">
        <button
          @click="clearFilters"
          class="text-sm text-yellow-400 hover:text-yellow-300 transition-colors flex items-center space-x-1"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          <span>Reset all filters</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { FilterData } from '~/types'

// Props for available locations
interface Props {
  locations?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  locations: () => []
})

// Default locations if none provided
const defaultLocations = [
  'Downtown Cinema, New York',
  'Arthouse Theater, Los Angeles', 
  'Independent Cinema, Chicago',
  'Metro Theater, Miami',
  'Art House Cinema, New York',
  'Downtown Theater, Los Angeles'
]

const availableLocations = computed(() => 
  props.locations.length > 0 ? props.locations : defaultLocations
)

// Reactive filter state
const filters = reactive<FilterData>({
  selectedLocations: [],
  sortByDate: 'none'
})

// Location dropdown state
const showLocationDropdown = ref(false)
const locationSearchInput = ref<HTMLInputElement>()

// Location search term
const locationSearchTerm = ref('')

// Display value for the input field
const displayValue = computed({
  get() {
    // When dropdown is open, show search term
    if (showLocationDropdown.value) {
      return locationSearchTerm.value
    }
    // When dropdown is closed, show selected locations
    const selectedCount = filters.selectedLocations.length
    if (selectedCount === 0) {
      return ''
    } else if (selectedCount === 1) {
      return filters.selectedLocations[0]
    } else {
      return `${selectedCount} locations selected`
    }
  },
  set(value) {
    locationSearchTerm.value = value
  }
})

// Filtered locations based on search term
const filteredLocations = computed(() => {
  if (!locationSearchTerm.value) {
    return availableLocations.value
  }
  
  const searchTerm = locationSearchTerm.value.toLowerCase()
  return availableLocations.value.filter(location =>
    location.toLowerCase().includes(searchTerm)
  )
})

// Define emits
const emit = defineEmits<{
  'filter-change': [filters: FilterData]
  'search': [filters: FilterData]
  'clear-filters': []
}>()

// Auto-emit filter changes whenever filters change
watch(filters, () => {
  emit('filter-change', { ...filters })
}, { deep: true })

// Toggle location dropdown (for arrow button)
const toggleLocationDropdown = () => {
  showLocationDropdown.value = !showLocationDropdown.value
  // Clear search when closing dropdown
  if (!showLocationDropdown.value) {
    locationSearchTerm.value = ''
  }
}

// Open location dropdown (for input interactions)
const openLocationDropdown = () => {
  showLocationDropdown.value = true
}

// Handle input changes (typing in search)
const onInputChange = () => {
  // Ensure dropdown opens when typing
  showLocationDropdown.value = true
}

// Get placeholder text for search input
const getSearchPlaceholder = () => {
  const selectedCount = filters.selectedLocations.length
  if (selectedCount === 0) {
    return 'Search locations or select all...'
  } else if (selectedCount === 1) {
    return filters.selectedLocations[0]
  } else {
    return `${selectedCount} locations selected - search for more...`
  }
}

// Location search handler
const onLocationSearch = () => {
  // Just updating the search term, computed will handle filtering
}

// Toggle location selection
const toggleLocation = (location: string) => {
  const index = filters.selectedLocations.indexOf(location)
  if (index > -1) {
    filters.selectedLocations.splice(index, 1)
  } else {
    filters.selectedLocations.push(location)
  }
}

// Clear location filters
const clearLocationFilters = () => {
  filters.selectedLocations = []
  locationSearchTerm.value = ''
}

// Set sort order
const setSortOrder = (order: string) => {
  filters.sortByDate = filters.sortByDate === order ? '' : order
  onFilterChange()
}

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return filters.selectedLocations.length > 0 || (filters.sortByDate !== 'none' && filters.sortByDate !== '')
})

// Handle filter changes (real-time filtering)
const onFilterChange = () => {
  emit('filter-change', { ...filters })
}

// Handle search form submission
const handleSearch = () => {
  emit('search', { ...filters })
}

// Clear all filters
const clearFilters = () => {
  filters.selectedLocations = []
  filters.sortByDate = 'none'
  locationSearchTerm.value = ''
  showLocationDropdown.value = false
  emit('clear-filters')
}

// Close dropdown when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  
  // Check if click is outside the location filter container
  const isInsideLocationFilter = target.closest('.location-filter-container')
  
  if (!isInsideLocationFilter) {
    showLocationDropdown.value = false
    // Clear search term when closing dropdown
    locationSearchTerm.value = ''
  }
}

// Add click outside listener
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>