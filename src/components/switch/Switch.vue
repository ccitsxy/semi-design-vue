<script setup lang="ts">
import type { PropType, HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { Spin } from '../spin'

import '@douyinfe/semi-foundation/switch/switch.scss'

defineOptions({
  name: 'Switch'
})
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  ariaLabel: String as PropType<HTMLAttributes['aria-label']>,
  ariaLabelledby: String as PropType<HTMLAttributes['aria-labelledby']>,
  // checked: {
  //   type: Boolean,
  //   default: false
  // },
  checkedText: String,
  // defaultChecked: {
  //   type: Boolean,
  //   default: false
  // },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<'large' | 'default' | 'small'>,
    default: 'default'
  },
  uncheckedText: String
})
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value: boolean) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div
    :class="[
      'semi-switch',
      props.modelValue ? 'semi-switch-checked' : '',
      `semi-switch-${props.size}`,
      props.loading ? 'semi-switch-loading' : ''
    ]"
  >
    <spin
      v-if="props.loading"
      wrapper-class-name="semi-switch-loading-spin"
      :size="props.size === 'default' ? 'middle' : props.size"
    />
    <div v-else class="semi-switch-knob" aria-hidden="true" />
    <div
      v-if="props.checkedText && props.modelValue && props.size !== 'small'"
      class="semi-switch-checked-text"
    >
      {{ props.checkedText }}
    </div>
    <div
      v-if="props.uncheckedText && !props.modelValue && props.size !== 'small'"
      class="semi-switch-unchecked-text"
    >
      {{ props.uncheckedText }}
    </div>
    <input
      v-model="value"
      type="checkbox"
      class="semi-switch-native-control"
      role="switch"
      :aria-checked="props.modelValue"
      :aria-disabled="props.disabled"
    />
  </div>
</template>
