<script setup lang="ts">
import Button from '@/components/button/Button.vue'
import Divider from '@/components/divider/Divider.vue'
</script>
<template>
  <div class="home">
    <Button>主要按钮</Button>
    <Button type="secondary">次要按钮</Button>
    <Button type="tertiary">第三按钮</Button>
    <Button type="warning">警告按钮</Button>
    <Button type="danger">危险按钮</Button>
    <Button theme="solid" type="primary">深色主要</Button>
    <Button theme="solid" type="secondary">深色次要</Button>
    <Button theme="solid" type="tertiary">深色第三</Button>
    <Button theme="solid" type="warning">深色警告</Button>
    <Button theme="solid" type="danger">深色危险</Button>
    <Button theme="borderless" type="primary">主要</Button>
    <Button theme="borderless" type="secondary">次要</Button>
    <Button theme="borderless" type="tertiary">第三</Button>
    <Button theme="borderless" type="warning">警告</Button>
    <Button theme="borderless" type="danger">危险</Button>
    <Button block>块级按钮</Button>
    <Button size="large">大尺寸</Button>
    <Button size="default">默认尺寸</Button>
    <Button size="small">小尺寸</Button>

    <!-- <Button :icon="IconCamera" aria-label="截屏" />
    <Button disabled :icon="IconCamera" aria-label="截屏" />
    <Button type="primary" :icon="IconCamera" aria-label="截屏" />
    <Button type="secondary" :icon="IconCamera" aria-label="截屏" />
    <Button type="warning" :icon="IconCamera" aria-label="截屏" />
    <Button type="danger" :icon="IconCamera" aria-label="截屏" />
    <Button :icon="IconCamera" theme="solid" aria-label="截屏" />
    <Button :icon="IconCamera" theme="light" aria-label="截屏" /> -->
    <!-- <Button icon="<IconSidebar />" theme="solid">收起</Button>
    <Button icon="<IconChevronDown />" theme="solid" icon-position="right">展开选项</Button> -->

    <Button disabled>禁用</Button>
    <Button disabled theme="borderless">无背景禁用</Button>
    <Button disabled theme="light">浅色禁用</Button>
    <Button disabled theme="borderless" type="primary">无背景主要禁用</Button>
    <Button disabled theme="solid" type="warning">深色警告禁用</Button>

    <Divider dashed margin="12">123</Divider>
  </div>
</template>

<style>
.home {
  display: flex;
  gap: 16px;
  padding: 8px;
  flex-wrap: wrap;
}
</style>
