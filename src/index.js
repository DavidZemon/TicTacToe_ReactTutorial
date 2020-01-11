import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Move {
  constructor(square, player) {
    this.square = square;
    this.player = player;
  }
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.players = ['X', 'O'];
    this.state = {
      turn: 0,
      turns: [],
      squares: Array(9).fill(null)
    }
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  handleClick(i) {
    if (this.state.squares[i] == null) {
      // Make note of the move
      const turns = this.state.turns.slice();
      turns.push(new Move(i, this.currentPlayer()));
      this.setState({turns: turns});

      // Set the move
      const squares = this.state.squares.slice();
      squares[i] = this.currentPlayer();
      this.setState({turn: this.state.turn + 1});
      this.setState({squares: squares});
    }
  }

  render() {
    const status = `Next player: ${(this.currentPlayer())}`;

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)} {this.renderSquare(1)} {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)} {this.renderSquare(4)} {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)} {this.renderSquare(7)} {this.renderSquare(8)}
        </div>
      </div>
    );
  }

  currentPlayer() {
    return this.players[this.state.turn % 2];
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game/>,
  document.getElementById('root')
);

