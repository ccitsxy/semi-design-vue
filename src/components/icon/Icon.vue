<script setup lang="ts">
import type { Component, PropType, SVGAttributes } from 'vue'
import { computed } from 'vue'
import { isString, isUndefined } from '@/utils'

defineOptions({
  name: 'Icon'
})
const props = defineProps({
  ariaLabel: String as PropType<SVGAttributes['aria-label']>,
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
const ariaLabel = computed(() => {
  if (isUndefined(props.ariaLabel)) {
    if (isString(props.svg)) {
      return props.svg.toLowerCase()
    } else {
      const component = props.svg as Component
      return component.name?.toLowerCase()
    }
  } else {
    return props.ariaLabel
  }
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
    <component v-if="props.svg" :is="props.svg" :aria-label="ariaLabel" />
    <slot v-else />
  </span>
</template>
