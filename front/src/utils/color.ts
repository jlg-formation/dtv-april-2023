import * as d3 from 'd3'

export const getXXColor = (n: number, max: number): [number, number, number] => {
  const x = (n / max) * 255
  return [255, 255 - x, 255 - x]
}

export const getColor =
  (scheme: (t: number) => string) =>
  (n: number, max: number): [number, number, number] => {
    const colorScale = d3.scaleSequential(scheme).domain([0, 100])
    const x = (n / max) * 100
    const color = d3.color(colorScale(x)) as d3.RGBColor
    return [color.r, color.g, color.b]
  }

export const colorChoices: { [key: string]: (t: number) => string } = {
  'd3.interpolateBrBG': d3.interpolateBrBG,
  'd3.interpolatePRGn': d3.interpolatePRGn,
  'd3.interpolatePiYG': d3.interpolatePiYG,
  'd3.interpolatePuOr': d3.interpolatePuOr,
  'd3.interpolateRdBu': d3.interpolateRdBu,
  'd3.interpolateTurbo': d3.interpolateTurbo,
  'd3.interpolateViridis': d3.interpolateViridis,
  'd3.interpolateInferno': d3.interpolateInferno,
  'd3.interpolateMagma': d3.interpolateMagma
}
