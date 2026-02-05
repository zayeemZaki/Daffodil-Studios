<template>
  <div class="glass-card text-center p-8 rounded-2xl transition-all duration-400 transform hover:scale-105 group">
    <div 
      :class="[
        'w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow-yellow transition-all duration-300 group-hover:scale-110 group-hover:rotate-3',
        iconGradient
      ]"
    >
      <slot name="icon" />
    </div>
    <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-brand-yellow transition-colors duration-300">
      <slot name="title" />
    </h3>
    <p class="text-gray-300 text-base leading-relaxed">
      <slot name="description" />
    </p>
  </div>
</template>

<script setup lang="ts">

interface Props {
  variant?: 'primary' | 'secondary' | 'tertiary'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary'
})

const iconGradient = computed(() => {
  const variants = {
    primary: 'bg-gradient-to-br from-brand-yellow to-brand-yellow-dark',
    secondary: 'bg-gradient-to-br from-brand-yellow-light to-brand-yellow', 
    tertiary: 'bg-gradient-to-br from-brand-yellow-dark to-brand-yellow-800'
  }
  return variants[props.variant]
})
</script>