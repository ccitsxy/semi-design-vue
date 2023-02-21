<script setup lang="ts">
import type { PropType, Component } from 'vue'
import type { HtmlType, Size, Theme, Type } from './interface'

import '@douyinfe/semi-foundation/button/button.scss'

defineOptions({
  name: 'Button'
})
const props = defineProps({
  ariaLabel: {
    type: String
  },
  ariaDisabled: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  htmlType: {
    type: String as PropType<HtmlType>,
    default: 'button'
  },
  icon: {
    type: Object as PropType<Component>
  },
  iconPosition: {
    type: String as PropType<'left' | 'right'>,
    default: 'left'
  },
  loading: {
    type: Boolean,
    default: false
  },
  // noHorizontalPadding: {
  //   type: Object as PropType<Boolean | String | Array<String>>,
  //   default: () => {
  //     false
  //   }
  // },
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

const handleContentClick = (e: Event) => {
  props.disabled && e.stopPropagation()
}
</script>

<template>
  <button
    :class="[
      'semi-button',
      disabled ? 'semi-button-disabled' : `semi-button-${props.type}`,
      `semi-button-size-${props.size}`,
      `semi-button-${props.theme}`,
      { 'semi-button-block': props.block },
      { 'semi-button-with-icon': props.icon || $slots.icon },
      { 'semi-button-with-icon-only': !$slots.default },
      { 'semi-button-loading': props.loading }
    ]"
    :type="props.htmlType"
    :aria-disabled="props.ariaDisabled"
  >
    <span class="semi-button-content" @click="handleContentClick">
      <template v-if="props.iconPosition === 'left'">
        <component :is="props.icon" v-if="props.icon" />
        <slot v-else name="icon" />
        <span class="semi-button-content-right">
          <slot />
        </span>
      </template>
      <template v-else>
        <span class="semi-button-content-left">
          <slot />
        </span>
        <component :is="props.icon" v-if="props.icon" />
        <slot v-else name="icon" />
      </template>
    </span>
  </button>
</template>
