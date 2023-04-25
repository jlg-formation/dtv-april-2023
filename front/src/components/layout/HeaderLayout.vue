<script setup lang="ts"></script>

<template>
  <div>
    <a href="#"> Mandelbrot dataviz </a>
    <font-awesome-icon icon="fa-solid fa-bars" />
  </div>
</template>

<style scoped lang="scss">
div {
  height: 3em;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5em;
  font-size: 1.3em;

  a {
    text-decoration: inherit;
    color: inherit;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
