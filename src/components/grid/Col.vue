<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, inject } from 'vue'
import type { ColSize } from './grid'
import { rowContextKey, useRowSize, calcColPadding } from './grid'

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

const colClass = computed(() => {
  const classes: string[] = []

  const sizesVal = [props.xxl, props.xl, props.lg, props.sm, props.xs]

  const sizes = ['xxl', 'xl', 'lg', 'sm', 'xs']

  sizesVal.forEach((e) => {
    const size = sizes[sizesVal.indexOf(e)]
    if (typeof e === 'number') {
      classes.push(`semi-col-${size}-${e}`)
    } else if (typeof e === 'object') {
      classes.push(
        e.span ? `semi-col-${size}-${e.span}` : '',
        e.order ? `semi-col-${size}-order-${e.order}` : '',
        e.offset ? `semi-col-${size}-offset-${e.offset}` : '',
        e.push ? `semi-col-${size}-push-${e.push}` : '',
        e.pull ? `semi-col-${size}-pull-${e.pull}` : ''
      )
    }
  })

  return classes
})

const { gutter } = inject(rowContextKey, { gutter: computed(() => 0) })

const size = useRowSize()
const colStyle = computed(() => {
  const colStyle: Record<string, string> = {}

  Object.assign(colStyle, calcColPadding(gutter, size.value))

  return colStyle
})
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
      colClass
    ]"
    :style="colStyle"
  >
    <slot />
  </div>
</template>
