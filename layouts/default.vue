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

    <!-- Floating Donate Button -->
    <FloatingDonateButton />

    <!-- Page content will be injected here -->
    <main class="flex-grow mt-[88px]">
      <slot />
    </main>

    <!-- Footer Component -->
    <LayoutFooter />

  </div>
</template>
