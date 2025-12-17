<template>
  <div :class="['mb-16', align === 'center' ? 'text-center' : 'text-left']">
    <h1 
      :class="[
        'font-black mb-8 leading-tight gradient-text animate-fade-in',
        sizeClasses[size]
      ]"
      style="line-height: 1.2; padding-bottom: 0.1em;"
    >
      {{ title }}
    </h1>
    <div 
      :class="[
        'bg-gradient-to-r from-brand-yellow via-brand-yellow-light to-brand-yellow rounded-full',
        align === 'center' ? 'mx-auto' : '',
        dividerClasses[size]
      ]"
      style="box-shadow: 0 0 25px rgba(253, 185, 19, 0.6), 0 4px 15px rgba(253, 185, 19, 0.4);"
    ></div>
    <p 
      v-if="subtitle" 
      :class="[
        'text-gray-300 leading-relaxed',
        align === 'center' ? 'mx-auto' : '',
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
  align?: 'center' | 'left'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  align: 'center'
})

const sizeClasses = {
  sm: 'text-4xl md:text-5xl',
  md: 'text-5xl md:text-7xl',
  lg: 'text-6xl md:text-8xl'
}

const dividerClasses = {
  sm: 'w-40 h-2',
  md: 'w-56 h-2.5', 
  lg: 'w-64 h-3'
}

const subtitleClasses = {
  sm: 'mt-6 text-lg md:text-xl max-w-3xl',
  md: 'mt-8 text-xl md:text-2xl max-w-4xl',
  lg: 'mt-8 text-2xl md:text-3xl max-w-5xl'
}
</script>