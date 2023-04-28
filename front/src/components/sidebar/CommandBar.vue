<script setup lang="ts">
import { useConfigStore } from '@/stores/config'
import { colorChoices } from '@/utils/color'

const configStore = useConfigStore()

const opts: string[] = Object.keys(colorChoices)

const onSelect = (e: Event) => {
  console.log('e: ', e)
  const selectElt = e.target
  console.log('selectElt: ', selectElt)
  if (!(e.target instanceof HTMLSelectElement)) {
    return
  }
  configStore.colorScheme = e.target.value
}
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
    <label>
      <span>Color scheme: </span>
      <select @change="onSelect" :value="opts[1]">
        <option :value="opt" v-for="opt in opts" :key="opt">{{ opt }}</option>
      </select>
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

    select {
      border: 0.1em solid black;
      border-radius: 0.3em;
      font-size: 1.1em;
      padding: 0.5em 1em;
    }
  }
}
</style>
