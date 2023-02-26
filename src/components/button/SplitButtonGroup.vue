<script setup lang="ts">
defineOptions({
  name: 'SplitButtonGroup'
})
const props = defineProps({
  ariaLabel: String
})
</script>

<template>
  <div :aria-label="props.ariaLabel" class="semi-button-split">
    <slot />
  </div>
</template>
