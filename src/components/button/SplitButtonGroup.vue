<script setup lang="ts">
import type { PropType, HTMLAttributes } from 'vue'

defineOptions({
  name: 'SplitButtonGroup'
})
const props = defineProps({
  ariaLabel: String as PropType<HTMLAttributes['aria-label']>
})
</script>

<template>
  <div :aria-label="props.ariaLabel" class="semi-button-split">
    <slot />
  </div>
</template>
