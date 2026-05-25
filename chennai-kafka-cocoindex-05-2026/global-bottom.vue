<script setup>
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { currentSlideRoute } = useNav()

const hiddenLayouts = ['cover', 'section', 'end', 'full', 'intro', 'statement', 'fact']

const show = computed(() => {
  const layout = currentSlideRoute.value?.meta?.slide?.frontmatter?.layout
  return !hiddenLayouts.includes(layout)
})
</script>

<template>
  <div v-if="show" class="coco-global-footer">
    <div class="coco-global-footer-left">COCOINDEX · KAFKA MEETUP</div>
    <img src="/cocoindex-avatar.svg" class="coco-global-footer-mark" alt="" />
  </div>
</template>

<style>
.coco-global-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  pointer-events: none;
  z-index: 5;
}

.coco-global-footer-left {
  font-family: 'Fira Code', ui-monospace, monospace;
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  color: #8B6E70;
  opacity: 0.6;
}

.coco-global-footer-mark {
  width: 26px;
  height: 26px;
  border-radius: 5px;
  opacity: 0.8;
}
</style>
