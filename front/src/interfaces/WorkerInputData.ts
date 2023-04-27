import type { ViewPort } from './ViewPort'

export interface WorkerInputData {
  i: number
  totalWorker: number
  viewPort: ViewPort
  width: number
  height: number
  iterationMax: number
  limit: number
}
