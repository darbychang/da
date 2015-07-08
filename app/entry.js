import jade from './index.jade';
document.body.innerHTML = jade();

import '../node_modules/normalize.css/normalize.css';
import './app.styl';

var opt = {
  brickHeight: 64,
  brickWidth: 64,
  nCols: 5,
  nRows: 5
}
var zero = { col: (opt.nCols - 1) / 2, row: (opt.nRows - 1) / 2 };

import React from 'react';
class App extends React.Component {
  render() {
    var rows = [];
    for (var i = 0; i < opt.nRows; ++i ) {
      var row = [];
      for (var j = 0; j < opt.nCols; ++j ) {
        row.push(<canvas id={(i - zero.row) + ',' + (j - zero.col)} height={opt.brickHeight} width={opt.brickWidth}/>);
      }
      rows.push(<div>{row}</div>);
    }
    return <div>{rows}</div>
  }
}
React.render(<App />, document.getElementById('app'));

var pipes = [];
import pipe from './pipe.ls';
pipes.push(pipe);

function draw() {
  var drawn = {}, next = [];
  push(0, 0);
  drawOne();
  function drawOne() {
    var cur = next.splice(0, next.length);
    for (var brick of cur) {
      for (var p of pipes) {
        p(document.getElementById(brick.id), opt.brickWidth, opt.brickHeight, brick.row, brick.col, [], []);
      }
      if (brick.row > -zero.row) push(brick.row - 1, brick.col);
      if (brick.col <  zero.col) push(brick.row, brick.col + 1);
      if (brick.row <  zero.row) push(brick.row + 1, brick.col);
      if (brick.col > -zero.col) push(brick.row, brick.col - 1);
    }
    if (next.length) setTimeout(drawOne, 100);
  }
  function push(row, col) {
    var id = row + ',' + col;
    if (drawn[id]) return;
    drawn[id] = true;
    next.push({ id: id, row: row, col: col });
  }
}
draw();

// vi:et:nowrap
