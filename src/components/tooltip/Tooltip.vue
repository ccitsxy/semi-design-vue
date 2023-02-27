<script setup lang="ts">
import TriangleArrow from './TriangleArrow.vue'

import '@douyinfe/semi-foundation/tooltip/tooltip.scss'

defineOptions({
  name: 'Tooltip'
})
</script>

<template>
  <span style="display: inline-block">
    <slot />
  </span>
  <div class="semi-tooltip-wrapper semi-tooltip-wrapper-show semi-tooltip-with-arrow">
    <slot name="content" />
    <TriangleArrow />
  </div>
</template>
