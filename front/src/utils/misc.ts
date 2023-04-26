export const getContext = (canvas: HTMLCanvasElement): CanvasRenderingContext2D => {
  const ctx = canvas.getContext('2d')
  if (ctx === null) {
    throw new Error('Canvas context not found')
  }
  return ctx
}
