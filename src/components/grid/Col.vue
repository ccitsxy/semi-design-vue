<script setup lang="ts">
import type { PropType } from 'vue'
import type { ColSize } from './interface'

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
  xxl: [Number, Object] as PropType<Number | ColSize>,
  xl: [Number, Object] as PropType<Number | ColSize>,
  lg: [Number, Object] as PropType<Number | ColSize>,
  sm: [Number, Object] as PropType<Number | ColSize>,
  xs: [Number, Object] as PropType<Number | ColSize>
})
</script>

<template>
  <div :class="['semi-col', `semi-col-${props.span}`]"></div>
</template>
