<script setup lang="ts">
import type { Complex } from '@/interfaces/Complex'
import { complexToString, multiply } from '@/utils/math'

const a: Complex = { x: 2, y: 3 }
const b: Complex = { x: 1, y: 2 }
const c = multiply(a, b)
</script>

<template>
  <div class="sidebar">
    <div class="info">
      {{ complexToString(a) }} * {{ complexToString(b) }} = {{ complexToString(c) }}
    </div>
    <div class="command"></div>
    <div class="diagram"></div>
  </div>
</template>

<style scoped lang="scss">
div.sidebar {
  width: 20em;
  border: 0.02em solid black;
  display: flex;
  flex-flow: column;
  justify-content: space-between;

  div.info {
    flex: 0.3;
    background-color: #ccc;
  }
  div.command {
    flex: 0.3;
    background-color: #bbb;
  }
  div.diagram {
    flex: 0.4;
    background-color: #aaa;
  }
}
</style>
