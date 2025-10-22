<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow duration-300">
    <div class="flex flex-col md:flex-row md:items-center justify-between">
      <!-- Movie Information -->
      <div class="flex-1">
        <h3 class="text-xl font-bold text-gray-900 mb-2">
          {{ movieName }}
        </h3>
        
        <div class="space-y-2 text-gray-700">
          <!-- Screening Date -->
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span class="font-medium">{{ formattedDate }}</span>
          </div>
          
          <!-- Location -->
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span>{{ location }}</span>
          </div>
          
          <!-- Screening Time (if provided) -->
          <div v-if="screeningTime" class="flex items-center">
            <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{{ screeningTime }}</span>
          </div>
        </div>
      </div>
      
      <!-- Buy Ticket Button -->
      <div class="mt-4 md:mt-0 md:ml-6">
        <a 
          v-if="ticketUrl"
          :href="ticketUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block w-full md:w-auto bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium text-center"
          :class="{ 'opacity-50 cursor-not-allowed pointer-events-none': isDisabled }"
        >
          {{ buttonText }}
        </a>
        <button 
          v-else
          @click="handleBuyTicket"
          class="w-full md:w-auto bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
          :disabled="isDisabled"
          :class="{ 'opacity-50 cursor-not-allowed': isDisabled }"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  movieName: string
  screeningDate: string | Date
  location: string
  screeningTime?: string
  buttonText?: string
  isDisabled?: boolean
  ticketUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  buttonText: 'Buy Tickets',
  isDisabled: false,
  screeningTime: '',
  ticketUrl: ''
})

// Format the date for display
const formattedDate = computed(() => {
  const date = typeof props.screeningDate === 'string' 
    ? new Date(props.screeningDate) 
    : props.screeningDate
    
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

// Handle buy ticket button click
const handleBuyTicket = () => {
  if (props.isDisabled) return
  
  // Emit an event for parent component to handle
  emit('buy-ticket', {
    movieName: props.movieName,
    screeningDate: props.screeningDate,
    location: props.location,
    screeningTime: props.screeningTime
  })
}

// Define emits
const emit = defineEmits<{
  'buy-ticket': [screeningInfo: {
    movieName: string
    screeningDate: string | Date
    location: string
    screeningTime?: string
  }]
}>()
</script>