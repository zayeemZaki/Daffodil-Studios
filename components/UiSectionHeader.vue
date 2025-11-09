<template>
  <div class="text-center mb-16">
    <h2 
      :class="[
        'font-bold mb-6 leading-tight gradient-text',
        sizeClasses[size]
      ]"
      style="line-height: 1.2; padding-bottom: 0.1em;"
    >
      {{ title }}
    </h2>
    <div 
      :class="[
        'bg-gradient-to-r from-brand-yellow via-brand-yellow-light to-brand-yellow mx-auto rounded-full',
        dividerClasses[size]
      ]"
      style="box-shadow: 0 0 20px rgba(253, 185, 19, 0.5), 0 4px 12px rgba(253, 185, 19, 0.3);"
    ></div>
    <p 
      v-if="subtitle" 
      :class="[
        'text-gray-300 mx-auto mt-6 leading-relaxed',
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
  sm: 'text-3xl md:text-4xl',
  md: 'text-4xl md:text-5xl',
  lg: 'text-5xl md:text-6xl lg:text-7xl'
}

const dividerClasses = {
  sm: 'w-24 h-1.5',
  md: 'w-32 h-1.5', 
  lg: 'w-48 h-2'
}

const subtitleClasses = {
  sm: 'text-base md:text-lg max-w-2xl',
  md: 'text-lg md:text-xl max-w-3xl',
  lg: 'text-xl md:text-2xl max-w-4xl'
}
</script>