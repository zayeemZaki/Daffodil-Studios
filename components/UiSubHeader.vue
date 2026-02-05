<template>
  <UiSectionHeader
    :title="title"
    :subtitle="subtitle"
    :size="size"
    :align="align"
    :divider="divider"
    :level="2"
  />
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  size?: 'sm' | 'md' | 'lg'
  align?: 'center' | 'left'
  divider?: boolean
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  align: 'center',
  divider: false
})
</script>
