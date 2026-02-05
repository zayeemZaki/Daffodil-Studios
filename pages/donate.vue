<template>
  <div class="donate-page">
    <section class="hero-section relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
      <div class="absolute top-24 left-6 md:left-12 w-80 md:w-96 h-80 md:h-96 bg-brand-yellow/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-12 right-4 md:right-12 w-72 md:w-96 h-72 md:h-96 bg-brand-yellow/20 rounded-full blur-3xl"></div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-20 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 xl:gap-14 items-center">
          <div class="flex flex-col gap-6 lg:gap-8">
            <UiSectionHeader
              title="Support Our Mission"
              subtitle="Your generous contribution helps us continue creating meaningful stories that inspire, educate, and connect audiences around the world. Every donation, no matter the size, fuels independent cinema and the art of storytelling."
              size="md"
            />

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-200">
              <div class="badge-tile">
                <div class="badge-icon" aria-hidden="true">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-sm uppercase tracking-[0.12em] text-brand-yellow">Secure Payment</p>
                  <p class="text-sm text-gray-300">SSL-encrypted and PCI compliant checkout.</p>
                </div>
              </div>

              <div class="badge-tile">
                <div class="badge-icon" aria-hidden="true">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-sm uppercase tracking-[0.12em] text-brand-yellow">Tax Deductible</p>
                  <p class="text-sm text-gray-300">Receive a receipt for your records.</p>
                </div>
              </div>

              <div class="badge-tile sm:col-span-2">
                <div class="badge-icon" aria-hidden="true">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-sm uppercase tracking-[0.12em] text-brand-yellow">Every Dollar Counts</p>
                  <p class="text-sm text-gray-300">100% goes to production and impact campaigns.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="donation-form-wrapper">
            <div class="donation-form-card">
              <div v-if="!iframeLoaded" class="donorbox-skeleton" aria-hidden="true" :style="{ height: `${skeletonHeight}px` }">
                <div class="donorbox-skeleton-inner">
                  <div class="skeleton-line w-2/3"></div>
                  <div class="skeleton-line w-full"></div>
                  <div class="skeleton-line w-5/6"></div>
                  <div class="skeleton-line w-1/2"></div>
                </div>
              </div>

              <iframe
                v-show="iframeLoaded"
                class="donorbox-iframe"
                :src="iframeSrc"
                title="Donate securely via Donorbox"
                allowpaymentrequest="allowpaymentrequest"
                frameborder="0"
                scrolling="no"
                loading="eager"
                fetchpriority="high"
                :style="{ height: `${iframeHeight}px` }"
                @load="handleIframeLoad"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">

const DONORBOX_URL = 'https://donorbox.org/embed/daffodil'
const MAX_IFRAME_HEIGHT = 2000

const iframeLoaded = ref(false)
const iframeSrc = ref(DONORBOX_URL)
const iframeHeight = ref(0)

const handleIframeLoad = () => {
  iframeLoaded.value = true
}


const handleHeightMessage = (event: MessageEvent) => {
  if (event.origin !== 'https://donorbox.org') return

  const data = event.data
  let nextHeight: number | undefined

  if (typeof data === 'string') {
    let parsedJson: any = null
    if (data.trim().startsWith('{')) {
      try {
        parsedJson = JSON.parse(data)
      } catch (err) {
        parsedJson = null
      }
    }
    if (parsedJson && typeof parsedJson.height === 'number') nextHeight = parsedJson.height
    if (!nextHeight) {
      const match = data.match(/height\s*=?\s*(\d{3,4})/i) || data.match(/(\d{3,4})/)
      nextHeight = match ? Number(match[1]) : undefined
    }
  } else if (typeof data === 'object' && data && 'height' in data && typeof (data as any).height === 'number') {
    nextHeight = (data as any).height
  }

  if (!nextHeight) return

  const buffered = Math.round(nextHeight) + 20 // small buffer for focus outlines
  const clamped = Math.min(MAX_IFRAME_HEIGHT, buffered)
  if (clamped !== iframeHeight.value) iframeHeight.value = clamped
}

const skeletonHeight = computed(() => iframeHeight.value || 500)

onMounted(() => {
  window.addEventListener('message', handleHeightMessage)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', handleHeightMessage)
})

// SEO Meta tags
useHead({
  title: 'Donate - Support Daffodil Studios',
  link: [
    { rel: 'preconnect', href: 'https://donorbox.org', crossorigin: '' },
    { rel: 'dns-prefetch', href: 'https://donorbox.org' },
    { rel: 'preconnect', href: 'https://cdn.donorbox.org', crossorigin: '' },
    { rel: 'dns-prefetch', href: 'https://cdn.donorbox.org' },
    { rel: 'preload', href: 'https://donorbox.org/embed/daffodil', as: 'document', crossorigin: '' }
  ],
  meta: [
    {
      name: 'description',
      content: 'Support Daffodil Studios in creating meaningful stories that inspire and connect audiences worldwide. Your donation helps bring powerful narratives to life.'
    },
    {
      property: 'og:title',
      content: 'Donate - Support Daffodil Studios'
    },
    {
      property: 'og:description',
      content: 'Support independent cinema and storytelling. Every donation makes a significant impact.'
    }
  ]
})
</script>

<style scoped>
.donate-page {
  background: #000;
  min-height: calc(100vh - 88px);
  display: flex;
  flex-direction: column;
}

.hero-section {
  flex: 1;
  display: flex;
  align-items: center;
}

.donation-form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
}

.donation-form-card {
  position: relative;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
  backdrop-filter: blur(12px);
  border-radius: 1.5rem;
  padding: 1.25rem;
  box-shadow:
    0 16px 60px rgba(0, 0, 0, 0.35),
    0 6px 18px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(253, 185, 19, 0.28);
  transition: all 0.3s ease;
}

.donation-form-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 24px 70px rgba(0, 0, 0, 0.45),
    0 10px 30px rgba(0, 0, 0, 0.32),
    0 0 0 1px rgba(253, 185, 19, 0.32),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
}

.donorbox-iframe {
  width: 100% !important;
  border-radius: 1rem;
}

.donorbox-skeleton {
  position: relative;
  width: 100%;
  border-radius: 1rem;
  border: 2px solid rgba(253, 185, 19, 0.4);
  background: linear-gradient(135deg, rgba(253, 185, 19, 0.1), rgba(253, 185, 19, 0.08));
  overflow: hidden;
}

.donorbox-skeleton::after {
  content: '';
  position: absolute;
  inset: -40%;
  background: radial-gradient(circle, rgba(253, 185, 19, 0.2) 0%, transparent 60%);
  animation: skeletonPulse 2.4s ease-in-out infinite;
}

.donorbox-skeleton-inner {
  position: relative;
  z-index: 1;
  height: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  justify-content: center;
}

.skeleton-line {
  height: 14px;
  border-radius: 9999px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06));
}

.badge-tile {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.75rem;
  padding: 1rem 1rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.badge-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, rgba(253, 185, 19, 0.22), rgba(253, 201, 74, 0.12));
  color: #fdb913;
  box-shadow: 0 10px 30px rgba(253, 185, 19, 0.18);
}

@keyframes skeletonPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.04);
    opacity: 1;
  }
}

@media (max-width: 1024px) {
  .donation-form-wrapper {
    max-width: 480px;
  }

  .donation-form-card {
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .donation-form-wrapper {
    max-width: 100%;
  }

  .donation-form-card {
    padding: 0.75rem;
    border-radius: 1.1rem;
  }

  .donorbox-iframe,
  .donorbox-skeleton {
    border-radius: 0.75rem;
  }
}
</style>
