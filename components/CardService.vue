<template>
  <div class="text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
    <div 
      :class="[
        'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg',
        iconGradient
      ]"
    >
      <slot name="icon" />
    </div>
    <h3 class="text-xl font-semibold text-white mb-3">
      <slot name="title" />
    </h3>
    <p class="text-gray-300">
      <slot name="description" />
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'tertiary'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary'
})

const iconGradient = computed(() => {
  const variants = {
    primary: 'icon-gradient-primary',
    secondary: 'icon-gradient-secondary', 
    tertiary: 'icon-gradient-tertiary'
  }
  return variants[props.variant]
})
</script>