<script setup lang="ts">
// A hundred pages that existed in 2013. Pew checked them again in 2023 and 38
// of them were gone. The grid is the finding, not decoration.
const cells = Array.from({ length: 100 }, (_, i) => i)
const gone = (i: number) => i % 100 < 38
</script>

<template>
  <div class="rotgrid" role="img"
       aria-label="A grid of one hundred squares. Thirty-eight are marked as gone, showing the share of web pages from 2013 that were no longer reachable in 2023.">
    <span v-for="i in cells" :key="i" class="cell" :class="{ gone: gone(i) }" />
  </div>
</template>

<style scoped>
.rotgrid {
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  gap: 3px;
  width: 100%;
  max-width: 21rem;
}
.cell {
  aspect-ratio: 1;
  background: rgba(28, 31, 38, 0.16);
}
.cell.gone { background: #d9480f; }
</style>
