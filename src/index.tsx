import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Move {
  constructor(readonly square: number, readonly player: string) {
  }
}

interface SquareState {
  onClick: any;
  value: string;
}

function Square(props: SquareState): JSX.Element {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

interface BoardState {
  turn: number;
  turns: Array<Move>;
  squares: Array<string>;
  winner: string;
}

class Board extends React.Component<any, BoardState> {
  static readonly PLAYERS: Array<string> = ['X', 'O'];

  constructor(props: {}) {
    super(props);
    this.state = {
      turn: 0,
      turns: [],
      squares: Array(9).fill(''),
      winner: ''
    }
  }

  renderSquare(i: number): JSX.Element {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  handleClick(i: number) {
    if (!this.state.squares[i] && !this.state.winner) {
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

  render(): JSX.Element {
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
    return Board.PLAYERS[this.state.turn % 2];
  }

  static calculateWinner(squares: Array<string>): string {
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
    return '';
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

