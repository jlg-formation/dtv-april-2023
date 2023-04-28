import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore('config', () => {
  const iterationMax = ref(30)
  const limit = ref(3)

  return { iterationMax, limit }
})
