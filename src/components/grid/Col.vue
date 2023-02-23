<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, inject } from 'vue'
import type { ColSize } from './grid'
import { rowContextKey, useRowSize, calColSizeClass, calcColStyle } from './grid'

defineOptions({
  name: 'Col'
})
const props = defineProps({
  span: Number,
  order: {
    type: Number,
    default: 0
  },
  offset: {
    type: Number,
    default: 0
  },
  pull: {
    type: Number,
    default: 0
  },
  push: {
    type: Number,
    default: 0
  },
  xxl: [Number, Object] as PropType<ColSize>,
  xl: [Number, Object] as PropType<ColSize>,
  lg: [Number, Object] as PropType<ColSize>,
  sm: [Number, Object] as PropType<ColSize>,
  xs: [Number, Object] as PropType<ColSize>
})

const colSizeClass = computed(() =>
  calColSizeClass([props.xxl, props.xl, props.lg, props.sm, props.xs])
)

const { gutter } = inject(rowContextKey, { gutter: computed(() => 0) })

const size = useRowSize()
const colStyle = computed(() => calcColStyle(gutter.value, size.value))
</script>

<template>
  <div
    :class="[
      'semi-col',
      props.span ? `semi-col-${props.span}` : '',
      props.order ? `semi-col-order-${props.order}` : '',
      props.offset ? `semi-col-offset-${props.offset}` : '',
      props.push ? `semi-col-push-${props.push}` : '',
      props.pull ? `semi-col-push-${props.pull}` : '',
      colSizeClass
    ]"
    :style="colStyle"
  >
    <slot />
  </div>
</template>
