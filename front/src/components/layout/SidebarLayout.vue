<script setup lang="ts">
import type { Complex } from '@/interfaces/Complex'
import { add, complexToString } from '@/utils/math'

const a: Complex = { x: 12, y: 13 }
const b: Complex = { x: 3, y: 5 }
const c = add(a, b)
</script>

<template>
  <div class="sidebar">
    <div class="info">
      {{ complexToString(a) }} + {{ complexToString(b) }} = {{ complexToString(c) }}
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
