import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore('config', () => {
  const iterationMax = ref(30)
  const limit = ref(40)

  return { iterationMax, limit }
})
