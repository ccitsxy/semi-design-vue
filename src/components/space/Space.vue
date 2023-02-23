<script setup lang="ts">
import { computed, type PropType } from 'vue'
import type { Spacing } from './space'
import { calSpacingStyleAndClass } from './space'

import '@douyinfe/semi-foundation/space/space.scss'

defineOptions({
  name: 'Space'
})
const props = defineProps({
  align: {
    type: String as PropType<'start' | 'end' | 'center' | 'baseline'>,
    default: 'center'
  },
  spacing: {
    type: [String, Number, Array<String | Number>] as PropType<Spacing | Spacing[]>,
    default: 'tight'
  },
  vertical: {
    type: Boolean,
    default: false
  },
  wrap: {
    type: Boolean,
    default: false
  }
})

const spacingStyleAndClass = computed(() => calSpacingStyleAndClass(props.spacing))
</script>

<template>
  <div
    :class="[
      'semi-space',
      `semi-space-align-${props.align}`,
      props.vertical ? 'semi-space-vertical' : 'semi-space-horizontal',
      props.wrap ? 'semi-space-wrap' : '',
      spacingStyleAndClass.spacingClass
    ]"
    :style="spacingStyleAndClass.spacingStyle"
  >
    <slot />
  </div>
</template>
