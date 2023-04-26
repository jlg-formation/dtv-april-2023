import type { Complex } from '@/interfaces/Complex'

export const add = (a: Complex, b: Complex): Complex => {
  return {
    x: a.x + b.x,
    y: a.y + b.y
  }
}

export const complexToString = (a: Complex): string => {
  return `${a.x} + i${a.y}`
}
