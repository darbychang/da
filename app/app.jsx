import '!file-loader?name=index.html!extract-loader!html-loader!pug-html-loader!./index.pug'
import './app.sass';

var opt = {
  brickHeight: 64,
  brickWidth: 64,
  nCols: 5,
  nRows: 5
}
var zero = { col: (opt.nCols - 1) / 2, row: (opt.nRows - 1) / 2 }

import React from 'react'
import ReactDOM from 'react-dom'
class App extends React.Component {
  render() {
    const rows = []
    for (let i = 0; i < opt.nRows; ++i ) {
      const row = []
      for (var j = 0; j < opt.nCols; ++j ) {
        const id = (i - zero.row) + ',' + (j - zero.col)
        row.push(<canvas id={id} height={opt.brickHeight} key={id} width={opt.brickWidth}/>);
      }
      rows.push(<div key={i}>{row}</div>);
    }
    return <div>{rows}</div>
  }
}
ReactDOM.render(<App />, document.getElementById('app'));

var pipes = []
import pipe from './pipe.ls'
pipes.push(pipe)

function draw() {
  var drawn = {}, next = []
  push(0, 0)
  drawOne()
  function drawOne() {
    var cur = next.splice(0, next.length)
    for (var brick of cur) {
      for (var p of pipes) {
        p(document.getElementById(brick.id), opt.brickWidth, opt.brickHeight, brick.row, brick.col, [], [])
      }
      if (brick.row > -zero.row) push(brick.row - 1, brick.col)
      if (brick.col <  zero.col) push(brick.row, brick.col + 1)
      if (brick.row <  zero.row) push(brick.row + 1, brick.col)
      if (brick.col > -zero.col) push(brick.row, brick.col - 1)
    }
    if (next.length) setTimeout(drawOne, 100)
  }
  function push(row, col) {
    var id = row + ',' + col
    if (drawn[id]) return
    drawn[id] = true
    next.push({ id: id, row: row, col: col })
  }
}
draw()

// vi:et:nowrap
