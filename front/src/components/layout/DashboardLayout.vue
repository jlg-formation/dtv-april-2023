<script setup lang="ts">
import { Board } from '@/class/Board'
import { MandelBrot } from '@/class/MandelBrot'
import { onMounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement>()

onMounted(() => {
  if (canvas.value === undefined) {
    throw new Error('no canvas')
  }
  const board = new Board(canvas.value)
  board.setConfig({
    fractal: new MandelBrot()
  })
  board.draw()
})
</script>

<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style scoped lang="scss">
div {
  flex: 1;
  border: 0.01em solid black;
  display: flex;

  canvas {
    background-color: white;
    width: 100%;
    height: 100%;
  }
}
</style>
