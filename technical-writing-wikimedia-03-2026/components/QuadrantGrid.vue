<template>
  <div class="grid grid-cols-2 gap-5 max-w-2xl mx-auto text-left">
    <div :class="cellClass('tutorials')" class="border-2 rounded-lg p-6">
      <div class="flex items-center gap-2 mb-2">
        <carbon-education class="text-lg" />
        <div class="font-bold text-base">Tutorials</div>
      </div>
      <div class="text-sm opacity-70">Learning-oriented</div>
      <div class="text-sm opacity-70">Acquisition + Action</div>
    </div>
    <div :class="cellClass('how-to')" class="border-2 rounded-lg p-6">
      <div class="flex items-center gap-2 mb-2">
        <carbon-task class="text-lg" />
        <div class="font-bold text-base">How-to Guides</div>
      </div>
      <div class="text-sm opacity-70">Task-oriented</div>
      <div class="text-sm opacity-70">Application + Action</div>
    </div>
    <div :class="cellClass('explanation')" class="border-2 rounded-lg p-6">
      <div class="flex items-center gap-2 mb-2">
        <carbon-idea class="text-lg" />
        <div class="font-bold text-base">Explanation</div>
      </div>
      <div class="text-sm opacity-70">Understanding-oriented</div>
      <div class="text-sm opacity-70">Acquisition + Information</div>
    </div>
    <div :class="cellClass('reference')" class="border-2 rounded-lg p-6">
      <div class="flex items-center gap-2 mb-2">
        <carbon-book class="text-lg" />
        <div class="font-bold text-base">Reference</div>
      </div>
      <div class="text-sm opacity-70">Information-oriented</div>
      <div class="text-sm opacity-70">Application + Information</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  highlight: {
    type: String,
    default: 'all'
  }
})

function cellClass(quadrant) {
  if (props.highlight === 'all' || props.highlight === quadrant) {
    return 'border-primary text-primary bg-primary/10'
  }
  return 'border-gray-300 opacity-40'
}
</script>
