<template>
  <div class="text-center mb-16">
    <h2 
      :class="[
        'font-bold mb-6 leading-tight hover-lift gradient-text',
        sizeClasses[size]
      ]"
    >
      {{ title }}
    </h2>
    <div 
      :class="[
        'bg-brand-accent mx-auto rounded-full glow-border',
        dividerClasses[size]
      ]"
    ></div>
    <p 
      v-if="subtitle" 
      :class="[
        'text-gray-300 mx-auto mt-4',
        subtitleClasses[size]
      ]"
    >
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

const sizeClasses = {
  sm: 'text-3xl',
  md: 'text-4xl',
  lg: 'text-5xl'
}

const dividerClasses = {
  sm: 'w-24 h-1',
  md: 'w-32 h-1', 
  lg: 'w-48 h-1'
}

const subtitleClasses = {
  sm: 'text-base max-w-2xl',
  md: 'text-lg max-w-3xl',
  lg: 'text-xl max-w-4xl'
}
</script>