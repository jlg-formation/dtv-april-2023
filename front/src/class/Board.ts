import { profile } from '@/decorators/profile'
import type { ViewPort } from '@/interfaces/ViewPort'
import { getColor } from '@/utils/color'
import { getMandelbrotNumber } from '@/utils/mandelbrot'
import { getContext, move, zoom } from '@/utils/misc'
import { MandelBrot } from './MandelBrot'

export interface BoardConfig {
  fractal: MandelBrot
  iterationMax: number
  limit: number
  viewPort: ViewPort
}

export class Board {
  config: BoardConfig = {
    fractal: new MandelBrot(),
    viewPort: {
      x: -2.5,
      y: -1.5,
      width: 5,
      height: 3
    },
    iterationMax: 1,
    limit: 2
  }

  workers: Worker[] = []

  constructor(readonly canvas: HTMLCanvasElement) {
    const rect = this.canvas.getBoundingClientRect()
    console.log('rect: ', rect)
    this.canvas.width = rect.width
    this.canvas.height = rect.height
    this.config.viewPort.height =
      (this.config.viewPort.width * this.canvas.height) / this.canvas.width

    this.setActions()
    this.createWorkers()
  }

  createWorkers() {
    for (let i = 0; i < window.navigator.hardwareConcurrency; i++) {
      this.workers.push(new Worker(new URL('./workers/mandelbrot.ts', import.meta.url)))
    }
  }

  @profile()
  draw() {
    for (let i = 0; i < this.workers.length; i++) {
      const worker = this.workers[i]
      worker.postMessage('coucou')
    }
    const width = this.canvas.width
    console.log('width: ', width)
    // const width = 10
    const height = this.canvas.height
    console.log('height: ', height)
    // const height = 20
    const ctx = getContext(this.canvas)

    const iterationMax = this.config.iterationMax
    const limit = this.config.limit

    const imageData = ctx.getImageData(0, 0, width, height)
    const data = imageData.data
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const index = (y * width + x) * 4

        const xx = this.config.viewPort.x + (x * this.config.viewPort.width) / width
        const yy = this.config.viewPort.y + (y * this.config.viewPort.height) / height

        const mandelbrotNbr = getMandelbrotNumber({ x: xx, y: yy }, iterationMax, limit)
        const [red, green, blue] = getColor(mandelbrotNbr, iterationMax)
        data[index] = red
        data[index + 1] = green
        data[index + 2] = blue
        data[index + 3] = 255
      }
    }
    ctx.putImageData(imageData, 0, 0)
  }

  setActions() {
    this.setZoomAction()
    this.setMoveAction()
  }

  setConfig(config: Partial<BoardConfig>) {
    this.config = { ...this.config, ...config }
  }

  setMoveAction() {
    this.canvas.addEventListener('mousedown', (startEvent) => {
      console.log('mousedown event: ', startEvent)

      const onMouseUp = (endEvent: MouseEvent) => {
        console.log('mouseup event: ', endEvent)
        this.config.viewPort = move(startEvent, endEvent, this.canvas, this.config.viewPort)
        this.draw()
        document.removeEventListener('mouseup', onMouseUp)
      }

      document.addEventListener('mouseup', onMouseUp)
    })
  }

  setZoomAction() {
    this.canvas.addEventListener('wheel', (event) => {
      console.log('event: ', event)
      this.config.viewPort = zoom(event, this.canvas, this.config.viewPort)
      this.draw()
    })
  }
}
