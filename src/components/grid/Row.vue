<script setup lang="ts">
import type { PropType } from 'vue'
import type { Gutter } from './interface'

import '@douyinfe/semi-foundation/grid/grid.scss'

defineOptions({
  name: 'Row'
})
const props = defineProps({
  align: String as PropType<'top' | 'middle' | 'bottom'>,
  gutter: [Number, Object, Array<Number | Object>] as PropType<Gutter | [Gutter, Gutter]>,
  justify: {
    type: String as PropType<'start' | 'end' | 'center' | 'space-around' | 'space-between'>,
    default: 'start'
  },
  type: String as PropType<'flex'>
})
</script>

<template>
  <div
    :class="[
      'semi-row',
      props.type === 'flex' ? `semi-row-flex semi-row-${props.justify} semi-row-${props.align}` : ''
    ]"
  ></div>
</template>
