<template>
  <div :class="[wrapperSpacing, align === 'center' ? 'text-center' : 'text-left']">
    <component
      :is="headingTag"
      :class="[
        headingClasses,
        sizeClasses[level][size]
      ]"
      :style="headingStyle"
    >
      {{ title }}
    </component>
    <div
      v-if="showDivider"
      :class="[
        dividerBase,
        align === 'center' ? 'mx-auto' : '',
        dividerClasses[level][size]
      ]"
      :style="dividerStyle"
    ></div>
    <p
      v-if="subtitle"
      :class="[
        'text-gray-300 leading-relaxed',
        align === 'center' ? 'mx-auto' : '',
        subtitleClasses[level][size]
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
  level?: 1 | 2
  divider?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  align: 'center',
  level: 1,
  divider: undefined
})

const headingTag = computed(() => (props.level === 1 ? 'h1' : 'h2'))
const wrapperSpacing = computed(() => (props.level === 1 ? 'mb-16' : 'mb-6'))
const headingClasses = computed(() =>
  props.level === 1
    ? 'font-black mb-8 leading-tight gradient-text animate-fade-in'
    : 'font-bold leading-tight gradient-text'
)

const headingStyle = computed(() => (props.level === 1 ? 'line-height: 1.2; padding-bottom: 0.1em;' : 'line-height: 1.25;'))

const dividerBase = computed(() =>
  props.level === 1
    ? 'bg-gradient-to-r from-brand-yellow via-brand-yellow-light to-brand-yellow rounded-full'
    : 'bg-gradient-to-r from-brand-yellow via-brand-yellow-light to-brand-yellow rounded-full mt-3'
)

const dividerStyle = computed(() =>
  props.level === 1
    ? 'box-shadow: 0 0 25px rgba(253, 185, 19, 0.6), 0 4px 15px rgba(253, 185, 19, 0.4);'
    : 'box-shadow: 0 0 14px rgba(253, 185, 19, 0.45), 0 2px 8px rgba(253, 185, 19, 0.25);'
)

const showDivider = computed(() => (props.divider !== undefined ? props.divider : props.level === 1))

const sizeClasses = {
  1: {
    sm: 'text-4xl md:text-5xl',
    md: 'text-5xl md:text-7xl',
    lg: 'text-6xl md:text-8xl'
  },
  2: {
    sm: 'text-xl md:text-2xl',
    md: 'text-2xl md:text-3xl',
    lg: 'text-3xl md:text-4xl'
  }
} as const

const dividerClasses = {
  1: {
    sm: 'w-40 h-2',
    md: 'w-56 h-2.5',
    lg: 'w-64 h-3'
  },
  2: {
    sm: 'w-16 h-1',
    md: 'w-24 h-1.5',
    lg: 'w-28 h-2'
  }
} as const

const subtitleClasses = {
  1: {
    sm: 'mt-6 text-lg md:text-xl max-w-3xl',
    md: 'mt-8 text-xl md:text-2xl max-w-4xl',
    lg: 'mt-8 text-2xl md:text-3xl max-w-5xl'
  },
  2: {
    sm: 'mt-3 text-base max-w-2xl',
    md: 'mt-4 text-lg max-w-3xl',
    lg: 'mt-4 text-xl max-w-4xl'
  }
} as const
</script>