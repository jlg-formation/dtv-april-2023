<script setup lang="ts">
import { getProfiler } from '@/utils/profiler'
import { ref } from 'vue'

const profiler = getProfiler()
const map = ref(profiler.map)
profiler.obs$.subscribe(() => {
  map.value = new Map(profiler.map)
})
</script>

<template>
  <div class="info">
    <div v-for="[key, value] in map.entries()" :key="key">{{ key }}: {{ value.duration }}</div>
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
