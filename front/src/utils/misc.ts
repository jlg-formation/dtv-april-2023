import type { Point, Vector } from '@/interfaces/Point'
import type { ViewPort } from '@/interfaces/ViewPort'

export const getContext = (canvas: HTMLCanvasElement): CanvasRenderingContext2D => {
  const ctx = canvas.getContext('2d')
  if (ctx === null) {
    throw new Error('Canvas context not found')
  }
  return ctx
}

export const getCursorPositionInsideCanvas = (
  canvas: HTMLCanvasElement,
  event: MouseEvent
): Point => {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  return { x, y }
}

export const getCursorPositionInsideViewPort = (
  canvas: HTMLCanvasElement,
  p: Point,
  viewPort: ViewPort
): Point => {
  const rect = canvas.getBoundingClientRect()
  const x = viewPort.x + p.x * (viewPort.width / rect.width)
  const y = viewPort.y + p.y * (viewPort.height / rect.height)
  return { x, y }
}

export const getRatio = (viewPort: ViewPort, v: Point): Point => {
  return { x: (v.x - viewPort.x) / viewPort.width, y: (v.y - viewPort.y) / viewPort.height }
}

export const getNewViewPort = (
  zoomFactor: number,
  ratio: Point,
  v: Point,
  viewPort: ViewPort
): ViewPort => {
  const width = viewPort.width / zoomFactor
  const height = viewPort.height / zoomFactor
  return {
    width,
    height,
    x: v.x - ratio.x * width,
    y: v.y - ratio.y * height
  }
}

export const zoom = (
  event: WheelEvent,
  canvas: HTMLCanvasElement,
  viewPort: ViewPort
): ViewPort => {
  const zoomFactor = event.deltaY > 0 ? 0.5 : 2
  const p = getCursorPositionInsideCanvas(canvas, event)
  const v = getCursorPositionInsideViewPort(canvas, p, viewPort)
  const ratio = getRatio(viewPort, v)

  const newViewPort = getNewViewPort(zoomFactor, ratio, v, viewPort)
  return newViewPort
}

export const move = (
  startEvent: MouseEvent,
  endEvent: MouseEvent,
  canvas: HTMLCanvasElement,
  viewPort: ViewPort
): ViewPort => {
  const startP = getCursorPositionInsideCanvas(canvas, startEvent)
  const endP = getCursorPositionInsideCanvas(canvas, endEvent)

  const startV = getCursorPositionInsideViewPort(canvas, startP, viewPort)
  const endV = getCursorPositionInsideViewPort(canvas, endP, viewPort)

  const delta: Vector = {
    x: endV.x - startV.x,
    y: endV.y - startV.y
  }

  const newViewPort: ViewPort = {
    width: viewPort.width,
    height: viewPort.height,
    x: viewPort.x - delta.x,
    y: viewPort.y - delta.y
  }

  return newViewPort
}
