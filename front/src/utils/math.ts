import type { Complex } from '@/interfaces/Complex'

export const add = (a: Complex, b: Complex): Complex => {
  return {
    x: a.x + b.x,
    y: a.y + b.y
  }
}

export const multiply = (a: Complex, b: Complex): Complex => {
  return {
    x: a.x * b.x - a.y * b.y,
    y: a.x * b.y + a.y * b.x
  }
}

export const module = (a: Complex): number => {
  return Math.sqrt(a.x * a.x + a.y * a.y)
}

export const complexToString = (a: Complex): string => {
  return `(${a.x} + i${a.y})`
}
