import jQuery from 'jquery'
const $ = jQuery

module.exports = (canvas, width, height, row, col, prevRow, prevCol) => {
  // return unless row is 0 and col is 0 // act on a specific brick
  // return unless row is 0 or col is 0 // act on cross bricks

  const r256 = () => Math.round(256 * Math.random())
  const rh = () => Math.random() * height
  const rw = () => Math.random() * width

  const ctx = canvas.getContext('2d')
  const nGradient = 5
  const nColorStop = 5
  for (let iGradient = 0; iGradient < nGradient; ++iGradient) {
    const grd = ctx.createRadialGradient(rw(), rh(), rw(), rw(), rh(), rw())
    for (let stop = 0; stop <= nColorStop; ++stop)
      grd.addColorStop(stop / nColorStop, `rgba(${r256()},${r256()},${r256()},${0.5 * Math.random()})`)
    ctx.fillStyle = grd
    ctx.fillRect(0, 0, width, height)
  }
}
