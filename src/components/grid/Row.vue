<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, provide } from 'vue'
import { calcRowStyle, rowContextKey, useRowSize, type Gutter } from './grid'

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

const gutter = computed(() => props.gutter)
provide(rowContextKey, { gutter })

const size = useRowSize()
const rowStyle = computed(() => calcRowStyle(props.gutter, size.value))
</script>

<template>
  <div
    :class="[
      'semi-row',
      props.type === 'flex'
        ? `semi-row-${props.type} semi-row-${props.type}-${props.justify} semi-row-${props.type}-${props.align}`
        : ''
    ]"
    :style="rowStyle"
  >
    <slot />
  </div>
</template>
