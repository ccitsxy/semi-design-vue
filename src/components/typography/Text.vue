<script setup lang="ts">
import type { PropType } from 'vue'
import type { HTMLElementTagName } from './typography'

defineOptions({
  name: 'Text'
})
const props = defineProps({
  component: {
    type: String as PropType<HTMLElementTagName>,
    default: 'span'
  },
  code: Boolean,
  copyable: {
    type: Boolean,
    default: false
  },
  delete: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  ellipsis: {
    type: Boolean,
    default: false
  },
  // icon:{
  //   type: Boolean,
  //   default: false
  // }
  link: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <component :is="props.component">
    <slot />
  </component>
</template>
