import type { Complex } from '@/interfaces/Complex'
import type { WorkerInputData } from '@/interfaces/WorkerInputData'
import type { WorkerOutputData } from '@/interfaces/WorkerOutputData'

const add = (a: Complex, b: Complex): Complex => {
  return {
    x: a.x + b.x,
    y: a.y + b.y
  }
}

const multiply = (a: Complex, b: Complex): Complex => {
  return {
    x: a.x * b.x - a.y * b.y,
    y: a.x * b.y + a.y * b.x
  }
}

const module = (a: Complex): number => {
  return Math.sqrt(a.x * a.x + a.y * a.y)
}

const increment = (z: Complex, c: Complex): Complex => {
  return add(multiply(z, z), c)
}

const getMandelbrotNumber = (c: Complex, maxIteration: number, limit: number): number => {
  let z: Complex = { x: 0, y: 0 }
  for (let i = 0; i < maxIteration; i++) {
    z = increment(z, c)
    if (module(z) > limit) {
      return i
    }
  }
  return maxIteration
}

const buildArray = (wid: WorkerInputData) => {
  const array: number[][] = []
  const { i, totalWorker, width, height, viewPort, iterationMax, limit } = wid
  for (let x = i * (width / totalWorker); x < (i + 1) * (width / totalWorker); x++) {
    const line = []
    for (let y = 0; y < height; y++) {
      const xx = viewPort.x + (x * viewPort.width) / width
      const yy = viewPort.y + (y * viewPort.height) / height
      const mandelbrotNbr = getMandelbrotNumber({ x: xx, y: yy }, iterationMax, limit)
      line.push(mandelbrotNbr)
    }
    array.push(line)
  }
  return array
}

self.onmessage = (e: MessageEvent<WorkerInputData>) => {
  const array = buildArray(e.data)
  const workerOutputData: WorkerOutputData = {
    array,
    i: e.data.i
  }
  postMessage(workerOutputData)
}
