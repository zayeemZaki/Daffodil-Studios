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

          <!-- Global Stats -->
          <div class="flex flex-wrap justify-center items-center gap-6 sm:gap-12 mt-2">
            <div class="text-center">
              <p class="text-4xl font-black gradient-text tabular-nums">{{ allScreenings.length }}</p>
              <p class="text-xs text-gray-500 uppercase tracking-[0.18em] mt-1">Total Screenings</p>
            </div>
            <div class="hidden sm:block w-px h-10 bg-white/10"></div>
            <div class="text-center">
              <p class="text-4xl font-black text-brand-yellow tabular-nums">{{ totalUpcoming }}</p>
              <p class="text-xs text-gray-500 uppercase tracking-[0.18em] mt-1">Upcoming</p>
            </div>
            <div class="hidden sm:block w-px h-10 bg-white/10"></div>
            <div class="text-center">
              <p class="text-4xl font-black gradient-text tabular-nums">{{ countriesData.length }}</p>
              <p class="text-xs text-gray-500 uppercase tracking-[0.18em] mt-1">Countries</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Countries Accordion -->
      <section class="pb-20">
        <div class="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div class="space-y-3">
            <div v-for="country in countriesData" :key="country.name">

              <!-- Country Header Button -->
              <button
                @click="toggleCountry(country.name)"
                :class="[
                  'w-full glass-card rounded-2xl p-5 sm:p-6 flex items-center gap-4 sm:gap-5 transition-all duration-300 group relative overflow-hidden text-left',
                  openCountry === country.name
                    ? 'ring-1 ring-brand-yellow/40 shadow-glow-yellow'
                    : 'hover:ring-1 hover:ring-white/15'
                ]"
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

type Screening = typeof screeningsData[number]

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

  for (const s of allScreenings) {
    if (!map.has(s.country)) {
      map.set(s.country, {
        name: s.country,
        flag: countryFlags[s.country] ?? '🌍',
        cities: [],
        totalCount: 0,
        upcomingCount: 0,
        screenings: []
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

  // Sort countries: most upcoming first, then by total count
  return [...map.values()].sort((a, b) => {
    if (b.upcomingCount !== a.upcomingCount) return b.upcomingCount - a.upcomingCount
    return b.totalCount - a.totalCount
  })
})

const openCountry = ref<string>('')
const selectedCity = ref<Record<string, string>>({})

const toggleCountry = (name: string) => {
  openCountry.value = openCountry.value === name ? '' : name
}

const getFilteredScreenings = (countryName: string, type: 'upcoming' | 'past') => {
  const country = countriesData.value.find(c => c.name === countryName)
  if (!country) return []

  const city = selectedCity.value[countryName]
  let screenings = country.screenings

  if (city) {
    screenings = screenings.filter(s => getCityDisplay(s) === city)
  }

  if (type === 'upcoming') {
    return screenings
      .filter(isUpcoming)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  } else {
    return screenings
      .filter(isPast)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }
}

const getCityCount = (countryName: string, city: string) => {
  const country = countriesData.value.find(c => c.name === countryName)
  if (!country) return 0
  return country.screenings.filter(s => getCityDisplay(s) === city).length
}

function handleBuyTicket(_info: { movieName: string; screeningDate: string | Date; location: string; screeningTime?: string }) {
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
