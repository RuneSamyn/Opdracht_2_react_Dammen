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
    
    /* gameboard variables:
      z => zwart
      w => wit
      zd => zwart dam
      wd => wit dam
      zp => zwart possible
      wp => wit possible
      zdp => zwart dam possible
      wdp => wit dam possible
      x => no piece
    */


    this.state = {
      gameBoard: board,
      player: "z",
      pionSelected: null,
      possibleKill: {},
      scoreZwart: 0,
      scoreWit: 0
    }
  }

  onClickHandler(i) {
    console.log(i)
    const board = this.state.gameBoard;
    this.setState({pionSelected: i})
    // show possible moves to player
    //    first: check if current player is black or white
    if(board[i] === "z") {
      this.setState({gameBoard: this.checkMovesZ(i)})
    } else if(board[i] === "w") {
      this.setState({gameBoard: this.checkMovesW(i)})
    } else if(board[i] === "zd") {
      this.setState({gameBoard: this.checkMovesZD(i)})
    } else if(board[i] === "wd") {
      this.setState({gameBoard: this.checkMovesWD(i)})
    } else if(board[i] === "zp") {
      this.setState({gameBoard: this.moveZ(i)})
    } else if(board[i] === "wp") {
      this.setState({gameBoard: this.moveW(i)})
    } else if(board[i] === "zdp") {
      this.setState({gameBoard: this.moveZD(i)})
    } else if(board[i] === "wdp") {
      this.setState({gameBoard: this.moveWD(i)})
    } else if(board[i] === "x") {
      // player didn't click on a piece
      this.setState({pionSelected: null})
      // delete all possible moves
      this.setState({gameBoard: this.deleteAllPossibleMoves()})
    }    
  }

  checkMovesZ(i) {
    this.setState({pionSelected: i});
    const board = this.deleteAllPossibleMoves();
    var moveLpos = i - 11;
    var moveRpos = i - 9;
    // check if pieces are on the side of the Board
    if(i % 10 === 0)
      moveLpos = null;
    if(i % 10 === 9)
      moveRpos = null;
    // check if you can jump over a white piece
    if((board[moveLpos] === "w" || board[moveLpos] === "wd")) {
      if(board[moveLpos - 11] === "x" && moveLpos % 10 != 0) {
        moveLpos -= 11;
        //add possible kill
        var kills = this.state.possibleKill;
        kills[moveLpos] = moveLpos + 11;
      }
      else
        moveLpos = null;
    }
    if((board[moveRpos] === "w" || board[moveRpos] === "wd")) {
      if(board[moveRpos - 9] === "x" && moveRpos % 10 != 9) {
        moveRpos -= 9;
        //add possible kill
        var kills = this.state.possibleKill;
        kills[moveRpos] = moveRpos + 9;
      }
      else
      moveRpos = null;
    }
    // check if there is no black piece before you
    if(board[moveLpos] === "z" || board[moveLpos] === "zp") {
      moveLpos = null;
    }
    if( board[moveRpos] === "z" || board[moveRpos] === "zp") {
      moveRpos = null;
    }
    // update board
    if(moveLpos != null)
      board[moveLpos] = "zp";
    if(moveRpos != null)
      board[moveRpos] = "zp";
    return board;
  }
  
  checkMovesW(i) {
    this.setState({pionSelected: i});
    const board = this.deleteAllPossibleMoves();
    var moveLpos = i + 9;
    var moveRpos = i + 11;
    // check if pieces are on the side of the Board
    if(i % 10 === 0)
      moveLpos = null;
    if(i % 10 === 9)
      moveRpos = null;
    // check if you can jump over a white piece
    if((board[moveLpos] === "z" || board[moveLpos] === "zd")) {
      if(board[moveLpos + 9] === "x" && moveLpos % 10 != 0) {
        moveLpos += 9;
        //add possible kill
        var kills = this.state.possibleKill;
        kills[moveLpos] = moveLpos - 9;
      }
      else
        moveLpos = null;
    }
    if((board[moveRpos] === "z" || board[moveRpos] === "zd")) {
      if(board[moveRpos + 11] === "x" && moveRpos % 10 != 9) {
        moveRpos += 11;
        //add possible kill
        var kills = this.state.possibleKill;
        kills[moveRpos] = moveRpos - 11;
      }
      else
      moveRpos = null;
    }
    // check if there is no black piece before you
    if(board[moveLpos] === "w" || board[moveLpos] === "wp") {
      moveLpos = null;
    }
    if( board[moveRpos] === "w" || board[moveRpos] === "wp") {
      moveRpos = null;
    }
    // update board
    if(moveLpos != null)
      board[moveLpos] = "wp";
    if(moveRpos != null)
      board[moveRpos] = "wp";
    return board;
  }
  
  checkMovesZD(i) {
    this.setState({pionSelected: i});
    const board = this.deleteAllPossibleMoves();
    var moveLpos = i - 11;
    var moveRpos = i - 9;
    // check if moves are not bocked
    if((board[moveLpos] === "w" || board[moveLpos] === "wd") && board[moveLpos - 11] === "x") {
      moveLpos -= 11
    }
    // update board
    board[moveLpos] = "zp";
    board[moveRpos] = "zp";
    return board;
  }

  checkMovesWD(i) {
    this.setState({pionSelected: i});
    const board = this.deleteAllPossibleMoves();
    var moveLpos = i - 11;
    var moveRpos = i - 9;
    // check if moves are not bocked
    if((board[moveLpos] === "w" || board[moveLpos] === "wd") && board[moveLpos - 11] === "x") {
      moveLpos -= 11
    }
    // update board
    board[moveLpos] = "zp";
    board[moveRpos] = "zp";
    return board;
  }
  
  moveZ(i) {
    const board = this.deleteAllPossibleMoves();
    board[i] = "z";
    board[this.state.pionSelected] = "x";
    console.log(this.state.possibleKill[i]);
    if(this.state.possibleKill[i] !== "undefined"){
      board[this.state.possibleKill[i]] = "x";
      this.setState({scoreZwart: this.state.scoreZwart+1})
      this.setState({possibleKill: {}})
    }
    return board
  }
  
  moveW(i) {
    const board = this.deleteAllPossibleMoves();
    board[i] = "w";
    board[this.state.pionSelected] = "x";
    console.log(this.state.possibleKill[i]);
    if(this.state.possibleKill[i] !== "undefined"){
      board[this.state.possibleKill[i]] = "x";
    }
    return board
  }
  
  moveZD(i) {
    
  }
  
  moveWD(i) {
    
  }

  deleteAllPossibleMoves() {
    const board = this.state.gameBoard;
    for(let i = 0; i < 100; i++) {
      if(board[i] === "zp" || board[i] === "wp" || board[i] === "zdp" || board[i] === "wdp") {
        board[i] = "x";
      }
    }
    return board
  }

  renderLine(i, array) {
      return <Line 
        value={i}
        array={array}
        onClick={(i) => this.onClickHandler(i)}
      />;
  }

  render() {  
      return (
      <div className="">
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
      onClick={(i) => this.props.onClick(i)}
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
          <button 
            className={"square col" +(this.isBrown() ? " brown" : " white")}
            onClick={() => this.props.onClick(this.props.value)}>
              <img className="pion" src={this.imageUri(this.props.pion)}/>
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
      else if(pion === "wp") {
        return "/images/witP.png";
      }
      else if(pion === "wdp") {
        return "/images/witDP.png";
      }
      else if(pion === "z") {
        return "/images/zwart.png";
      }
      else if(pion === "zd") {
        return "/images/zwartD.png";
      }
      else if(pion === "zp") {
        return "/images/zwartP.png";
      }
      else if(pion === "zdp") {
        return "/images/zwartDP.png";
      }
      else
        return "none";
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
        <div className="game container mt-5">
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