<template>
  <div class="flex flex-col min-h-screen bg-[#060810] relative">
    <!-- Aurora background -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="aurora-orb aurora-orb-gold"></div>
      <div class="aurora-orb aurora-orb-amber"></div>
      <div class="aurora-orb aurora-orb-indigo"></div>
    </div>
    <!-- Header Component -->
    <LayoutHeader />

    <!-- Now Screening announcement banner -->
    <div class="now-screening-banner">
      <NuxtLink to="/screenings" class="now-screening-link">
        <span class="now-screening-dot" aria-hidden="true"></span>
        <span class="now-screening-text">
          <span class="font-black tracking-wide">Saffron Kingdom</span>
          <span class="mx-2 opacity-40">—</span>
          <span>Now Showing Worldwide</span>
        </span>
        <svg class="now-screening-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
        </svg>
      </NuxtLink>
    </div>

    <!-- Floating Donate Button -->
    <FloatingDonateButton />

    <!-- Page content will be injected here -->
    <!-- mt accounts for fixed header (88px) + now-screening banner (~32px) -->
    <main class="flex-grow mt-[120px]">
      <slot />
    </main>

    <!-- Footer Component -->
    <LayoutFooter />

  </div>
</template>
