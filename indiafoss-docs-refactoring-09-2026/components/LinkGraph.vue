<script setup lang="ts">
// Three pages link to one heading. `step` follows the slide's clicks:
// 0 = as written, 1 = the heading is renamed, 2 = the three links now point at
// an anchor that no longer exists.
const props = withDefaults(defineProps<{ step?: number, fixed?: boolean }>(), { step: 0, fixed: false })
const stale = () => !props.fixed && props.step >= 2
const renamed = () => props.fixed || props.step >= 1
const anchor = () => (props.fixed ? '#quickstart' : '#getting-started')
</script>

<template>
  <svg viewBox="0 0 440 300" role="img" :aria-label="props.fixed ? 'index.md, faq.md and tutorial.md all link to the Quickstart heading in setup.md, updated along with the rename.' : 'index.md, faq.md and tutorial.md each link to the Getting started heading in setup.md. After the heading is renamed to Quickstart, the three links still point at #getting-started.'" class="w-full h-auto" style="font-size:12px; line-height:1">
    <defs>
      <marker id="lg-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" :fill="stale() ? '#d9480f' : '#5b6170'" />
      </marker>
    </defs>

    <!-- connectors: rounded right angles, each with its own attach point on setup.md -->
    <g fill="none" stroke-width="1.4" :stroke="stale() ? '#d9480f' : '#5b6170'" :stroke-dasharray="stale() ? '5,4' : '0'" marker-end="url(#lg-arrow)">
      <path d="M 156 68  H 196 a 8 8 0 0 1 8 8 V 108 a 8 8 0 0 0 8 8 H 278" />
      <path d="M 156 148 H 278" />
      <path d="M 156 228 H 196 a 8 8 0 0 0 8 -8 V 188 a 8 8 0 0 1 8 -8 H 278" />
    </g>

    <!-- anchor labels, masked, sitting above their segment -->
    <g style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:9.5px" :fill="stale() ? '#d9480f' : '#5b6170'">
      <rect x="160" y="52" width="94" height="12" fill="#fbfaf6" /><text x="162" y="62">{{ anchor() }}</text>
      <rect x="160" y="132" width="94" height="12" fill="#fbfaf6" /><text x="162" y="142">{{ anchor() }}</text>
      <rect x="160" y="212" width="94" height="12" fill="#fbfaf6" /><text x="162" y="222">{{ anchor() }}</text>
    </g>

    <!-- source pages -->
    <g style="font-size:12px" fill="#1c1f26">
      <rect x="40" y="52" width="116" height="32" fill="#fff" stroke="#1c1f26" stroke-width="1" />
      <text x="52" y="72">index.md</text>
      <rect x="40" y="132" width="116" height="32" fill="#fff" stroke="#1c1f26" stroke-width="1" />
      <text x="52" y="152">faq.md</text>
      <rect x="40" y="212" width="116" height="32" fill="#fff" stroke="#1c1f26" stroke-width="1" />
      <text x="52" y="232">tutorial.md</text>
    </g>

    <!-- target page with its heading -->
    <g style="font-size:12px">
      <rect x="278" y="96" width="140" height="104" :fill="renamed() ? '#eceefa' : '#fff'" :stroke="renamed() ? '#3f51b5' : '#1c1f26'" stroke-width="1" />
      <text x="290" y="118" fill="#1c1f26">guide/setup.md</text>
      <line x1="278" y1="128" x2="418" y2="128" stroke="#d5d3cc" />
      <text x="290" y="152" style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px" :fill="renamed() ? '#3f51b5' : '#1c1f26'">{{ renamed() ? '## Quickstart' : '## Getting started' }}</text>
      <text x="290" y="178" style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10px" :fill="renamed() ? '#3f51b5' : '#5b6170'">{{ renamed() ? '#quickstart' : '#getting-started' }}</text>
    </g>

    <text v-if="stale()" x="278" y="256" style="font-size:11px" fill="#d9480f">three links, no matching anchor</text>
  </svg>
</template>
