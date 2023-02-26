<script setup lang="ts">
import { computed, type PropType, type VNode } from 'vue'
import { provide, h, useSlots } from 'vue'
import { type Size, type Theme, type Type, buttonGroupContextKey } from './button'

import '@douyinfe/semi-foundation/button/button.scss'

defineOptions({
  name: 'ButtonGroup'
})
const props = defineProps({
  ariaLabel: {
    type: String
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
  <div class="semi-button-group" role="group">
    <button-group-with-line />
  </div>
</template>
