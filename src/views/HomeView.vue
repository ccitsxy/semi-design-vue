<script setup lang="ts">
import { Button } from '@/components/button'
import { Divider } from '@/components/divider'
import { Row } from '@/components/grid'
import { Col } from '@/components/grid'
import { Space } from '@/components/space'
import { ButtonGroup } from '@/components/button'
import { Icon, IconAlarm } from '@/components/icon'
import { Switch } from '@/components/switch'
import { ref } from 'vue'
import { Collapsible } from '@/components/collapsible'
import { Tooltip } from '@/components/tooltip'

const checked = ref(false)
</script>
<template>
  <div class="home">
    <Space :spacing="20" wrap>
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

      <Button size="large">大尺寸</Button>
      <Button size="default">默认尺寸</Button>
      <Button size="small">小尺寸</Button>

      <Button disabled>禁用</Button>
      <Button disabled theme="borderless">无背景禁用</Button>
      <Button disabled theme="light">浅色禁用</Button>
      <Button disabled theme="borderless" type="primary">无背景主要禁用</Button>
      <Button disabled theme="solid" type="warning">深色警告禁用</Button>

      <Button block>块级按钮</Button>
    </Space>

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

    <Button loading>保存</Button>
    <Button loading>删除</Button>
    <Button loading>撤销</Button>
    <Button loading>保存</Button>
    <Button>
      <template #icon>
        <IconAlarm />
      </template>
    </Button>
    <Button :icon="IconAlarm">撤销</Button>

    <ButtonGroup size="large" type="danger">
      <Button>拷贝</Button>
      <Button>查询</Button>
      <Button>剪切</Button>
    </ButtonGroup>

    <Icon :svg="IconAlarm" />

    <Switch v-model="checked" />

    <Divider dashed margin="12">123</Divider>

    <Collapsible :is-open="checked" :collapse-height="60">
      <ul>
        <li>
          <p>Semi Design 以内容优先进行设计。</p>
        </li>
        <li>
          <p>更容易地自定义主题。</p>
        </li>
        <li>
          <p>适用国际化场景。</p>
        </li>
        <li>
          <p>效率场景加入人性化关怀。</p>
        </li>
      </ul>
    </Collapsible>

    <Tooltip position="topLeft" :arrow-point-at-center="false">
      <Button>主要按钮</Button>
      <template #content> Semi Design 以内容优先进行设计。 </template>
    </Tooltip>
  </div>
</template>

<style>
.home {
  display: flex;
  gap: 16px;
  /* padding: 8px; */
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
