<template>
  <div
    ref="buttonRef"
    class="floating-donate-wrapper"
    :class="isInView ? 'animations-running' : 'animations-paused'"
  >
    <Transition
      enter-active-class="transition-all duration-[400ms] ease-out"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <NuxtLink
        v-if="!isDonationPage"
        to="/donate"
        class="floating-donate-button group"
        aria-label="Donate to Daffodil Studios"
      >
        <span class="donate-pulse" aria-hidden="true"></span>
        <span class="donate-label">Donate</span>
        <svg class="w-4 h-4 text-black transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </NuxtLink>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const buttonRef = ref<HTMLElement | null>(null)
const isInView = ref(true)
let observer: IntersectionObserver | null = null

const route = useRoute()
const isDonationPage = ref(false)

// Check if we're on the donation page
const checkIfDonationPage = () => {
  isDonationPage.value = route.path === '/donate'
}

onMounted(() => {
  checkIfDonationPage()

  observer = new IntersectionObserver(
    ([entry]) => {
      isInView.value = entry.isIntersecting
    },
    { threshold: 0.1 }
  )

  if (buttonRef.value) {
    observer.observe(buttonRef.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
})

// Watch for route changes
watch(() => route.path, () => {
  checkIfDonationPage()
})
</script>

<style scoped>
.floating-donate-wrapper {
  position: fixed;
  left: 1rem;
  bottom: 2rem;
  z-index: 9999;
  pointer-events: none;
}

.floating-donate-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.9rem 1.3rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #FDB913 0%, #FDC94A 45%, #FDB913 100%);
  color: #000;
  font-weight: 800;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  text-decoration: none;
  box-shadow:
    0 16px 40px rgba(253, 185, 19, 0.4),
    0 6px 18px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.55);
  transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.28s ease;
  pointer-events: auto;
  overflow: hidden;
}

.floating-donate-button:hover {
  transform: translateY(-4px);
  box-shadow:
    0 22px 48px rgba(253, 185, 19, 0.45),
    0 10px 26px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.65);
}

.floating-donate-button:active {
  transform: translateY(-1px);
}

.floating-donate-button:focus-visible {
  outline: 3px solid rgba(253, 185, 19, 0.6);
  outline-offset: 4px;
}

.donate-label {
  position: relative;
  z-index: 1;
  font-size: 0.9rem;
}

.donate-pulse {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.25), transparent 55%);
  animation: pulseGlow 2.6s ease-in-out infinite;
  pointer-events: none;
}

@keyframes pulseGlow {
  0%, 100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .floating-donate-wrapper {
    left: 0.75rem;
    bottom: 1.25rem;
  }

  .floating-donate-button {
    padding: 0.85rem 1.15rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .floating-donate-wrapper {
    left: 0.75rem;
    bottom: 1rem;
  }

  .floating-donate-button {
    width: calc(100vw - 1.5rem);
    justify-content: center;
  }
}
</style>
