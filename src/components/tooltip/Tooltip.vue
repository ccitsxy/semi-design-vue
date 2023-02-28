<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFloating, offset, flip, shift, autoUpdate, arrow } from '@floating-ui/vue'

import TriangleArrow from './TriangleArrow.vue'
import TriangleArrowVertical from './TriangleArrowVertical.vue'

import '@douyinfe/semi-foundation/tooltip/tooltip.scss'

defineOptions({
  name: 'Tooltip'
})
const props = defineProps({
  arrowPointAtCenter: {
    type: Boolean,
    default: true
  },
  show: {
    type: Boolean,
    default: false
  }
})

const reference = ref<HTMLElement | null>(null)
const floating = ref<HTMLElement | null>(null)
const floatingArrow = ref<HTMLElement | null>(null)
const { x, y, strategy, middlewareData, placement } = useFloating(reference, floating, {
  middleware: [offset(8), flip(), shift(), arrow({ element: floatingArrow })],
  whileElementsMounted: autoUpdate
})

const arrowData = computed(() => middlewareData.value.arrow)

const xPlacement = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
  'top-start': 'topLeft',
  'bottom-start': 'bottomLeft',
  'left-start': 'leftTop',
  'right-start': 'rightTop',
  'top-end': 'topRight',
  'bottom-end': 'bottomRight',
  'left-end': 'leftBottom',
  'right-end': 'rightBottom'
}

const staticSide = computed(() => {
  return {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right'
  }[placement.value.split('-')[0]] as string
})
</script>

<template>
  <span ref="reference" style="height: fit-content; width: fit-content">
    <slot />
  </span>

  <Transition>
    <div
      ref="floating"
      class="semi-tooltip-wrapper semi-tooltip-wrapper-show"
      :style="{
        position: strategy,
        top: `${y ?? 0}px`,
        left: `${x ?? 0}px`,
        'transform-origin': '50% 100%',
        opacity: 1,
        'animation-fill-mode': 'forwards'
      }"
      :x-placement="xPlacement[placement]"
      role="tooltip"
    >
      <slot name="content" />
      {{ placement }}

      <TriangleArrow
        v-if="placement.startsWith('top') || placement.startsWith('bottom')"
        ref="floatingArrow"
        :style="{
          top: props.arrowPointAtCenter ? (arrowData?.y != null ? `${arrowData?.y}px` : '') : '',
          left: props.arrowPointAtCenter ? (arrowData?.x != null ? `${arrowData.x}px` : '') : '',
          bottom: props.arrowPointAtCenter ? 'unset' : '',
          right: props.arrowPointAtCenter ? 'unset' : '',
          [staticSide]: '-6px',
          transform: props.arrowPointAtCenter ? 'none' : ''
        }"
      />
      <TriangleArrowVertical
        v-if="placement.startsWith('left') || placement.startsWith('right')"
        ref="floatingArrow"
        :style="{
          top: props.arrowPointAtCenter ? (arrowData?.y != null ? `${arrowData?.y}px` : '') : '',
          left: props.arrowPointAtCenter ? (arrowData?.x != null ? `${arrowData.x}px` : '') : '',
          bottom: props.arrowPointAtCenter ? 'unset' : '',
          right: props.arrowPointAtCenter ? 'unset' : '',
          [staticSide]: '-6px'
        }"
      />
    </div>
  </Transition>
</template>

<style scoped lang="scss">
$module: #{$prefix}-tooltip;
.v-enter-active {
  animation: #{$module}-zoomIn 100ms cubic-bezier(0.215, 0.61, 0.355, 1);
}

.v-leave-active {
  animation: #{$module}-zoomOut 100ms cubic-bezier(0.215, 0.61, 0.355, 1);
}
</style>
