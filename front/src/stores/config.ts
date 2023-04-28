import { colorChoices } from '@/utils/color'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore('config', () => {
  const iterationMax = ref(30)
  const limit = ref(3)
  const colorScheme = ref(Object.keys(colorChoices)[1])

  return { iterationMax, limit, colorScheme }
})
