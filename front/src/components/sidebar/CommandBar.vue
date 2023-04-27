<script setup lang="ts">
import { useConfigStore } from '@/stores/config'

const configStore = useConfigStore()
</script>

<template>
  <div class="command">
    <label>
      <span>Iteration Max: {{ configStore.iterationMax }}</span>
      <input type="range" min="1" max="1000" v-model="configStore.iterationMax" />
    </label>
    <label>
      <span>Limit: {{ configStore.limit }}</span>
      <input type="range" min="0.01" max="5" step="0.01" v-model="configStore.limit" />
    </label>
  </div>
</template>

<style scoped lang="scss">
div.command {
  padding: 0.5em;
  flex: 0.3;
  display: flex;
  flex-flow: column;
  gap: 1em;

  label {
    display: flex;
    flex-flow: column;
  }
}
</style>
