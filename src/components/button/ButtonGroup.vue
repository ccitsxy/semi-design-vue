<script setup lang="ts">
import type { PropType, VNode, HTMLAttributes } from 'vue'
import { provide, h, useSlots, computed } from 'vue'
import type { Size, Theme, Type } from './button'
import { buttonGroupContextKey } from './button'

import '@douyinfe/semi-foundation/button/button.scss'

defineOptions({
  name: 'ButtonGroup'
})
const props = defineProps({
  ariaLabel: {
    type: String as PropType<HTMLAttributes['aria-label']>
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<Size>,
    default: 'default'
  },
  theme: {
    type: String as PropType<Theme>,
    default: 'light'
  },
  type: {
    type: String as PropType<Type>,
    default: 'primary'
  }
})

const disabled = computed(() => props.disabled)
const size = computed(() => props.size)
const type = computed(() => props.type)
provide(buttonGroupContextKey, { disabled, size, type })

const slots = useSlots()
const ButtonGroupLine = () =>
  h('div', {
    class: [
      'semi-button-group-line',
      `semi-button-group-line-${props.theme}`,
      `semi-button-group-line-${props.type}`
    ]
  })
const ButtonGroupWithLine = () => {
  const ButtonGroupWithLine: VNode[] = []
  if (slots.default) {
    slots.default().forEach((e) => {
      ButtonGroupWithLine.push(e)
      ButtonGroupWithLine.push(ButtonGroupLine())
    })
  }
  ButtonGroupWithLine.pop()
  return ButtonGroupWithLine
}
</script>

<template>
  <div class="semi-button-group" role="group" :aria-label="props.ariaLabel">
    <button-group-with-line />
  </div>
</template>
