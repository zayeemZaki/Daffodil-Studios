<template>
  <div class="group glass-card rounded-2xl p-4 sm:p-6 hover-lift relative overflow-hidden">
    <!-- Decorative Gradient Orb - Yellow Theme -->
    <div class="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-brand-yellow/20 to-brand-yellow-light/10 rounded-full blur-2xl float-animation"></div>
    <div class="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-tr from-brand-yellow-dark/15 to-brand-yellow/10 rounded-full blur-xl float-animation" style="animation-delay: 2s;"></div>
    
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 relative z-10">
      <!-- Movie Information -->
      <div class="flex-1 space-y-3 sm:space-y-4">
        <h3 class="text-xl sm:text-2xl font-bold text-white group-hover:text-brand-gradient transition-colors duration-300">
          {{ displayTitle }}
        </h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-gray-300">
          <!-- Screening Date -->
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-brand-yellow to-brand-yellow-dark rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
              <svg class="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm text-brand-yellow-light uppercase tracking-wide font-semibold">Date</p>
              <p class="font-bold text-white">{{ formattedDate }}</p>
            </div>
          </div>
          
          <!-- Location -->
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-brand-yellow-light to-brand-yellow rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
              <svg class="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm text-brand-yellow-light uppercase tracking-wide font-semibold">Venue</p>
              <p class="font-bold text-white">{{ venue }}</p>
              <p v-if="country" class="text-sm text-gray-400">{{ venueSubtitle }}</p>
            </div>
          </div>
          
          <!-- Screening Time -->
          <div v-if="screeningTime" class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-brand-yellow-dark to-brand-yellow-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
              <svg class="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm text-brand-yellow-light uppercase tracking-wide font-semibold">Time</p>
              <p class="font-bold text-white">{{ screeningTime }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Buy Ticket Button -->
      <div class="flex-shrink-0 w-full lg:w-auto">
        <UiActionButton
          v-if="ticketUrl && ticketUrl !== 'stripe'"
          :text="buttonText"
          :href="ticketUrl"
          :variant="isDisabled ? 'secondary' : 'gradient'"
          :disabled="isDisabled"
          target="_blank"
          rel="noopener noreferrer"
          size="lg"
          class="w-full lg:w-auto min-h-[48px]"
        />
        <button
          v-else
          @click="handleBuyTicket"
          :disabled="isDisabled || isProcessing"
          :class="[
            'w-full lg:w-auto px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg min-h-[48px]',
            isDisabled ? 'bg-gray-600 text-gray-300 cursor-not-allowed' :
            isProcessing ? 'bg-brand-yellow/70 text-gray-900 cursor-wait' :
            'bg-gradient-to-br from-brand-yellow via-brand-yellow-light to-brand-yellow text-gray-900 hover:scale-105 hover:shadow-glow-yellow'
          ]"
        >
          <span v-if="isProcessing" class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
          <span v-else>{{ buttonText }}</span>
        </button>
      </div>
    </div>
  </div>

  <!-- First-Come Basis Popup -->
  <Teleport to="body">
    <Transition name="popup">
      <div
        v-if="showPopup"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="showPopup = false"
      >
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div class="relative glass-card rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center">
          <!-- Icon -->
          <div class="w-16 h-16 bg-gradient-to-br from-brand-yellow to-brand-yellow-dark rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
            <svg class="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-2">Free Screening</h3>
          <p class="text-gray-300 mb-6 leading-relaxed">
            This is a free screening — no tickets required.<br>
            Seating is <span class="text-brand-yellow font-semibold">first-come, first-served</span>, so arrive early to secure your spot!
          </p>
          <button
            @click="showPopup = false"
            class="w-full px-6 py-3 rounded-xl font-bold text-gray-900 bg-gradient-to-br from-brand-yellow via-brand-yellow-light to-brand-yellow hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Got it!
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">

interface Props {
  movieName: string
  screeningDate: string | Date
  venue: string
  city: string
  state: string
  country?: string
  screeningTime?: string
  buttonText?: string
  isDisabled?: boolean
  ticketUrl?: string
  ticketPrice?: number
  screeningId?: number
}

const props = withDefaults(defineProps<Props>(), {
  buttonText: 'Buy Tickets',
  isDisabled: false,
  screeningTime: '',
  ticketUrl: '',
  country: '',
  ticketPrice: 0,
  screeningId: 0
})

const emit = defineEmits<{
  'buy-ticket': [screeningInfo: {
    movieName: string
    screeningDate: string | Date
    location: string
    screeningTime?: string
  }]
}>()

const isProcessing = ref(false)
const showPopup = ref(false)

// Shared location string builder
const buildLocation = (venue: string, city: string, state: string, country: string) => {
  const cityPart = state ? `${city}, ${state}` : city
  return country ? `${venue}, ${cityPart}, ${country}` : `${venue}, ${cityPart}`
}

// "Atlanta, GA" for US; "London, United Kingdom" for international
const displayTitle = computed(() => {
  if (props.country === 'United States') {
    return props.state ? `${props.city}, ${props.state}` : props.city
  }
  return props.country ? `${props.city}, ${props.country}` : props.city
})

// Venue subtitle line beneath venue name
const venueSubtitle = computed(() => {
  const cityState = props.state ? `${props.city}, ${props.state}` : props.city
  return props.country ? `${cityState} • ${props.country}` : cityState
})

// Format the date for display
const formattedDate = computed(() => {
  let date: Date
  if (typeof props.screeningDate === 'string') {
    const [year, month, day] = props.screeningDate.split('-').map(Number)
    date = new Date(year, month - 1, day)
  } else {
    date = props.screeningDate
  }
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const handleBuyTicket = async () => {
  if (props.isDisabled || isProcessing.value) return

  if (props.ticketUrl === 'stripe') {
    if (!props.ticketPrice || props.ticketPrice <= 0) {
      alert('Ticket price information is unavailable. Please contact us at contact@daffodilstudios.org')
      return
    }

    isProcessing.value = true
    try {
      const response = await $fetch('/api/stripe/create-checkout', {
        method: 'POST',
        body: {
          screeningId: props.screeningId,
          screeningName: `${props.movieName} - ${formattedDate.value}`,
          location: buildLocation(props.venue, props.city, props.state, props.country ?? ''),
          amount: props.ticketPrice,
          quantity: 1
        }
      })

      if (response.url) {
        window.location.href = response.url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Sorry, there was an error processing your request. Please try again.')
    } finally {
      isProcessing.value = false
    }
  } else if (!props.ticketUrl) {
    showPopup.value = true
  } else {
    emit('buy-ticket', {
      movieName: props.movieName,
      screeningDate: props.screeningDate,
      location: buildLocation(props.venue, props.city, props.state, props.country ?? ''),
      screeningTime: props.screeningTime
    })
  }
}
</script>

<style scoped>
.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.2s ease;
}
.popup-enter-active .relative,
.popup-leave-active .relative {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}
.popup-enter-from .relative {
  transform: scale(0.95);
  opacity: 0;
}
</style>