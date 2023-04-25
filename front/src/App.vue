<script setup lang="ts">
import HeaderLayout from './components/layout/HeaderLayout.vue'
import GalleryLayout from './components/layout/GalleryLayout.vue'
import SidebarLayout from './components/layout/SidebarLayout.vue'
import DashboardLayout from './components/layout/DashboardLayout.vue'
</script>

<template>
  <HeaderLayout />
  <GalleryLayout />
  <div class="content">
    <SidebarLayout />
    <DashboardLayout />
  </div>
</template>

<style scoped></style>
