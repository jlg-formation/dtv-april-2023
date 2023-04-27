<script setup lang="ts">
import { board } from '@/class/Board'
import type { Snapshot } from '@/interfaces/Snapshot'
import { ref } from 'vue'

const snapshots = ref<Snapshot[]>([])

const add = () => {
  console.log('add click')
  const snapshot = board.takeSnapshot()
  console.log('snapshot: ', snapshot)
  snapshots.value.push(snapshot)
}

const showImage = async (snapshot: Snapshot) => {
  try {
    console.log('show image')
    board.config.viewPort = { ...snapshot.viewPort }
    await board.draw()
  } catch (err) {
    console.log('err: ', err)
  }
}
</script>

<template>
  <div class="gallery">
    <div class="button">
      <button @click="add">Memoriser</button>
    </div>
    <div class="slider">
      <div class="slider-item" v-for="snapshot of snapshots" :key="snapshot.id">
        <!-- <div>x: {{ snapshot.viewPort.x }}</div>
        <div>x: {{ snapshot.viewPort.y }}</div>
        <div>x: {{ snapshot.viewPort.width }}</div>
        <div>x: {{ snapshot.viewPort.height }}</div> -->
        <img :src="snapshot.imageDataURL" alt="image" @click="showImage(snapshot)" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
div.gallery {
  height: 5em;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div.button {
    height: 100%;
    display: flex;
    padding: 1em;
    button {
      height: 100%;
    }
  }

  div.slider {
    height: 5em;
    background-color: #ddd;
    flex: 1;
    display: flex;

    div.slider-item {
      img {
        height: 100%;
      }
    }
  }
}
</style>
