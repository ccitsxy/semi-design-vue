<script setup lang="ts">
import type { PropType, CSSProperties, Component } from 'vue'
import type { SpinSize } from './spin'
import SpinIcon from './SpinIcon.vue'

import '@douyinfe/semi-foundation/spin/spin.scss'

defineOptions({
  name: 'Spin'
})
const props = defineProps({
  childStyle: Object as PropType<CSSProperties>,
  delay: {
    type: Number,
    default: 0
  },
  indicator: [String, Object] as PropType<String | Component>,
  size: {
    type: String as PropType<SpinSize>,
    default: 'middle'
  },
  spinning: {
    type: Boolean,
    default: true
  },
  tip: [String, Object] as PropType<String | Component>,
  wrapperClassName: String
})
</script>

<template>
  <div :class="['semi-spin', `semi-spin-${props.size}`, props.wrapperClassName]">
    <div v-if="props.spinning" class="semi-spin-wrapper">
      <div v-if="props.indicator">
        <component :is="props.indicator" />
      </div>
      <slot v-else-if="$slots.indicator" name="indicator" />
      <SpinIcon v-else />

      <div v-if="props.tip">
        <component :is="props.tip" />
      </div>
      <slot v-else name="tip" />

      <div class="semi-spin-children" :style="props.childStyle">
        <slot />
      </div>
    </div>
  </div>
</template>
