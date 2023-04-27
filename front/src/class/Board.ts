import { profileAsync } from '@/decorators/profile'
import type { ViewPort } from '@/interfaces/ViewPort'
import type { WorkerInputData } from '@/interfaces/WorkerInputData'
import type { WorkerOutputData } from '@/interfaces/WorkerOutputData'
import { getColor } from '@/utils/color'
import { getContext, move, zoom } from '@/utils/misc'
import { Mutex } from 'async-mutex'
import { MandelBrot } from './MandelBrot'
import { fromEvent, switchMap, throttleTime } from 'rxjs'

export interface BoardConfig {
  fractal: MandelBrot
  iterationMax: number
  limit: number
  viewPort: ViewPort
}

const mutex = new Mutex()

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

  private getArray(): Promise<number[][]> {
    return new Promise((resolve) => {
      const arrayJobs: number[][][] = new Array(this.workers.length).fill(undefined)
      let finishedJobs = 0
      for (let i = 0; i < this.workers.length; i++) {
        const worker = this.workers[i]
        const workerInputData: WorkerInputData = {
          i: i,
          totalWorker: this.workers.length,
          width: this.canvas.width,
          height: this.canvas.height,
          iterationMax: this.config.iterationMax,
          limit: this.config.limit,
          viewPort: this.config.viewPort
        }
        worker.postMessage(workerInputData)
        worker.onmessage = (e: MessageEvent<WorkerOutputData>) => {
          finishedJobs++

          const i = e.data.i
          arrayJobs[i] = e.data.array
          if (finishedJobs === this.workers.length) {
            const array: number[][] = []
            resolve(array.concat(...arrayJobs))
          }
        }
      }
    })
  }

  private async getSynchronizedArray(): Promise<number[][]> {
    const release = await mutex.acquire()
    try {
      const array = await this.getArray()
      return array
    } finally {
      release()
    }
  }

  @profileAsync()
  async draw(): Promise<void> {
    const width = this.canvas.width

    // const width = 10
    const height = this.canvas.height

    // const height = 20
    const ctx = getContext(this.canvas)

    const iterationMax = this.config.iterationMax
    const array = await this.getSynchronizedArray()

    const imageData = ctx.getImageData(0, 0, width, height)
    const data = imageData.data
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const [red, green, blue] = getColor(array[x][y], iterationMax)
        const index = (y * width + x) * 4
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
      const onMouseUp = async (endEvent: MouseEvent) => {
        document.removeEventListener('mouseup', onMouseUp)
        this.config.viewPort = move(startEvent, endEvent, this.canvas, this.config.viewPort)
        await this.draw()
      }

      document.addEventListener('mouseup', onMouseUp)
    })
  }

  setZoomAction() {
    fromEvent<WheelEvent>(this.canvas, 'wheel')
      .pipe(
        throttleTime(100),
        switchMap(async (event) => {
          this.config.viewPort = zoom(event, this.canvas, this.config.viewPort)
          await this.draw()
        })
      )
      .subscribe()
  }
}
