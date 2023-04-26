<script setup lang="ts">
import { ref } from 'vue'

const iterationMax = ref(50)
const limit = ref(40)
</script>

<template>
  <div class="command">
    <label>
      <span>Iteration Max: {{ iterationMax }}</span>
      <input type="range" min="1" max="1000" v-model="iterationMax" />
    </label>
    <label>
      <span>Limit: {{ limit }}</span>
      <input type="range" min="1" max="1000" v-model="limit" />
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
