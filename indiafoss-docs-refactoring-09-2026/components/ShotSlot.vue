<script setup lang="ts">
// A screenshot frame. Without `src` it renders a labelled placeholder so a draft
// stays review-safe. `raw` shows the image at 1:1 pixels, cropped by `pos`, which
// is how a wide screenshot of a diff stays legible on a projector.
const props = withDefaults(
  defineProps<{
    label: string
    caption?: string
    src?: string
    height?: string
    raw?: boolean
    pos?: string
  }>(),
  { caption: '', src: '', height: '', raw: false, pos: 'left top' },
)
</script>

<template>
  <figure class="shot" :style="props.height ? { height: props.height } : {}">
    <div class="shot-window">
      <img
        v-if="props.src"
        :src="props.src"
        :alt="props.label"
        class="shot-img"
        :style="props.raw
          ? { objectFit: 'none', objectPosition: props.pos }
          : { objectFit: 'contain', objectPosition: 'left top', height: 'auto' }"
      />
      <div v-else class="shot-empty">{{ props.label }}</div>
    </div>
    <figcaption v-if="props.caption" class="shot-caption">{{ props.caption }}</figcaption>
  </figure>
</template>

<style scoped>
.shot {
  margin: 0;
  display: flex;
  flex-direction: column;
  border: 1px solid #d5d3cc;
  background: #fff;
  overflow: hidden;
}
.shot-window { flex: 1; min-height: 0; overflow: hidden; display: flex; }
.shot-img { width: 100%; height: 100%; }
.shot-empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  text-align: center;
  color: #8a8f9a;
  font-size: 0.8rem;
  font-style: italic;
}
.shot-caption {
  padding: 0.35rem 0.6rem;
  font-size: 0.7rem;
  color: #5b6170;
  border-top: 1px solid #e6e4dd;
  background: #fff;
}
</style>
