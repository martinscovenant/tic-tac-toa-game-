
import React, { useState } from 'react';
import './App.css';

const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (i) => {
    if (winner || board[i]) return;
    const newBoard = [...board];
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    setWinner(calculateWinner(newBoard));
  };

  const handleReset = () => {
    setBoard(initialBoard);
    setXIsNext(true);
    setWinner(null);
  };

  const renderSquare = (i) => (
    <button className="square" onClick={() => handleClick(i)}>
      {board[i]}
    </button>
  );

  const status = winner
    ? `Winner: ${winner}`
    : board.every((square) => square !== null)
    ? 'Draw!'
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <>
    <div className="game">
      <div className="status">{status}</div>
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      {(winner || status === 'Draw!') && (
       <button className="play-again" onClick={handleReset}>
          Play Again
        <i></i></button>
      )}
    </div>
    </>
  );
};

const calculateWinner = (squares) => {
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
};

export default App;
