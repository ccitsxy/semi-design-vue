<script setup lang="ts">
import type { Component, PropType } from 'vue'

defineOptions({
  name: 'Icon'
})
const props = defineProps({
  rotate: Number,
  size: {
    type: String as PropType<
      'inherit' | 'extra-small' | 'small' | 'default' | 'large' | 'extra-large'
    >,
    default: 'default'
  },
  spin: Boolean,
  svg: [String, Object] as PropType<String | Component>
})
</script>

<template>
  <span
    role="img"
    :class="['semi-icon', `semi-icon-${props.size}`]"
    :style="{
      transform: `rotate(${props.rotate}deg)`
    }"
  >
    <component v-if="props" :is="props.svg" />
    <slot v-else />
  </span>
</template>
