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
      squares: Array(9).fill(null),
      winner: null
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
    if (null == this.state.squares[i] && null == this.state.winner) {
      // Make note of the move
      const turns = this.state.turns.slice();
      turns.push(new Move(i, this.currentPlayer()));
      this.setState({turns: turns});

      // Set the move
      const squares = this.state.squares.slice();
      squares[i] = this.currentPlayer();
      this.setState({turn: this.state.turn + 1});
      this.setState({squares: squares});
      this.setState({winner: Board.calculateWinner(squares)});
    }
  }

  render() {
    const status = this.state.winner ? `Winner: ${this.state.winner}` : `Next player: ${this.currentPlayer()}`;
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

  static calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
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

