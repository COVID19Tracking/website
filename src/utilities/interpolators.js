/* eslint-disable */

// Utilities to create continuous color schemes from discrete palettes
// Code: Philippe Rivière - https://observablehq.com/@fil/interpolate-colors-with-catmull-rom

import { transpose } from 'd3-array'
import { rgb } from 'd3-color'

const sign = Math.sign
const min = Math.min
const abs = Math.abs
const floor = Math.floor
const frac = t => t - floor(t)
const clamp = (t, lo, hi) => (t < lo ? lo : t > hi ? hi : t)

const monotone = (values, type) => {
  const monotone = t => {
    const i = Math.min(n - 1, Math.floor(t * n)),
      y_im1 = values[i],
      y_i = values[i + 1],
      y_ip1 = values[i + 2],
      y_ip2 = values[i + 3],
      d = t * n - i,
      s_im1 = n * (y_i - y_im1),
      s_i = n * (y_ip1 - y_i),
      s_ip1 = n * (y_ip2 - y_ip1),
      yp_i =
        (sign(s_im1) + sign(s_i)) *
        min(abs(s_im1), abs(s_i), 0.25 * n * abs(y_ip1 - y_im1)),
      yp_ip1 =
        (sign(s_i) + sign(s_ip1)) *
        min(abs(s_i), abs(s_ip1), 0.25 * n * abs(y_ip2 - y_i))

    return (
      (((yp_i + yp_ip1 - 2 * s_i) * d + (3 * s_i - 2 * yp_i - yp_ip1)) * d +
        yp_i) *
        (d / n) +
      y_i
    )
  }

  let n = values.length - 1,
    k
  values = values.slice()
  switch (type) {
    case 'closed':
      values.unshift(values[n])
      values.push(values[1])
      values.push(values[2])
      n += 2
      k = 1 - 1 / n
      return t => monotone(k * frac(t))
    case 'open':
      throw new Error('open monotone spline not implemented yet')
    case 'clamped':
    default:
      values.push(2 * values[n] - values[n - 1])
      values.unshift(2 * values[0] - values[1])
      return t => monotone(clamp(t, 0, 1))
  }
}

export const interpolateRgbMonotone = colors => {
  const [r, g, b] = transpose(
    colors.map(d => rgb(d)).map(({ r, g, b }) => [r, g, b]),
  )
  const R = monotone(r),
    G = monotone(g),
    B = monotone(b)
  return t => rgb(R(t), G(t), B(t))
}
