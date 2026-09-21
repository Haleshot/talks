<template>
  <footer
    class="deck-footer"
    :class="{ 'deck-footer-cover': $slidev.nav.currentPage === 1 }"
  >
    <span v-if="$slidev.nav.currentPage !== 1" class="deck-page">
      {{ $slidev.nav.currentPage }} of {{ $slidev.nav.total }}
    </span>
    <img src="/indiafoss-2026.svg" alt="IndiaFOSS 2026" class="deck-footer-if" />
    <img src="/write-the-docs-india.svg" alt="Write the Docs India" class="deck-footer-wtd" />
  </footer>
</template>

<style scoped>
/* Conference chrome on every slide: where you are in the deck, and the two
   event logos. The cover gets larger logos and no page number. */
.deck-footer {
  position: absolute;
  right: 1.7rem;
  bottom: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  pointer-events: none;
  z-index: 5;
}
.deck-page {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.72rem;
  color: #5b6170;
  margin-right: 0.4rem;
  white-space: nowrap;
}
.deck-footer-if { height: 19px; width: auto; opacity: 0.55; }
.deck-footer-wtd { height: 27px; width: auto; opacity: 0.55; }

/* The cover is the one slide where the logos are the point, not chrome. */
.deck-footer-cover { gap: 1.1rem; bottom: 1.6rem; }
.deck-footer-cover .deck-footer-if { height: 32px; opacity: 0.8; }
.deck-footer-cover .deck-footer-wtd { height: 45px; opacity: 0.8; }
</style>
