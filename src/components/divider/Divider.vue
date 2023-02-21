<script setup lang="ts">
import type { PropType } from 'vue'

import '@douyinfe/semi-foundation/divider/divider.scss'

defineOptions({
  name: 'Divider'
})
const props = defineProps({
  align: {
    type: String as PropType<'left' | 'right' | 'center'>,
    default: 'center'
  },
  dashed: {
    type: Boolean,
    default: false
  },
  layout: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal'
  },
  margin: [Number, String] as PropType<Number | String>
})
</script>

<template>
  <div
    :class="[
      'semi-divider',
      `semi-divider-${props.layout}`,
      props.dashed ? 'semi-divider-dashed' : '',
      $slots.default ? `semi-divider-with-text semi-divider-with-text-${props.align}` : ``
    ]"
    :style="{
      marginLeft: `${props.layout === 'vertical' ? props.margin : ''}px`,
      marginRight: `${props.layout === 'vertical' ? props.margin : ''}px`,
      marginTop: `${props.layout === 'horizontal' ? props.margin : ''}px`,
      marginBottom: `${props.layout === 'horizontal' ? props.margin : ''}px`
    }"
  >
    <span class="semi-divider_inner-text">
      <slot />
    </span>
  </div>
</template>
