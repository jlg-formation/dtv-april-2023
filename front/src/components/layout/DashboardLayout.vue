<script setup lang="ts">
import { board } from '@/class/Board'
import { MandelBrot } from '@/class/MandelBrot'
import { useConfigStore } from '@/stores/config'
import { Subject, debounceTime, switchMap } from 'rxjs'
import { onMounted, ref } from 'vue'

const div = ref<HTMLDivElement>()

const configStore = useConfigStore()

const configStore$ = new Subject<void>()

onMounted(async () => {
  if (div.value === undefined) {
    throw new Error('no div')
  }
  board.attachTo(div.value)

  configStore.$subscribe(() => {
    configStore$.next()
  })

  configStore$
    .pipe(
      debounceTime(300),
      switchMap(() => {
        board.setConfig({
          iterationMax: configStore.iterationMax,
          limit: configStore.limit,
          colorScheme: configStore.colorScheme
        })
        return board.draw()
      })
    )
    .subscribe()

  board.setConfig({
    fractal: new MandelBrot(),
    iterationMax: configStore.iterationMax,
    limit: configStore.limit
  })
  await board.draw()
})
</script>

<template>
  <div ref="div"></div>
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
