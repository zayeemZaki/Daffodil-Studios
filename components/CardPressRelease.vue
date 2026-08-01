<template>
  <div class="glass-card rounded-xl overflow-hidden p-4 sm:p-6 lg:p-8">
    <div class="space-y-3 sm:space-y-4">
      <h3 class="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
        {{ release.title }}
      </h3>

      <p class="text-xs sm:text-sm text-gray-400 font-semibold">{{ release.dateline }}</p>

      <button
        @click="expanded = !expanded"
        class="inline-flex items-center gap-2 text-brand-gradient active:text-gray-400 transition-colors font-semibold text-xs min-h-[40px]"
      >
        {{ expanded ? 'Hide' : 'Read' }} Full Press Release
        <svg
          class="w-4 h-4 transition-transform"
          :class="{ 'rotate-180': expanded }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      <div v-show="expanded" class="space-y-4 text-gray-300 leading-relaxed pt-4">
        <template v-for="(block, index) in release.blocks" :key="index">
          <p v-if="block.type === 'paragraph'">
            {{ block.text }}
          </p>

          <div
            v-else-if="block.type === 'quote'"
            class="bg-gray-800/50 p-4 rounded-lg border-l-4 border-brand-accent my-6"
          >
            <p class="italic">{{ block.text }}</p>
            <p class="text-sm text-gray-400 mt-2">- {{ block.attribution }}</p>
          </div>

          <h4 v-else-if="block.type === 'heading'" class="text-lg font-bold text-white pt-2">
            {{ block.text }}
          </h4>

          <p v-else-if="block.type === 'note'" class="font-semibold text-white">
            {{ block.text }}
          </p>

          <div v-else class="pt-2 space-y-2">
            <p v-for="link in block.items" :key="link.url">
              <template v-if="link.prefix">{{ link.prefix }} </template>
              <a
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-brand-gradient hover:text-gray-400 underline"
              >
                {{ link.label }}
              </a>
            </p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PressRelease } from '~/types'

interface Props {
  release: PressRelease
}

defineProps<Props>()

const expanded = ref(false)
</script>
