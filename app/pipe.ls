require! <[jquery]>
$ = jquery

module.exports = (canvas, width, height, row, col, prev-row, prev-col) !->
  #return unless row is 0 and col is 0 # act on a specific brick
  #return unless row is 0 or col is 0 # act on cross bricks

  ctx = canvas.get-context \2d
  n-gradient = 5
  n-color-stop = 5
  for til n-gradient
    grd = ctx.create-radial-gradient rw!, rh!, rw!, rw!, rh!, rw!
    for stop to n-color-stop
      grd.add-color-stop stop / n-color-stop, "rgba(#{r256!},#{r256!},#{r256!},#{0.5 * Math.random!})"
    ctx.fill-style = grd
    ctx.fill-rect 0 0 width, height

  function r256 => Math.round 256 * Math.random!
  function rh   => Math.random! * height
  function rw   => Math.random! * width

# vi:et:nowrap
