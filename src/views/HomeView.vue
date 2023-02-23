<script setup lang="ts">
import Button from '@/components/button/Button.vue'
import Divider from '@/components/divider/Divider.vue'
import Row from '@/components/grid/Row.vue'
import Col from '@/components/grid/Col.vue'
import Space from '@/components/space/Space.vue'
import Text from '@/components/typography/Text.vue'
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
    <Button :icon="IconCamera" theme="light" aria-label="截屏" />
    <Button :icon="IconSidebar" theme="solid">收起</Button>
    <Button :icon="IconChevronDown" theme="solid" icon-position="right">展开选项</Button> -->

    <Button disabled>禁用</Button>
    <Button disabled theme="borderless">无背景禁用</Button>
    <Button disabled theme="light">浅色禁用</Button>
    <Button disabled theme="borderless" type="primary">无背景主要禁用</Button>
    <Button disabled theme="solid" type="warning">深色警告禁用</Button>

    <Divider dashed margin="12">123</Divider>

    <div className="grid">
      <Row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32, xl: 32, xxl: 40 }">
        <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
          <div className="col-content">Col</div>
        </Col>
        <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }"
          ><div className="col-content">Col</div>
        </Col>
        <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
          <div className="col-content">Col</div>
        </Col>
      </Row>
    </div>

    <Space :spacing="20">
      <Button type="secondary">次要</Button>
      <Button type="tertiary">第三</Button>
      <Button type="warning">警告</Button>
    </Space>

    <Text>Text</Text>
  </div>
</template>

<style>
.home {
  display: flex;
  gap: 16px;
  padding: 8px;
  flex-wrap: wrap;
}

.grid {
  width: 100%;
  font-size: 14px;
}

.grid .semi-row,
.grid .semi-row-flex {
  text-align: center;
}

.grid .semi-row-flex .semi-col,
.grid .semi-row .semi-col {
  min-height: 30px;
  line-height: 30px;
  background: var(--semi-color-primary-light-default);
  outline: 1px solid var(--semi-color-primary-light-active);
}

.grid.grid-gutter .semi-col .col-content,
.grid.grid-gutter .semi-col .gutter-box {
  background: var(--semi-color-primary-light-hover);
}

.grid-flex .semi-row-flex {
  height: 50px;
  background: var(--semi-color-fill-0);
}
</style>
