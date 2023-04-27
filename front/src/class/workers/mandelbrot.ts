import type { WorkerInputData } from '@/interfaces/WorkerInputData'
import type { WorkerOutputData } from '@/interfaces/WorkerOutputData'
import { getMandelbrotNumber } from '@/utils/mandelbrot'

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
