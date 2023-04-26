import { getContext } from '@/utils/misc'
import { MandelBrot } from './MandelBrot'
import { getMandelbrotNumber } from '@/utils/mandelbrot'
import { getColor } from '@/utils/color'
import type { ViewPort } from '@/interfaces/ViewPort'

export interface BoardConfig {
  fractal: MandelBrot
  viewPort: ViewPort
}

export class Board {
  config: BoardConfig = {
    fractal: new MandelBrot(),
    viewPort: {
      x: -2,
      y: -1,
      width: 4,
      height: 2
    }
  }

  constructor(readonly canvas: HTMLCanvasElement) {
    const rect = this.canvas.getBoundingClientRect()
    console.log('rect: ', rect)
    this.canvas.width = rect.width
    this.canvas.height = rect.height
    this.config.viewPort.height =
      (this.config.viewPort.width * this.canvas.height) / this.canvas.width
  }

  draw() {
    const width = this.canvas.width
    // const width = 10
    const height = this.canvas.height
    // const height = 20
    const ctx = getContext(this.canvas)

    const maxIteration = 50
    const limit = 30

    const imageData = ctx.getImageData(0, 0, width, height)
    const data = imageData.data
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const index = (y * width + x) * 4

        const xx = this.config.viewPort.x + (x * this.config.viewPort.width) / width
        const yy = this.config.viewPort.y + (y * this.config.viewPort.height) / height

        const mandelbrotNbr = getMandelbrotNumber({ x: xx, y: yy }, maxIteration, limit)
        const [red, green, blue] = getColor(mandelbrotNbr, maxIteration)
        data[index] = red
        data[index + 1] = green
        data[index + 2] = blue
        data[index + 3] = 255
      }
    }
    ctx.putImageData(imageData, 0, 0)

    // const imageData = ctx.getImageData(0, 0, 10, 15)
    // const data = imageData.data
    // for (let i = 0; i < data.length; i += 4) {
    //   data[i] = 255 // red
    //   data[i + 1] = 100 // green
    //   data[i + 2] = 100 // blue
    //   data[i + 3] = 127
    // }
    // ctx.putImageData(imageData, 0, 0)
  }

  setConfig(config: Partial<MandelBrot>) {
    this.config = { ...this.config, ...config }
  }
}
