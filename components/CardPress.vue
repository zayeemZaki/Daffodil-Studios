<template>
  <a
    :href="item.url || '#'"
    :target="item.url && item.url !== '#' ? '_blank' : '_self'"
    :rel="item.url && item.url !== '#' ? 'noopener noreferrer' : ''"
    class="flex flex-col glass-card rounded-lg overflow-hidden hover:scale-[1.02] transition-all duration-300 group h-full"
    :class="{ 'cursor-default': !item.url || item.url === '#' }"
  >
    <div :class="['w-full h-40 sm:h-36 overflow-hidden relative shadow-lg group-hover:shadow-xl transition-shadow flex items-center justify-center', gradientClass]">
      <img
        v-if="item.image"
        :src="item.image"
        :alt="`Preview of ${item.title}`"
        class="w-full h-full object-cover absolute inset-0 z-10"
        loading="lazy"
        @error="onImageError"
      />
      <img
        v-else-if="item.url && item.url !== '#'"
        :src="`https://api.microlink.io/?url=${encodeURIComponent(item.url)}&screenshot=true&meta=false&embed=screenshot.url`"
        :alt="`Preview of ${item.title}`"
        class="w-full h-full object-cover absolute inset-0 z-10"
        loading="lazy"
        @error="onImageError"
      />
      <template v-else>
        <svg
          v-if="isPodcast"
          class="w-10 sm:w-12 h-10 sm:h-12 text-white/80 z-0"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2a4 4 0 014 4v6a4 4 0 11-8 0V6a4 4 0 014-4zm0 16c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm6-8.42V12a6 6 0 11-12 0V9.58a8 8 0 1012 0z"/>
        </svg>
        <span
          v-else
          class="text-sm sm:text-base font-bold text-white text-center leading-tight p-3 z-0"
        >
          {{ item.publication }}
        </span>
      </template>
    </div>

    <div class="flex flex-col flex-grow p-4 sm:p-4">
      <span :class="['inline-block px-2.5 py-1 rounded-md text-xs font-semibold mb-2 self-start', badgeClass]">
        {{ item.publication }}
      </span>

      <h3 class="text-sm sm:text-base font-bold text-white mb-2 group-hover:text-brand-gradient transition-colors line-clamp-2 leading-snug">
        {{ item.title }}
      </h3>

      <p class="text-xs text-gray-300 leading-relaxed line-clamp-2 mb-3 flex-grow">
        {{ item.description }}
      </p>

      <div
        v-if="item.url && item.url !== '#'"
        class="inline-flex items-center gap-1 text-brand-gradient group-hover:text-gray-400 transition-colors font-semibold text-xs mt-auto"
      >
        <span>{{ actionLabel }}</span>
        <svg class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
interface PressItem {
  id: number
  publication: string
  title: string
  description: string
  url?: string
  image?: string
  type: 'article' | 'podcast'
}

interface Props {
  item: PressItem
}

const props = defineProps<Props>()

const isPodcast = computed(() => props.item.type === 'podcast')
const actionLabel = computed(() => (isPodcast.value ? 'Listen' : 'Read Article'))
const gradientClass = computed(() =>
  isPodcast.value
    ? 'bg-gradient-to-br from-purple-600 to-pink-600'
    : 'bg-gradient-to-br from-brand-primary to-brand-accent'
)
const badgeClass = computed(() => (isPodcast.value ? 'bg-purple-600' : 'bg-brand-accent'))

const onImageError = (payload: Event) => {
  const img = payload.target as HTMLImageElement
  img.style.display = 'none'
}
</script>
