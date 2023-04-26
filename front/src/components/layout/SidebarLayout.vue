<script setup lang="ts">
import type { Complex } from '@/interfaces/Complex'
import { complexToString } from '@/utils/math'
import { increment } from '@/utils/mandelbrot'
import CommandBar from '../sidebar/CommandBar.vue'
</script>

<template>
  <div class="sidebar">
    <div class="info"></div>
    <CommandBar />
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

  div.diagram {
    flex: 0.4;
    background-color: #aaa;
  }
}
</style>
