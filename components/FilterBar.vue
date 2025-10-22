<template>
  <div class="bg-white p-4 rounded-lg shadow-md mb-6">
    <form @submit.prevent="handleSearch" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Location Dropdown with Search and Checkboxes -->
      <div class="relative">
        <label class="block text-sm font-medium text-gray-700">Locations</label>
        <div class="relative mt-1">
          <button
            type="button"
            @click="toggleLocationDropdown"
            class="w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-left focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center"
          >
            <span class="text-gray-700">
              {{ getLocationDisplayText() }}
            </span>
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          <!-- Dropdown Content -->
          <div 
            v-if="showLocationDropdown" 
            class="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
          >
            <!-- Search Input -->
            <div class="p-3 border-b border-gray-200">
              <input
                ref="locationSearchInput"
                type="text"
                v-model="locationSearchTerm"
                @input="filterLocations"
                placeholder="Search locations..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
            </div>
            
            <!-- Filtered Checkboxes -->
            <div class="p-2 space-y-2">
              <div 
                v-for="location in filteredLocations" 
                :key="location"
                class="flex items-center"
              >
                <input
                  :id="`location-${location}`"
                  type="checkbox"
                  :value="location"
                  v-model="filters.selectedLocations"
                  @change="onFilterChange"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                >
                <label 
                  :for="`location-${location}`"
                  class="ml-2 text-sm text-gray-700 cursor-pointer hover:text-gray-900"
                >
                  {{ location }}
                </label>
              </div>
              
              <!-- No results message -->
              <div v-if="filteredLocations.length === 0" class="text-sm text-gray-500 py-2">
                No locations found matching "{{ locationSearchTerm }}"
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Date Sort with Arrows -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Sort by Date</label>
        <div class="mt-1 flex">
          <div class="flex-1 flex items-center justify-center bg-gray-50 border border-gray-300 rounded-l-md px-3 py-2">
            <span class="text-sm text-gray-600">Date Order</span>
          </div>
          <div class="flex border-l-0">
            <button
              type="button"
              @click="setSortOrder('asc')"
              :class="[
                'px-3 py-2 border border-l-0 border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors',
                filters.sortByDate === 'asc' ? 'bg-blue-100 text-blue-700' : 'bg-gray-50 hover:bg-gray-100'
              ]"
              title="Earliest first"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
              </svg>
            </button>
            <button
              type="button"
              @click="setSortOrder('desc')"
              :class="[
                'px-3 py-2 border border-l-0 border-gray-300 rounded-r-md focus:ring-blue-500 focus:border-blue-500 transition-colors',
                filters.sortByDate === 'desc' ? 'bg-blue-100 text-blue-700' : 'bg-gray-50 hover:bg-gray-100'
              ]"
              title="Latest first"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </form>
    
    <!-- Clear Filters Button -->
    <div class="mt-4 flex justify-end">
      <button 
        type="button" 
        @click="clearFilters"
        v-if="hasActiveFilters"
        class="text-sm text-gray-600 hover:text-gray-800 underline"
      >
        Clear all filters
      </button>
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
  sortByDate: ''
})

// Dropdown state
const showLocationDropdown = ref(false)
const locationSearchTerm = ref('')
const locationSearchInput = ref<HTMLInputElement>()

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

// Toggle location dropdown
const toggleLocationDropdown = async () => {
  showLocationDropdown.value = !showLocationDropdown.value
  
  if (showLocationDropdown.value) {
    // Focus the search input when dropdown opens
    await nextTick()
    locationSearchInput.value?.focus()
  }
}

// Close dropdown when clicking outside
const closeDropdown = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    showLocationDropdown.value = false
    locationSearchTerm.value = ''
  }
}

// Get display text for location dropdown
const getLocationDisplayText = () => {
  if (filters.selectedLocations.length === 0) {
    return 'Select locations...'
  } else if (filters.selectedLocations.length === 1) {
    return filters.selectedLocations[0]
  } else {
    return `${filters.selectedLocations.length} locations selected`
  }
}

// Filter locations based on search term
const filterLocations = () => {
  // This is handled by the computed property
}

// Set sort order
const setSortOrder = (order: string) => {
  filters.sortByDate = filters.sortByDate === order ? '' : order
  onFilterChange()
}

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return filters.selectedLocations.length > 0 || filters.sortByDate
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
  filters.sortByDate = ''
  showLocationDropdown.value = false
  locationSearchTerm.value = ''
  emit('clear-filters')
  emit('filter-change', { ...filters })
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>