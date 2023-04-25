<script setup lang="ts"></script>

<template>
  <div>
    <div class="button">
      <button>Memoriser</button>
    </div>
    <div class="slider"></div>
  </div>
</template>

<style scoped lang="scss">
div {
  height: 5em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    height: 100%;
  }

  div.button {
    padding: 1em;
  }

  div.slider {
    background-color: #ddd;
    flex: 1;
  }
}
</style>
