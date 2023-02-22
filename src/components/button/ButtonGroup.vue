<script setup lang="ts">
import type { PropType } from 'vue'
import type { Size, Theme, Type } from './button

import '@douyinfe/semi-foundation/button/button.scss'

defineOptions({
  name: 'Button'
})
// const props =
defineProps({
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
  noHorizontalPadding: {
    type: Object as PropType<Boolean | String | Array<String>>,
    default: () => {
      false
    }
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
</script>

<template>
  <div></div>
</template>
