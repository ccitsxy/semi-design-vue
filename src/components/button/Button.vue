<script setup lang="ts">
import type { PropType, Component, CSSProperties } from 'vue'
import { inject, computed, h, onMounted, useSlots } from 'vue'
import { type HtmlType, type Size, type Theme, type Type, buttonGroupContextKey } from './button'
import SpinIcon from '../spin/SpinIcon.vue'

import '@douyinfe/semi-foundation/button/button.scss'
import '@douyinfe/semi-foundation/button/iconButton.scss'
import { Icon } from '../icon'

defineOptions({
  name: 'Button'
})
const props = defineProps({
  ariaLabel: String,
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
  icon: [String, Object] as PropType<String | Component>,
  iconPosition: {
    type: String as PropType<'left' | 'right'>,
    default: 'left'
  },
  loading: {
    type: Boolean,
    default: false
  },
  noHorizontalPadding: {
    type: [Boolean, String, Array<String>] as PropType<Boolean | String | Array<String>>,
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

const { disabled, size, type } = inject(buttonGroupContextKey, {
  disabled: computed(() => props.disabled),
  size: computed(() => props.size),
  type: computed(() => props.type)
})

const buttonStyle = computed(() => {
  const style: CSSProperties = {}
  if (Array.isArray(props.noHorizontalPadding)) {
    props.noHorizontalPadding.includes('left') && (style.paddingLeft = 0)
    props.noHorizontalPadding.includes('right') && (style.paddingRight = 0)
  } else if (props.noHorizontalPadding === true) {
    style.paddingLeft = 0
    style.paddingRight = 0
  } else if (typeof props.noHorizontalPadding === 'string') {
    props.noHorizontalPadding === 'left' && (style.paddingLeft = 0)
    props.noHorizontalPadding === 'right' && (style.paddingRight = 0)
  }
  return style
})

const slots = useSlots()
const ButtonIcon = () => {
  if (props.loading && !props.disabled) {
    return h(SpinIcon)
  } else if (props.icon) {
    return h(Icon, { svg: props.icon })
  } else if (slots.icon) {
    return slots.icon()
  }
}

onMounted(() => {})
</script>

<template>
  <button
    :class="[
      'semi-button',
      disabled ? 'semi-button-disabled' : `semi-button-${type}`,
      `semi-button-size-${size}`,
      `semi-button-${props.theme}`,
      props.block ? 'semi-button-block' : '',
      props.loading || props.icon || !$slots.icon ? 'semi-button-with-icon' : '',
      !$slots.default && (props.icon || $slots.icon || props.loading)
        ? 'semi-button-with-icon-only'
        : '',
      props.loading && !props.disabled ? 'semi-button-loading' : ''
    ]"
    :style="buttonStyle"
    :type="props.htmlType"
    :aria-disabled="props.ariaDisabled"
    :aria-label="props.ariaLabel"
  >
    <span class="semi-button-content">
      <template v-if="!$slots.default && (props.icon || $slots.icon || props.loading)">
        <button-icon />
      </template>

      <template v-if="!$slots.icon && !props.icon && !props.loading">
        <slot />
      </template>

      <template v-if="$slots.default && (props.icon || $slots.icon || props.loading)">
        <template v-if="props.iconPosition === 'left'">
          <button-icon />
          <span class="semi-button-content-right">
            <slot />
          </span>
        </template>

        <template v-if="props.iconPosition === 'right'">
          <span class="semi-button-content-left">
            <slot />
          </span>

          <button-icon />
        </template>
      </template>
    </span>
  </button>
</template>

<style lang="scss">
@keyframes #{$prefix}-animation-rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
