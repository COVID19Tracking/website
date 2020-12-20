export default (states, grid, isGrid) => {
  const hexDi = 100
  const hexRad = hexDi / 2
  const hexApo = hexRad * Math.cos(Math.PI / 6)
  const rows = grid.length
  const cols = grid[0].length
  const stroke = 0
  const scale = 0.2
  const x = (hexRad * scale) / 2 + stroke * scale
  let y = hexRad * scale + stroke * scale
  const side = Math.sin(Math.PI / 6) * hexRad
  const height = (hexDi - side) * rows + side + hexRad * scale + stroke * scale
  const width = hexApo * 2 * cols + hexRad * scale + stroke * scale

  let offset = false
  const stateHexes = []

  for (let i = 0; i < grid.length; i += 1) {
    const defaultLoop = isGrid ? hexApo : 0

    const defaultOffset = isGrid ? hexApo * 2 : hexApo
    const loopX = offset ? defaultOffset : defaultLoop
    let locX = x
    for (let s = 0; s < grid[i].length; s += 1) {
      const gridPlot = grid[i][s]
      if (gridPlot !== null) {
        stateHexes.push({
          x: locX + loopX,
          y,
          r: hexRad,
          state: states.find(item => item.state === gridPlot),
        })
      }
      locX += hexApo * 2
    }
    // move our y plot to next row position
    y += hexDi * 0.75
    // toggle offset per row
    offset = !offset
  }
  return { stateHexes, width, height, hexRad }
}
