import * as d3 from 'd3'

export const getXXColor = (n: number, max: number): [number, number, number] => {
  const x = (n / max) * 255
  return [255, 255 - x, 255 - x]
}

export const getColor = (n: number, max: number): [number, number, number] => {
  const colorScale = d3.scaleSequential(d3.interpolateMagma).domain([0, 100])
  const x = (n / max) * 100
  const color = d3.color(colorScale(x)) as d3.RGBColor
  return [color.r, color.g, color.b]
}

const color = getColor(12, 24)
console.log('color: ', color)
