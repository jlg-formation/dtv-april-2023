import type { ViewPort } from './ViewPort'

export interface Snapshot {
  id: number
  viewPort: ViewPort
  iterationMax: number
  limit: number
  imageDataURL: string
}
