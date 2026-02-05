<template>
  <button
    @click="emit('toggle')"
    class="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-gray-700 to-gray-600 active:from-gray-800 active:to-gray-700 text-white rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 shadow-lg min-h-[44px] min-w-[180px]"
  >
    <span>{{ expanded ? expandedLabel : collapsedLabel }}</span>
    <svg
      class="w-5 h-5 transition-transform duration-300"
      :class="{ 'rotate-180': expanded }"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
    </svg>
  </button>
</template>

<script setup lang="ts">
interface Props {
  expanded: boolean
  expandedLabel?: string
  collapsedLabel?: string
}

withDefaults(defineProps<Props>(), {
  expandedLabel: 'Show Less',
  collapsedLabel: 'See More'
})

const emit = defineEmits<{
  toggle: []
}>()
</script>
