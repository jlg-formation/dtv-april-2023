<script setup lang="ts">
import CommandBar from '../sidebar/CommandBar.vue'
import InfoBar from '../sidebar/InfoBar.vue'
import DocumentationBar from '../sidebar/DocumentationBar.vue'
</script>

<template>
  <div class="sidebar">
    <DocumentationBar />
    <CommandBar />
    <InfoBar />
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
}
</style>
