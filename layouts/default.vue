<template>
  <div class="flex flex-col min-h-screen bg-brand-light font-sans relative">
    <!-- Background Pattern Overlay -->
    <div class="fixed inset-0 opacity-[0.02] pointer-events-none">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 25px 25px, rgba(255,193,7,0.8) 2px, transparent 2px); background-size: 50px 50px;"></div>
    </div>
    <div class="fixed inset-0 opacity-[0.015] pointer-events-none">
      <div class="absolute inset-0" style="background-image: linear-gradient(45deg, rgba(255,193,7,0.1) 1px, transparent 1px), linear-gradient(-45deg, rgba(255,193,7,0.1) 1px, transparent 1px); background-size: 20px 20px;"></div>
    </div>
    <!-- Header Component -->
    <LayoutHeader />

    <!-- Page content will be injected here -->
    <main class="flex-grow mt-[88px]">
      <slot />
    </main>

    <!-- Footer Component -->
    <LayoutFooter />
  </div>
</template>
