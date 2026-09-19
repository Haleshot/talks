<script setup lang="ts">
// Conference chrome on every slide: IndiaFOSS 2026 and Write the Docs India,
// small and quiet in the bottom right so it never competes with the content.
</script>

<template>
  <footer class="deck-footer">
    <img src="/indiafoss-2026.svg" alt="IndiaFOSS 2026" class="deck-footer-if" />
    <img src="/write-the-docs-india.svg" alt="Write the Docs India" class="deck-footer-wtd" />
  </footer>
</template>

<style scoped>
.deck-footer {
  position: absolute;
  right: 1.7rem;
  bottom: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  opacity: 0.5;
  pointer-events: none;
  z-index: 5;
}
.deck-footer-if { height: 14px; width: auto; }
.deck-footer-wtd { height: 20px; width: auto; }
</style>
