<script setup lang="ts">
import '@douyinfe/semi-foundation/_portal/portal.scss'

defineOptions({
  name: 'Portal'
})
</script>

<template>
  <teleport to="body">
    <div class="semi-portal">
      <div class="semi-portal-inner">
        <slot />
      </div>
    </div>
  </teleport>
</template>
