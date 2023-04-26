import { getContext } from '@/utils/misc'
import { MandelBrot } from './MandelBrot'

export interface BoardConfig {
  fractal: MandelBrot
}

export class Board {
  config: BoardConfig = {
    fractal: new MandelBrot()
  }

  constructor(readonly canvas: HTMLCanvasElement) {
    const rect = this.canvas.getBoundingClientRect()
    console.log('rect: ', rect)
    this.canvas.width = rect.width
    this.canvas.height = rect.height
  }

  draw() {
    const width = this.canvas.width
    console.log('width: ', width)
    const height = this.canvas.height
    console.log('height: ', height)
    const ctx = getContext(this.canvas)

    const imageData = ctx.getImageData(0, 0, width, height)
    const data = imageData.data
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const index = (y * width + x) * 4
        data[index] = 255
        data[index + 1] = 255
        data[index + 2] = 125
        data[index + 3] = 125
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
