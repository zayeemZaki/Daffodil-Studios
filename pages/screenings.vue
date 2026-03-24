<template>
  <div class="min-h-screen text-white relative">
    <UiBackgroundPattern film-grain padding="none">

      <!-- Hero Section -->
      <section class="relative pt-20 pb-12" style="z-index: 100;">
        <div class="container mx-auto px-6 text-center">
          <UiSectionHeader
            title="World Screenings"
            subtitle="Experience the untold story of Kashmir in theaters worldwide. Select a country to explore every screening."
            size="md"
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
                :ticket-price="(screening as any).ticketPrice ?? 0"
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
                v-for="screening in visiblePastScreenings"
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

            <!-- Show more / collapse -->
            <div v-if="filteredPastScreenings.length > PAST_PAGE_SIZE" class="flex flex-col items-center gap-3">
              <button
                v-if="visiblePastCount < filteredPastScreenings.length"
                @click="visiblePastCount += PAST_PAGE_SIZE"
                class="px-6 py-2.5 rounded-xl text-sm font-bold border border-white/10 text-gray-300 hover:text-white hover:border-brand-yellow/40 hover:bg-brand-yellow/5 transition-all duration-300"
              >
                Show more ({{ Math.min(PAST_PAGE_SIZE, filteredPastScreenings.length - visiblePastCount) }} more)
              </button>
              <button
                v-if="visiblePastCount > PAST_PAGE_SIZE"
                @click="visiblePastCount = PAST_PAGE_SIZE"
                class="text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200 font-medium"
              >
                Collapse
              </button>
              <p class="text-xs text-gray-600">
                Showing {{ visiblePastScreenings.length }} of {{ filteredPastScreenings.length }}
              </p>
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
                v-if="hasActiveFilters"
                @click="clearAllFilters"
                class="text-brand-yellow hover:text-brand-yellow-light transition-colors font-bold text-base"
              >
                <!-- Animated left accent -->
                <div :class="[
                  'absolute left-0 top-0 bottom-0 rounded-l-2xl transition-all duration-300',
                  openCountry === country.name
                    ? 'w-1.5 bg-gradient-to-b from-brand-yellow via-brand-yellow-light to-brand-yellow-dark'
                    : 'w-1 bg-white/10 group-hover:bg-brand-yellow/40 group-hover:w-1.5'
                ]"></div>

                <!-- Flag -->
                <span class="text-4xl sm:text-5xl ml-1 sm:ml-2 flex-shrink-0 select-none">{{ country.flag }}</span>

                <!-- Country name + city count -->
                <div class="flex-1 min-w-0">
                  <h3 :class="[
                    'text-xl sm:text-2xl font-black transition-all duration-300 leading-tight',
                    openCountry === country.name ? 'gradient-text' : 'text-white group-hover:gradient-text'
                  ]">{{ country.name }}</h3>
                  <p class="text-xs sm:text-sm text-gray-500 mt-0.5">
                    {{ country.cities.length }} {{ country.cities.length === 1 ? 'city' : 'cities' }}
                    <span v-if="country.upcomingCount > 0" class="text-brand-yellow font-semibold ml-1.5">
                      · {{ country.upcomingCount }} upcoming
                    </span>
                  </p>
                </div>

                <!-- Screening count + chevron -->
                <div class="flex items-center gap-3 flex-shrink-0">
                  <div class="text-right hidden sm:block">
                    <p class="text-2xl font-black text-white leading-none">{{ country.totalCount }}</p>
                    <p class="text-xs text-gray-600 uppercase tracking-wide mt-0.5">screenings</p>
                  </div>
                  <div :class="[
                    'w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-300',
                    openCountry === country.name
                      ? 'rotate-180 border-brand-yellow/40 bg-brand-yellow/10 text-brand-yellow'
                      : 'border-white/10 text-gray-500 group-hover:border-white/20 group-hover:text-white'
                  ]">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                </div>
              </button>

              <!-- Expanded: City Pills + Screenings -->
              <Transition name="accordion">
                <div v-if="openCountry === country.name" class="overflow-hidden">
                  <div class="pt-2 pb-2 px-1 space-y-8">

                    <!-- City filter pills -->
                    <div class="flex flex-wrap gap-2 px-1">
                      <button
                        @click="selectedCity[country.name] = ''"
                        :class="[
                          'px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200 border',
                          !selectedCity[country.name]
                            ? 'bg-brand-yellow text-gray-900 border-brand-yellow'
                            : 'bg-white/5 text-gray-400 border-white/10 hover:border-brand-yellow/40 hover:text-white'
                        ]"
                      >
                        All Cities
                      </button>
                      <button
                        v-for="city in country.cities"
                        :key="city"
                        @click="selectedCity[country.name] = city"
                        :class="[
                          'px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200 border',
                          selectedCity[country.name] === city
                            ? 'bg-brand-yellow text-gray-900 border-brand-yellow'
                            : 'bg-white/5 text-gray-400 border-white/10 hover:border-brand-yellow/40 hover:text-white'
                        ]"
                      >
                        {{ city }}
                        <span class="ml-1 text-xs opacity-60">({{ getCityCount(country.name, city) }})</span>
                      </button>
                    </div>

                    <!-- Upcoming Screenings -->
                    <div v-if="getFilteredScreenings(country.name, 'upcoming').length > 0" class="space-y-3">
                      <div class="flex items-center gap-2.5 px-1">
                        <div class="w-1.5 h-1.5 rounded-full bg-brand-yellow flex-shrink-0"></div>
                        <span class="text-xs font-black text-brand-yellow uppercase tracking-[0.22em]">Upcoming</span>
                        <div class="flex-1 h-px bg-brand-yellow/15"></div>
                      </div>
                      <div class="space-y-3">
                        <CardScreening
                          v-for="s in getFilteredScreenings(country.name, 'upcoming')"
                          :key="s.id"
                          :screening-id="s.id"
                          :movie-name="s.movieName"
                          :screening-date="s.date"
                          :screening-time="s.time"
                          :venue="s.venue"
                          :city="s.city"
                          :state="s.state"
                          :country="s.country"
                          :ticket-url="s.ticketUrl"
                          :ticket-price="(s as any).ticketPrice ?? 0"
                          :button-text="s.buttonText"
                          :is-disabled="s.isDisabled"
                          @buy-ticket="handleBuyTicket"
                        />
                      </div>
                    </div>

                    <!-- Past Screenings -->
                    <div v-if="getFilteredScreenings(country.name, 'past').length > 0" class="space-y-3">
                      <div class="flex items-center gap-2.5 px-1">
                        <div class="w-1.5 h-1.5 rounded-full bg-gray-600 flex-shrink-0"></div>
                        <span class="text-xs font-black text-gray-600 uppercase tracking-[0.22em]">Past Screenings</span>
                        <div class="flex-1 h-px bg-white/5"></div>
                      </div>
                      <div class="space-y-3 opacity-50">
                        <CardScreening
                          v-for="s in getFilteredScreenings(country.name, 'past')"
                          :key="s.id"
                          :movie-name="s.movieName"
                          :screening-date="s.date"
                          :screening-time="s.time"
                          :venue="s.venue"
                          :city="s.city"
                          :state="s.state"
                          :country="s.country"
                          :ticket-url="''"
                          :button-text="'Past Event'"
                          :is-disabled="true"
                          @buy-ticket="handleBuyTicket"
                        />
                      </div>
                    </div>

                  </div>
                </div>
              </Transition>

            </div>
          </div>

          <!-- Request a Screening CTA -->
          <div class="mt-20">
            <div class="glass-card max-w-2xl mx-auto p-8 sm:p-10 relative overflow-hidden text-center">
              <!-- Decorative orbs -->
              <div class="absolute -top-10 -right-10 w-48 h-48 bg-gradient-to-br from-brand-yellow/15 to-transparent rounded-full blur-3xl pointer-events-none"></div>
              <div class="absolute -bottom-10 -left-10 w-36 h-36 bg-gradient-to-tr from-brand-yellow-dark/10 to-transparent rounded-full blur-2xl pointer-events-none"></div>

              <div class="relative z-10">
                <p class="text-xs font-black text-brand-yellow uppercase tracking-[0.25em] mb-4">Don't see your city?</p>
                <h3 class="text-2xl sm:text-3xl font-black text-white mb-4 leading-tight">Request a Screening</h3>
                <p class="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
                  Bring Saffron Kingdom to your community. We work with universities, cultural centers, and independent theaters worldwide.
                </p>
                <NuxtLink
                  to="/about#request-screening"
                  class="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-brand-yellow to-brand-yellow-light text-gray-900 font-black text-sm sm:text-base hover:scale-105 transition-transform duration-200 shadow-glow-yellow"
                >
                  Get in Touch
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </NuxtLink>
              </div>
            </div>
          </div>

        </div>
      </section>

    </UiBackgroundPattern>
  </div>
</template>

<script setup lang="ts">
import screeningsData from '~/data/screenings.json'

// Saffron Kingdom screenings data
const allScreenings = screeningsData

// Get today's date for comparison
const today = new Date().toISOString().split('T')[0]

// Extract unique locations for filter dropdown (includes country)
const uniqueLocations = computed(() => {
  const locations = allScreenings.map(screening => {
    const cityState = screening.state ? `${screening.city}, ${screening.state}` : `${screening.city}`
    return `${cityState}, ${screening.country}`
  })
  return [...new Set(locations)].sort()
})

useHead({
  title: 'Screenings - Daffodil Studios',
  meta: [
    { name: 'description', content: 'Find upcoming and past screenings of Saffron Kingdom and explore where to watch.' },
    { property: 'og:title', content: 'Screenings - Daffodil Studios' },
    { property: 'og:description', content: 'Discover upcoming screenings of Saffron Kingdom around the world.' }
  ]
})

const today = new Date().toISOString().split('T')[0]

const allScreenings = screeningsData

const isUpcoming = (s: Screening) => s.date >= today
const isPast = (s: Screening) => s.date < today

const totalUpcoming = computed(() => allScreenings.filter(isUpcoming).length)

const countryFlags: Record<string, string> = {
  'United States': '🇺🇸',
  'United Kingdom': '🇬🇧',
  'Australia': '🇦🇺',
  'New Zealand': '🇳🇿',
  'Canada': '🇨🇦',
  'Germany': '🇩🇪',
}

const getCityDisplay = (s: Screening) => s.state ? `${s.city}, ${s.state}` : s.city

const countriesData = computed(() => {
  const map = new Map<string, {
    name: string
    flag: string
    cities: string[]
    totalCount: number
    upcomingCount: number
    screenings: Screening[]
  }>()

type Screening = typeof screeningsData[number]

// Helper function to filter screenings
const filterScreenings = (screenings: Screening[]) => {
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
    }
    const entry = map.get(s.country)!
    entry.screenings.push(s)
    entry.totalCount++
    if (isUpcoming(s)) entry.upcomingCount++

    const cityKey = getCityDisplay(s)
    if (!entry.cities.includes(cityKey)) {
      entry.cities.push(cityKey)
    }
  }

  // Sort cities alphabetically within each country
  for (const entry of map.values()) {
    entry.cities.sort((a, b) => a.localeCompare(b))
  }

// Separate upcoming and past screenings, then apply filters
const upcomingScreenings = computed(() => {
  const upcoming = allScreenings.filter(screening => screening.date >= today)
  return upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
})

const pastScreenings = computed(() => {
  const past = allScreenings.filter(screening => screening.date < today)
  // Sort past screenings by date descending (most recent first)
  return past.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

const filteredUpcomingScreenings = computed(() =>
  filterScreenings(upcomingScreenings.value)
)

const filteredPastScreenings = computed(() =>
  filterScreenings(pastScreenings.value)
)

const PAST_PAGE_SIZE = 10
const visiblePastCount = ref(PAST_PAGE_SIZE)

const visiblePastScreenings = computed(() =>
  filteredPastScreenings.value.slice(0, visiblePastCount.value)
)

// Apply filters from FilterBar component
const applyFilters = (filters: FilterData) => {
  currentFilters.value = { ...filters }
  visiblePastCount.value = PAST_PAGE_SIZE
}

  if (city) {
    screenings = screenings.filter(s => getCityDisplay(s) === city)
  }
  visiblePastCount.value = PAST_PAGE_SIZE
}

// Check if any filters are active
const hasActiveFilters = computed(() =>
  currentFilters.value.selectedLocations.length > 0 || !!currentFilters.value.sortByDate
)

// Get results text for upcoming screenings
const getUpcomingResultsText = () => {
  const count = filteredUpcomingScreenings.value.length
  const total = upcomingScreenings.value.length
  return hasActiveFilters.value
    ? `Upcoming Screenings (${count} of ${total})`
    : `Upcoming Screenings (${count})`
}

function handleBuyTicket(_screeningInfo: { movieName: string; screeningDate: string | Date; location: string; screeningTime?: string }) {
  navigateTo('/about#request-screening')
}
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
