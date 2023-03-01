<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { PropType } from 'vue'
import { useFloating, offset, flip, shift, autoUpdate, arrow } from '@floating-ui/vue'
import type { Placement } from '@floating-ui/vue'
import { useElementHover, useFocusWithin, onClickOutside } from '@vueuse/core'
import { xPlacement, Position } from './tooltip'
import type { HTMLElementTagNameKey, MarginObject } from './tooltip'

import TriangleArrow from './TriangleArrow.vue'
import TriangleArrowVertical from './TriangleArrowVertical.vue'

import '@douyinfe/semi-foundation/tooltip/tooltip.scss'

defineOptions({
  name: 'Tooltip'
})
const props = defineProps({
  autoAdjustOverflow: {
    type: Boolean,
    default: true
  },
  arrowPointAtCenter: {
    type: Boolean,
    default: true
  },
  // content: String
  clickToHide: {
    type: Boolean,
    default: false
  },
  disableFocusListener: {
    type: Boolean,
    default: false
  },
  getPopupContainer: {
    type: String as PropType<HTMLElementTagNameKey>
  },
  margin: {
    type: [Number, Object] as PropType<Number | MarginObject>,
    default: 0
  },
  mouseEnterDelay: {
    type: Number,
    default: 50
  },
  mouseLeaveDelay: {
    type: Number,
    default: 50
  },
  motion: {
    type: Boolean,
    default: true
  },
  position: {
    type: String as PropType<keyof typeof Position>,
    default: 'top'
  },
  prefixCls: {
    type: String,
    default: 'semi-tooltip'
  },
  preventScroll: Boolean,
  rePosKey: [String, Number] as PropType<String | Number>,
  spacing: {
    type: Number,
    default: 8
  },
  showArrow: {
    type: Boolean,
    default: true
  },
  stopPropagation: {
    type: Boolean,
    default: false
  },
  transformFromCenter: {
    type: Boolean,
    default: true
  },
  trigger: {
    type: String as PropType<'hover' | 'focus' | 'click' | 'custom'>,
    default: 'hover'
  },
  visible: {
    type: Boolean,
    default: false
  },
  wrapperClassName: String,
  wrapperId: String,
  zIndex: {
    type: Number,
    default: 1060
  }
})

const trigger = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const contentArrow = ref<HTMLElement | null>(null)

const { x, y, strategy, middlewareData, placement } = useFloating(trigger, content, {
  placement: Position[props.position] as Placement,
  middleware: [offset(8), flip(), shift(), arrow({ element: contentArrow })],
  whileElementsMounted: autoUpdate
})
const contentArrowData = computed(() => middlewareData.value.arrow)
const staticSide = computed(() => {
  return {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right'
  }[placement.value.split('-')[0]] as string
})

const show = ref(false)

const triggerIsHovered = useElementHover(trigger)
const contentIsHovered = useElementHover(content)

const { focused: triggerIsFocused } = useFocusWithin(trigger)

const triggerIsClicked = ref(false)
const contentIsClicked = ref(false)

onClickOutside(trigger, () => {
  triggerIsClicked.value = false
})

onClickOutside(content, () => {
  contentIsClicked.value = false
})
watch(
  () => [
    triggerIsHovered.value,
    contentIsHovered.value,
    triggerIsFocused.value,
    triggerIsClicked.value,
    contentIsClicked.value
  ],
  () => {
    if (
      (props.trigger === 'hover' &&
        (triggerIsHovered.value === true || contentIsHovered.value === true)) ||
      (props.trigger === 'focus' && triggerIsFocused.value === true) ||
      (props.trigger === 'click' &&
        (triggerIsClicked.value === true || contentIsClicked.value === true))
    ) {
      show.value = true
    }
  }
)
</script>

<template>
  <component
    v-if="$slots.default && $slots.default().length === 1"
    :is="$slots.default()[0]"
    ref="trigger"
    style="height: fit-content; width: fit-content"
    @click="triggerIsClicked = true"
  />
  <span
    v-else
    ref="trigger"
    style="height: fit-content; width: fit-content"
    @click="triggerIsClicked = true"
  >
    <slot />
  </span>

  <Transition>
    <div
      v-if="show"
      ref="content"
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
      @click="contentIsClicked = true"
    >
      <slot name="content" />
      {{ props.visible }}
      <br />
      triggerHover: {{ triggerIsHovered }} <br />contetnHover: {{ contentIsHovered }}
      <br />
      triggerFocusWithin: {{ triggerIsFocused }}
      <br />
      triggerClick: {{ triggerIsClicked }} <br />contentClick: {{ contentIsClicked }}

      <TriangleArrow
        v-if="placement.startsWith('top') || placement.startsWith('bottom')"
        ref="contentArrow"
        :style="{
          top: props.arrowPointAtCenter
            ? contentArrowData?.y != null
              ? `${contentArrowData?.y}px`
              : ''
            : '',
          left: props.arrowPointAtCenter
            ? contentArrowData?.x != null
              ? `${contentArrowData.x}px`
              : ''
            : '',
          bottom: props.arrowPointAtCenter ? 'unset' : '',
          right: props.arrowPointAtCenter ? 'unset' : '',
          [staticSide]: '-6px',
          transform: props.arrowPointAtCenter ? 'none' : ''
        }"
      />
      <TriangleArrowVertical
        v-if="placement.startsWith('left') || placement.startsWith('right')"
        ref="contentArrow"
        :style="{
          top: props.arrowPointAtCenter
            ? contentArrowData?.y != null
              ? `${contentArrowData?.y}px`
              : ''
            : '',
          left: props.arrowPointAtCenter
            ? contentArrowData?.x != null
              ? `${contentArrowData.x}px`
              : ''
            : '',
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
