<script setup lang="ts">
import { Board } from '@/class/Board'
import { MandelBrot } from '@/class/MandelBrot'
import { useConfigStore } from '@/stores/config'
import { onMounted, ref } from 'vue'
import { Subject, debounceTime, tap } from 'rxjs'

const canvas = ref<HTMLCanvasElement>()

const configStore = useConfigStore()

const configStore$ = new Subject<void>()

onMounted(() => {
  if (canvas.value === undefined) {
    throw new Error('no canvas')
  }
  const board = new Board(canvas.value)
  board.setConfig({
    fractal: new MandelBrot(),
    iterationMax: configStore.iterationMax,
    limit: configStore.limit
  })
  board.draw()

  configStore.$subscribe(() => {
    configStore$.next()
  })

  configStore$
    .pipe(
      debounceTime(300),
      tap(() => {
        board.setConfig({
          iterationMax: configStore.iterationMax,
          limit: configStore.limit
        })
        board.draw()
      })
    )
    .subscribe()
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
