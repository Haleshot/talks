<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    blob?: 'hero' | 'right' | 'top-right' | 'left-arc' | 'bottom-left' | 'none'
    logo?: 'top-left' | 'bottom-right' | 'center' | 'none'
    grid?: 'bottom-left' | 'right-mid' | 'none'
  }>(),
  {
    blob: 'right',
    logo: 'bottom-right',
    grid: 'bottom-left',
  },
)
</script>

<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden">
    <div
      v-if="props.blob !== 'none'"
      :class="['osw-blob', `osw-blob-${props.blob}`]"
    />
    <img
      v-if="props.logo !== 'none'"
      src="/event-logo.svg"
      alt="Open Source Weekend logo"
      :class="['osw-logo', `osw-logo-${props.logo}`]"
    />
    <div
      v-if="props.grid !== 'none'"
      :class="['osw-grid-mark', `osw-grid-${props.grid}`]"
    >
      <span v-for="n in 9" :key="n" />
    </div>
  </div>
</template>

<style scoped>
.osw-blob {
  position: absolute;
  filter: blur(34px);
  opacity: 0.55;
  background:
    radial-gradient(circle at 28% 35%, rgba(244, 247, 238, 0.84) 0 17%, transparent 18%),
    radial-gradient(circle at 41% 42%, rgba(184, 219, 143, 0.5) 0 46%, transparent 76%),
    radial-gradient(circle at 68% 56%, rgba(16, 144, 147, 0.18) 0 24%, transparent 57%),
    radial-gradient(circle at 58% 52%, rgba(109, 185, 106, 0.52) 0 58%, transparent 88%);
  mix-blend-mode: normal;
}

.osw-blob::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.2) 0.8px, transparent 0.8px);
  background-size: 7px 7px;
  opacity: 0.18;
}

.osw-blob-hero {
  left: -10%;
  bottom: -20%;
  width: 62%;
  height: 66%;
}

.osw-blob-right {
  right: 18%;
  top: 22%;
  width: 34%;
  height: 54%;
}

.osw-blob-top-right {
  right: -5%;
  top: -10%;
  width: 34%;
  height: 42%;
}

.osw-blob-left-arc {
  left: -7%;
  top: 18%;
  width: 44%;
  height: 40%;
  border-radius: 999px;
}

.osw-blob-bottom-left {
  left: -8%;
  bottom: -10%;
  width: 28%;
  height: 36%;
}

.osw-logo {
  position: absolute;
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.osw-logo-top-left {
  top: 1.4rem;
  left: 1.5rem;
}

.osw-logo-bottom-right {
  right: 1.5rem;
  bottom: 1.35rem;
}

.osw-logo-center {
  left: 50%;
  top: 60%;
  transform: translate(-50%, -50%);
  width: 56px;
  height: 56px;
}

.osw-grid-mark {
  position: absolute;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}

.osw-grid-mark span {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #68b668;
  position: relative;
}

.osw-grid-mark span::before,
.osw-grid-mark span::after {
  content: '';
  position: absolute;
  background: #68b668;
}

.osw-grid-mark span::before {
  left: 50%;
  top: -6px;
  width: 1px;
  height: calc(100% + 12px);
  transform: translateX(-50%);
}

.osw-grid-mark span::after {
  top: 50%;
  left: -6px;
  width: calc(100% + 12px);
  height: 1px;
  transform: translateY(-50%);
}

.osw-grid-bottom-left {
  left: 1.5rem;
  bottom: 1.35rem;
}

.osw-grid-right-mid {
  right: 2rem;
  top: 50%;
}
</style>
