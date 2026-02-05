<template>
  <div
    ref="patternRef"
    :class="[
      'section-bg-animated',
      paddingClasses,
      isInView ? 'animations-running' : 'animations-paused'
    ]"
  >
    <!-- Floating Orbs Background -->
    <div class="floating-orbs">
      <div class="floating-orbs-center"></div>
    </div>

    <div
      v-if="filmGrain"
      class="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none film-grain"
    ></div>
    
    <!-- Content Slot -->
    <div class="container mx-auto px-4 relative z-10">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  filmGrain?: boolean
  padding?: 'default' | 'none'
}

const props = withDefaults(defineProps<Props>(), {
  filmGrain: false,
  padding: 'default'
})

const paddingClasses = computed(() => (props.padding === 'none' ? 'py-0' : 'py-10 md:py-16'))

const patternRef = ref<HTMLElement | null>(null)
const isInView = ref(true)
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      isInView.value = entry.isIntersecting
    },
    { threshold: 0.1 }
  )

  if (patternRef.value) {
    observer.observe(patternRef.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>