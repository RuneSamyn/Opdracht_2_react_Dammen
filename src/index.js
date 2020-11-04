import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';


class Board extends React.Component {
    renderRow(i) {
        return <Row value={i} />;
    }
    render() {
        const status = 'Next player: X';
    
        return (
          <div>
            <div className="status">{status}</div>
            <div className="row mb-5">
              {this.renderRow(0)}
              {this.renderRow(1)}
              {this.renderRow(2)}
              {this.renderRow(3)}
              {this.renderRow(4)}
              {this.renderRow(5)}
              {this.renderRow(6)}
            </div>
          </div>
        );
      }
}

class Row extends React.Component {
    renderSquare(i) {
        return <Square value={i} />;
    }
    render() {
        return (
            <button className="col h-75">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
            </button>
        )
    }
}

class Square extends React.Component {
    render() {
        return (
        <div className="square inline-block">
            {this.props.value}
        </div>
    )
}
}

class Game extends React.Component {
    render() {
      return (
        <div className="game container">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);