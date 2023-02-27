<script setup lang="ts">
import type { PropType, HTMLAttributes, CSSProperties } from 'vue'
import { watch, shallowRef, computed } from 'vue'
import { useElementSize } from '@vueuse/core'

import '@douyinfe/semi-foundation/collapsible/collapsible.scss'

defineOptions({
  name: 'Collapsible'
})
const props = defineProps({
  collapseHeight: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 250
  },
  fade: {
    type: Boolean,
    default: false
  },
  isOpen: {
    type: Boolean,
    default: false
  },
  // keepDOM: {
  //   type: Boolean,
  //   default: false
  // },
  motion: {
    type: Boolean,
    default: true
  },
  // reCalcKey: [Number, String] as PropType<Number|String>,
  id: String as PropType<HTMLAttributes['id']>
})

watch(
  () => props.isOpen,
  () => {
    isTransitioning.value = true
  }
)
const isTransitioning = shallowRef(false)
const handleTransitionEnd = () => {
  isTransitioning.value = false
}

const el = shallowRef<HTMLElement | null>(null)
const { height } = useElementSize(el)

const wrapperStyle = computed<CSSProperties>(() => {
  return {
    overflow: 'hidden',
    height: props.isOpen ? `${height.value}px` : `${props.collapseHeight}px`,
    opacity: props.isOpen || !props.fade || props.collapseHeight !== 0 ? 1 : 0,
    transitionDuration: `${props.motion && isTransitioning.value ? props.duration : 0}ms`
  }
})
</script>

<template>
  <div
    :class="['semi-collapsible-wrapper', props.motion && true ? 'semi-collapsible-transition' : '']"
    :id="props.id"
    :style="wrapperStyle"
    @transitionend="handleTransitionEnd()"
  >
    <div ref="el" style="overflow: hidden">
      <slot />
    </div>
  </div>
</template>
