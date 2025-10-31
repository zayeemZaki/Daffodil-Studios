<template>
  <div class="group glass-card rounded-2xl p-6 hover-lift relative overflow-hidden">
    <!-- Decorative Gradient Orb -->
    <div class="absolute -top-2 -right-2 w-20 h-20 bg-brand-gradient-br rounded-full opacity-10 blur-xl float-animation"></div>
    
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
      <!-- Movie Information -->
      <div class="flex-1 space-y-4">
        <h3 class="text-2xl font-bold text-white group-hover:text-brand-gradient transition-colors duration-300">
          {{ movieName }}
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
          <!-- Screening Date -->
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-brand-gradient-br rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-400 uppercase tracking-wide font-medium">Date</p>
              <p class="font-semibold text-white">{{ formattedDate }}</p>
            </div>
          </div>
          
          <!-- Location -->
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-brand-gradient-br rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-400 uppercase tracking-wide font-medium">Venue</p>
              <p class="font-semibold text-white">{{ location }}</p>
              <p v-if="country" class="text-sm text-gray-400">{{ country }}</p>
            </div>
          </div>
          
          <!-- Screening Time -->
          <div v-if="screeningTime" class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-brand-gradient-br rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-400 uppercase tracking-wide font-medium">Time</p>
              <p class="font-semibold text-white">{{ screeningTime }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Buy Ticket Button -->
      <div class="flex-shrink-0">
        <UiActionButton 
          v-if="ticketUrl"
          :text="buttonText"
          :href="ticketUrl"
          :variant="isDisabled ? 'secondary' : 'gradient'"
          :disabled="isDisabled"
          target="_blank"
          rel="noopener noreferrer"
          size="lg"
          class="w-full lg:w-auto"
        />
        <UiActionButton 
          v-else
          :text="buttonText"
          @click="handleBuyTicket"
          :variant="isDisabled ? 'secondary' : 'gradient'"
          :disabled="isDisabled"
          size="lg"
          class="w-full lg:w-auto"
        />
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
  country?: string
  screeningTime?: string
  buttonText?: string
  isDisabled?: boolean
  ticketUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  buttonText: 'Buy Tickets',
  isDisabled: false,
  screeningTime: '',
  ticketUrl: '',
  country: ''
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