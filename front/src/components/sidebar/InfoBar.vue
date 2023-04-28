<script setup lang="ts">
import { getProfiler } from '@/utils/profiler'
import { ref } from 'vue'
import { version } from '../../../package.json'

const profiler = getProfiler()
const map = ref(profiler.map)
profiler.obs$.subscribe(() => {
  map.value = new Map(profiler.map)
})
</script>

<template>
  <div class="info">
    <div><b>Informations état système</b></div>
    <div>version {{ version }}</div>
    <div v-for="[key, value] in map.entries()" :key="key" title="Durée d'execution de fonction">
      profile {{ key }}: {{ value.duration }}ms
    </div>
  </div>
</template>

<style scoped lang="scss">
div.info {
  padding: 0.5em;
  flex: 0.3;
  display: flex;
  flex-flow: column;
  gap: 1em;
}
</style>
