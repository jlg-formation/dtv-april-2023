export const getColor = (n: number, max: number): [number, number, number] => {
  const x = (n / max) * 255
  return [255, 255 - x, 255 - x]
}
