import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Square = (props) => {
  // const [value, setValue] = useState(null)
  return (
    <button 
    className='square'
    onClick={props.onClickEvent}
    >
      {props.value}
    </button>
  )
}

const Board = () => {
  // const initialSquares = [
  //   null, null, null,
  //   null, null, null,
  //   null, null, null,
  // ]

  const initialSquares = Array(9).fill(null)
  const [squares, setSquares] = useState(initialSquares)
  const [xIsNext, setXIsNext] = useState(true)

  //immutable approach to mutating state 
  const handleClickEvent = (i) => {
    // alert(`clicked square ${i}`)
  //make a copy of the squares state array
    const newSquares = [...squares]
    const winnerDeclared = Boolean(calculateWinner(newSquares))
    const squareFilled = Boolean(newSquares[i])
    if (winnerDeclared || squareFilled) {
      return
    }

    newSquares[i] = xIsNext ? 'X' : 'O'
  //mutate the copy setting i to x
    // newSquares[i] = 'X'
  //call the setstae function with the mutated copy  
    setSquares(newSquares)
    setXIsNext(!xIsNext)
    }
    
  const renderSquare = (i) => {
    return (
    <Square value={squares[i]}
    onClickEvent={() => handleClickEvent(i)}
    />
    )
  }

  const winner = calculateWinner(squares)
  const status = winner ?
  `Winner is ${winner}` :
  `New Player: ${xIsNext ? 'X' : 'O'}`

  return (
    <div>
      <div className="status">{status}</div>
      <div className='board-row'> 
      {renderSquare(1)}{renderSquare(2)}{renderSquare(3)}
      </div>
      <div className='board-row'> 
      {renderSquare(4)}{renderSquare(5)}{renderSquare(6)}
      </div>
      <div className='board-row'> 
      {renderSquare(7)}{renderSquare(8)}{renderSquare(9)}
      </div>
      
    </div>
  )
}

const Game = () => {
  return (
    <div className='game'>
      Tictactoe
      <Board />
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //winning columns
    [0, 4, 8], [2, 4, 6] //diagnols
  ]
  for (let line of lines) {
    const [a, b, c] = line
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a] // X or O
    }
  } 
  return null
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
