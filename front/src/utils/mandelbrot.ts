import type { Complex } from '@/interfaces/Complex'
import { add, multiply, module } from './math'

export const increment = (z: Complex, c: Complex): Complex => {
  return add(multiply(z, z), c)
}

export const getMandelbrotNumber = (c: Complex, maxIteration: number, limit: number): number => {
  let z: Complex = { x: 0, y: 0 }
  for (let i = 0; i < maxIteration; i++) {
    z = increment(z, c)
    if (module(z) > limit) {
      return i
    }
  }
  return maxIteration
}
