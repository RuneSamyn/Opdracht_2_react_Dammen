import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';


class Board extends React.Component {
  constructor(props) {
    super(props);
    var board = Array(100).fill("x");
    for (var i = 0; i < 20; i++) {
      var x = 2*i;
      if((x >= 10 && x < 20) || (x >= 30 && x < 40) )
        x++;
      board[x] = "w";
      board[99-x] = "z";
    }
    this.state = {
      gameBoard: board
    }
    console.log(this.state.gameBoard)
  }

  renderLine(i, array) {
      return <Line 
        value={i}
        array={array}
      />;
  }

  render() {
      const status = 'Next player: X';
  
      return (
      <div className="">
        <div className="status">{status}</div>
        {this.renderLine(0, this.state.gameBoard.slice(0, 10))}
        {this.renderLine(10, this.state.gameBoard.slice(10, 20))}
        {this.renderLine(20, this.state.gameBoard.slice(20, 30))}
        {this.renderLine(30, this.state.gameBoard.slice(30, 40))}
        {this.renderLine(40, this.state.gameBoard.slice(40, 50))}
        {this.renderLine(50, this.state.gameBoard.slice(50, 60))}
        {this.renderLine(60, this.state.gameBoard.slice(60, 70))}
        {this.renderLine(70, this.state.gameBoard.slice(70, 80))}
        {this.renderLine(80, this.state.gameBoard.slice(80, 90))}
        {this.renderLine(90, this.state.gameBoard.slice(90, 100))}
      </div>
      );
    }
}

class Line extends React.Component {
  renderSquare(i, p) {
    return <Square 
      value={i}
      pion={p} 
    />;
  }
  render() {
      return (
        <div className="col-container">
            {this.renderSquare(0 + this.props.value, this.props.array[0])}
            {this.renderSquare(1 + this.props.value, this.props.array[1])}
            {this.renderSquare(2 + this.props.value, this.props.array[2])}
            {this.renderSquare(3 + this.props.value, this.props.array[3])}
            {this.renderSquare(4 + this.props.value, this.props.array[4])}
            {this.renderSquare(5 + this.props.value, this.props.array[5])}
            {this.renderSquare(6 + this.props.value, this.props.array[6])}
            {this.renderSquare(7 + this.props.value, this.props.array[7])}
            {this.renderSquare(8 + this.props.value, this.props.array[8])}
            {this.renderSquare(9 + this.props.value, this.props.array[9])}
          </div>
      )
  }
}

class Square extends React.Component {
    render() {
        return (
          <button className={"square col" +(this.isBrown() ? " brown" : " white")}>
              <img className="pion" src={this.imageUri(this.props.pion)}></img>
          </button>
        )
    }
    imageUri(pion) {
      if(pion === "w") {
        return "/images/wit.png";
      }
      else if(pion === "wd") {
        return "/images/witD.png";
      }
      else if(pion === "z") {
        return "/images/zwart.png";
      }
      else if(pion === "zd") {
        return "/images/zwartD.png";
      }
    }

    isBrown() {
      var evenCol = this.props.value % 2;
      var evenLine = ((this.props.value - this.props.value % 10) / 10) %2
      return evenLine ? evenCol : !evenCol;
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