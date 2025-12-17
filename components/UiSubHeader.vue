<template>
  <div :class="['mb-6', align === 'center' ? 'text-center' : 'text-left']">
    <h2
      :class="[
        'font-bold leading-tight gradient-text',
        sizeClasses[size]
      ]"
      style="line-height: 1.25;"
    >
      {{ title }}
    </h2>
    <div
      v-if="divider"
      :class="[
        'bg-gradient-to-r from-brand-yellow via-brand-yellow-light to-brand-yellow rounded-full mt-3',
        align === 'center' ? 'mx-auto' : '',
        dividerClasses[size]
      ]"
      style="box-shadow: 0 0 14px rgba(253, 185, 19, 0.45), 0 2px 8px rgba(253, 185, 19, 0.25);"
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
  size?: 'sm' | 'md'
  align?: 'center' | 'left'
  divider?: boolean
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  align: 'center',
  divider: false
})

const sizeClasses = {
  sm: 'text-xl md:text-2xl',
  md: 'text-2xl md:text-3xl'
}

const dividerClasses = {
  sm: 'w-16 h-1',
  md: 'w-24 h-1.5'
}

const subtitleClasses = {
  sm: 'mt-3 text-base max-w-2xl',
  md: 'mt-4 text-lg max-w-3xl'
}
</script>
