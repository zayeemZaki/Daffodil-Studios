<template>
  <component 
    :is="tag"
    :to="to"
    :href="href"
    :target="target"
    :rel="rel"
    :class="buttonClasses"
    @click="handleClick"
  >
    <slot name="icon-left" />
    <span>{{ text }}</span>
    <slot name="icon-right" />
    
    <!-- Default icon if no slots provided -->
    <svg 
      v-if="showDefaultIcon && !$slots['icon-right']" 
      class="ml-2 w-5 h-5" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
    </svg>
  </component>
</template>

<script setup lang="ts">

interface Props {
  text: string
  variant?: 'primary' | 'secondary' | 'gradient' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  to?: string
  href?: string
  target?: string
  rel?: string
  showDefaultIcon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  showDefaultIcon: false,
  target: '_self'
})

const emit = defineEmits<{
  click: [event: Event]
}>()

const tag = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'button'
})

const buttonClasses = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden'
  
  const variants = {
    primary: 'btn-primary text-gray-900',
    secondary: 'bg-gradient-to-br from-brand-grey-700 to-brand-grey-800 hover:from-brand-grey-600 hover:to-brand-grey-700 text-white border border-brand-grey-600',
    gradient: 'bg-gradient-to-br from-brand-yellow via-brand-yellow-light to-brand-yellow text-gray-900 hover:shadow-glow-yellow-lg',
    outline: 'border-2 border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-gray-900 backdrop-blur-sm bg-brand-yellow/5'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-7 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl'
  }
  
  return [
    baseClasses,
    variants[props.variant],
    sizes[props.size]
  ].join(' ')
})

const handleClick = (event: Event) => {
  emit('click', event)
}
</script>