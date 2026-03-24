<template>
  <div class="min-h-screen text-white relative">
    <UiBackgroundPattern film-grain padding="none">

      <!-- Hero Section -->
      <section class="relative pt-20 pb-12 z-[100]">
        <div class="container mx-auto px-6 text-center">
          <UiSectionHeader
            title="World Screenings"
            subtitle="Experience the untold story of Kashmir in theaters worldwide. Select a view to explore every screening."
            size="md"
          />

          <!-- Stats bar (clickable filters) -->
          <div class="flex justify-center items-center gap-6 sm:gap-10 mt-8">
            <button @click="setFilter('upcoming')" :class="statBtnClass('upcoming')">
              <p :class="['text-3xl sm:text-4xl font-black transition-colors duration-200', activeFilter === 'upcoming' ? 'text-brand-yellow' : 'text-brand-yellow/50']">{{ upcomingCount }}</p>
              <p :class="['text-xs uppercase tracking-widest mt-1 transition-colors duration-200', activeFilter === 'upcoming' ? 'text-brand-yellow' : 'text-gray-500']">Upcoming</p>
            </button>
            <div class="w-px h-10 bg-white/10"></div>
            <button @click="setFilter('all')" :class="statBtnClass('all')">
              <p :class="['text-3xl sm:text-4xl font-black transition-colors duration-200', activeFilter === 'all' ? 'text-white' : 'text-white/40']">{{ allScreenings.length }}</p>
              <p :class="['text-xs uppercase tracking-widest mt-1 transition-colors duration-200', activeFilter === 'all' ? 'text-gray-300' : 'text-gray-600']">Total</p>
            </button>
            <div class="w-px h-10 bg-white/10"></div>
            <button @click="setFilter('countries')" :class="statBtnClass('countries')">
              <p :class="['text-3xl sm:text-4xl font-black transition-colors duration-200', activeFilter === 'countries' ? 'text-white' : 'text-white/40']">{{ countriesData.length }}</p>
              <p :class="['text-xs uppercase tracking-widest mt-1 transition-colors duration-200', activeFilter === 'countries' ? 'text-gray-300' : 'text-gray-600']">Countries</p>
            </button>
          </div>
        </div>
      </section>

      <section class="pb-16">
        <div class="container mx-auto px-6">

          <Transition name="view-fade" mode="out-in">

            <!-- ── TIMELINE VIEW: upcoming + total ── -->
            <div v-if="activeFilter !== 'countries'" :key="activeFilter" class="max-w-4xl mx-auto">
              <div v-if="timelineGroups.length === 0" class="text-center py-16 text-gray-500">
                No upcoming screenings at this time. Check back soon.
              </div>
              <div
                v-for="(group, index) in timelineGroups"
                :key="group.monthKey"
                class="relative pl-10 pb-12 last:pb-0"
              >
                <!-- Timeline spine -->
                <div
                  v-if="index < timelineGroups.length - 1"
                  :class="['absolute left-[5px] top-3 bottom-0 w-px', group.isPast ? 'bg-white/5' : 'bg-brand-yellow/20']"
                ></div>

                <!-- Timeline dot -->
                <div :class="[
                  'absolute left-0 top-1 w-3 h-3 rounded-full border-2 transition-all duration-300',
                  group.isPast
                    ? 'bg-gray-800 border-gray-600'
                    : 'bg-brand-yellow border-brand-yellow shadow-glow-yellow'
                ]"></div>

                <!-- Month label row -->
                <div :class="['flex items-center gap-3 mb-5', group.isPast ? 'opacity-40' : '']">
                  <h3 :class="[
                    'text-sm font-black uppercase tracking-[0.2em] flex-shrink-0',
                    group.isPast ? 'text-gray-500' : 'text-brand-yellow'
                  ]">{{ group.label }}</h3>
                  <div :class="['flex-1 h-px', group.isPast ? 'bg-white/5' : 'bg-brand-yellow/15']"></div>
                  <span :class="['text-xs font-bold flex-shrink-0', group.isPast ? 'text-gray-700' : 'text-brand-yellow/60']">
                    {{ group.screenings.length }} {{ group.screenings.length === 1 ? 'screening' : 'screenings' }}
                  </span>
                </div>

                <!-- Screening cards -->
                <div :class="['space-y-3', group.isPast ? 'opacity-40' : '']">
                  <CardScreening
                    v-for="s in group.screenings"
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
                    :button-text="group.isPast ? 'Past Event' : s.buttonText"
                    :is-disabled="group.isPast || s.isDisabled"
                    @buy-ticket="handleBuyTicket"
                  />
                </div>
              </div>
            </div>

            <!-- ── COUNTRIES VIEW: accordion by country ── -->
            <div v-else key="countries" class="max-w-4xl mx-auto space-y-4">
              <div
                v-for="country in countriesData"
                :key="country.name"
                :id="getCountryId(country.name)"
                class="relative group"
              >
                <!-- Country Card Header -->
                <button
                  @click="toggleCountry(country.name)"
                  :class="[
                    'w-full relative flex items-center gap-4 sm:gap-6 p-5 sm:p-6 rounded-2xl glass-card border transition-all duration-300 text-left overflow-hidden',
                    openCountry === country.name ? 'border-brand-yellow/20' : 'border-white/[0.06] hover:border-white/[0.12]'
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
                <Transition :name="skipCloseAnimation ? '' : 'accordion'">
                  <div v-if="openCountry === country.name" class="overflow-hidden">
                    <div class="pt-3 pb-2 px-1 space-y-8">

                      <!-- City filter pills -->
                      <div v-if="country.cities.length > 1" class="flex flex-wrap gap-2 px-1">
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
                      <div v-if="openCountryScreenings.upcoming.length > 0" class="space-y-3">
                        <div class="flex items-center gap-2.5 px-1">
                          <div class="w-1.5 h-1.5 rounded-full bg-brand-yellow flex-shrink-0"></div>
                          <span class="text-xs font-black text-brand-yellow uppercase tracking-[0.22em]">Upcoming</span>
                          <div class="flex-1 h-px bg-brand-yellow/15"></div>
                        </div>
                        <div class="space-y-3">
                          <CardScreening
                            v-for="s in openCountryScreenings.upcoming"
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
                      <div v-if="openCountryScreenings.past.length > 0" class="space-y-3">
                        <div class="flex items-center gap-2.5 px-1">
                          <div class="w-1.5 h-1.5 rounded-full bg-gray-600 flex-shrink-0"></div>
                          <span class="text-xs font-black text-gray-600 uppercase tracking-[0.22em]">Past Screenings</span>
                          <div class="flex-1 h-px bg-white/5"></div>
                        </div>
                        <div class="space-y-3 opacity-50">
                          <CardScreening
                            v-for="s in openCountryScreenings.past"
                            :key="s.id"
                            :screening-id="s.id"
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
          </Transition>

          <!-- Request a Screening CTA -->
          <div class="mt-20 max-w-4xl mx-auto">
            <div class="glass-card p-8 sm:p-10 relative overflow-hidden text-center">
              <div class="absolute -top-10 -right-10 w-48 h-48 bg-gradient-to-br from-brand-yellow/15 to-transparent rounded-full blur-3xl pointer-events-none"></div>
              <div class="absolute -bottom-10 -left-10 w-36 h-36 bg-gradient-to-tr from-brand-yellow-dark/10 to-transparent rounded-full blur-2xl pointer-events-none"></div>
              <div class="relative z-10">
                <p class="text-xs font-black text-brand-yellow uppercase tracking-[0.25em] mb-4">Don't see your city?</p>
                <h3 class="text-2xl sm:text-3xl font-black text-white mb-4 leading-tight">Request a Screening</h3>
                <p class="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
                  Bring Saffron Kingdom to your community. We work with universities, cultural centers, and independent theaters worldwide.
                </p>
                <NuxtLink
                  to="/about?subject=screening-request#request-screening"
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
type FilterType = 'upcoming' | 'all' | 'countries'

const today = new Date().toISOString().split('T')[0]
const currentMonth = today.substring(0, 7)
const allScreenings = screeningsData

useHead({
  title: 'Screenings - Daffodil Studios',
  meta: [
    { name: 'description', content: 'Find upcoming and past screenings of Saffron Kingdom and explore where to watch.' },
    { property: 'og:title', content: 'Screenings - Daffodil Studios' },
    { property: 'og:description', content: 'Discover upcoming screenings of Saffron Kingdom around the world.' }
  ]
})

// ── Helpers ───────────────────────────────────────────────────
const getCityDisplay = (s: Screening) => s.state ? `${s.city}, ${s.state}` : s.city

// Map country name → ISO 3166-1 alpha-2 code; flag emoji is derived programmatically
const countryIsoCodes: Record<string, string> = {
  'United States': 'US',
  'United Kingdom': 'GB',
  'Australia': 'AU',
  'New Zealand': 'NZ',
  'Canada': 'CA',
  'Germany': 'DE',
}

const getFlagEmoji = (countryName: string): string => {
  const code = countryIsoCodes[countryName]
  if (!code) return '🌍'
  return [...code].map(c => String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65)).join('')
}

const getMonthLabel = (dateStr: string): string =>
  new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(dateStr))

// ── Filter state ──────────────────────────────────────────────
const activeFilter = ref<FilterType>('countries')
const openCountry = ref<string | null>(null)
const selectedCity = ref<Record<string, string>>({})

const statBtnClass = (filter: string) => [
  'text-center px-4 py-2 rounded-xl transition-all duration-200',
  activeFilter.value === filter
    ? filter === 'upcoming'
      ? 'bg-brand-yellow/10 ring-1 ring-brand-yellow/40'
      : 'bg-white/5 ring-1 ring-white/20'
    : 'hover:bg-white/5'
]

const setFilter = (filter: FilterType) => {
  activeFilter.value = filter
  if (filter === 'countries') openCountry.value = null
}

// ── Stats ─────────────────────────────────────────────────────
const upcomingCount = computed(() => allScreenings.filter(s => s.date >= today).length)

// ── Timeline ──────────────────────────────────────────────────
const screeningsByMonth = computed(() => {
  const sorted = [...allScreenings].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  const map = new Map<string, { monthKey: string; label: string; isPast: boolean; screenings: Screening[] }>()
  for (const s of sorted) {
    const monthKey = s.date.substring(0, 7)
    if (!map.has(monthKey)) {
      map.set(monthKey, {
        monthKey,
        label: getMonthLabel(s.date),
        isPast: monthKey < currentMonth,
        screenings: []
      })
    }
    map.get(monthKey)!.screenings.push(s)
  }
  return [...map.values()]
})

const timelineGroups = computed(() => {
  if (activeFilter.value === 'upcoming') {
    return screeningsByMonth.value.filter(g => !g.isPast)
  }
  const upcoming = screeningsByMonth.value.filter(g => !g.isPast)
  const past = screeningsByMonth.value.filter(g => g.isPast).reverse()
  return [...upcoming, ...past]
})

// ── Countries accordion ───────────────────────────────────────
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
        flag: getFlagEmoji(s.country),
        cities: [],
        totalCount: 0,
        upcomingCount: 0,
        screenings: []
      })
    }
    const entry = map.get(s.country)!
    entry.screenings.push(s)
    entry.totalCount++
    if (s.date >= today) entry.upcomingCount++
    const cityKey = getCityDisplay(s)
    if (!entry.cities.includes(cityKey)) entry.cities.push(cityKey)
  }

  for (const entry of map.values()) {
    entry.cities.sort((a, b) => a.localeCompare(b))
  }

  return [...map.values()].sort((a, b) => {
    if (b.upcomingCount !== a.upcomingCount) return b.upcomingCount - a.upcomingCount
    return b.totalCount - a.totalCount
  })
})

const getCountryId = (name: string) => `country-${name.toLowerCase().replace(/\s+/g, '-')}`

const skipCloseAnimation = ref(false)

const waitForLayout = () => new Promise<void>(resolve =>
  requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
)

const toggleCountry = async (name: string) => {
  const isOpening = openCountry.value !== name

  if (!isOpening) {
    openCountry.value = null
    return
  }

  const targetEl = document.getElementById(getCountryId(name))

  // Pre-calculate B's scroll target BEFORE any DOM changes.
  // The math holds regardless of whether scroll-anchoring fires:
  //   scrollTarget = B.top_before + scrollY_before - header - A_content_height
  // After A is removed with anchoring: scrollY decreases by A_content_height,
  // B.top stays the same → scrollTarget == B.top + scrollY_after - header ✓
  // After A is removed without anchoring: scrollY stays, B.top decreases by
  // A_content_height → scrollTarget == B.top_after + scrollY - header ✓
  let scrollTarget = 0
  if (targetEl) {
    scrollTarget = targetEl.getBoundingClientRect().top + window.scrollY - 96

    if (openCountry.value) {
      const openEl = document.getElementById(getCountryId(openCountry.value))
      if (openEl) {
        const aIsAboveB = !!(openEl.compareDocumentPosition(targetEl) & Node.DOCUMENT_POSITION_FOLLOWING)
        if (aIsAboveB) {
          // IMPORTANT: select 'div.overflow-hidden', NOT '.overflow-hidden'.
          // The country card <button> also carries the overflow-hidden class,
          // so querySelector('.overflow-hidden') matched the button (~80px tall)
          // instead of the content div (~2000px+), making us subtract the wrong
          // height and land ~1900px below the target every time.
          const contentEl = openEl.querySelector<HTMLElement>('div.overflow-hidden')
          scrollTarget -= contentEl?.offsetHeight ?? 0
        }
      }
    }
  }

  if (openCountry.value) {
    // Disable scroll anchoring while we remove A's content so the browser
    // cannot fire an async scrollY adjustment that would interrupt our
    // smooth scroll mid-animation.
    document.documentElement.style.overflowAnchor = 'none'
    skipCloseAnimation.value = true
    openCountry.value = null
    await nextTick()
    await waitForLayout()
    skipCloseAnimation.value = false
    document.documentElement.style.overflowAnchor = ''
  }

  if (targetEl) {
    window.scrollTo({ top: Math.max(0, scrollTarget), behavior: 'smooth' })
  }
  openCountry.value = name
}

const getCityCount = (countryName: string, city: string) => {
  const country = countriesData.value.find(c => c.name === countryName)
  if (!country) return 0
  return country.screenings.filter(s => getCityDisplay(s) === city).length
}

// Computed once per open-country + city-filter change — eliminates duplicate
// calls from v-if + v-for pairs in the template.
const openCountryScreenings = computed(() => {
  const empty = { upcoming: [] as Screening[], past: [] as Screening[] }
  if (!openCountry.value) return empty
  const country = countriesData.value.find(c => c.name === openCountry.value)
  if (!country) return empty
  const cityFilter = selectedCity.value[openCountry.value]
  const applyCity = (list: Screening[]) =>
    cityFilter ? list.filter(s => getCityDisplay(s) === cityFilter) : list
  return {
    upcoming: applyCity(country.screenings.filter(s => s.date >= today))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    past: applyCity(country.screenings.filter(s => s.date < today))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
  }
})

function handleBuyTicket(_screeningInfo: { movieName: string; screeningDate: string | Date; location: string; screeningTime?: string }) {
  navigateTo('/about?subject=screening-request#request-screening')
}
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.4s ease, opacity 0.3s ease;
  max-height: 5000px;
}
.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

.view-fade-enter-active,
.view-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.view-fade-enter-from,
.view-fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
