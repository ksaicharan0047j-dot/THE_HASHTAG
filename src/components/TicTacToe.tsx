"use client";

import { useState } from "react";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [status, setStatus] = useState("Your Turn");

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkWinner(currentBoard: string[]) {
    for (const combo of winningCombos) {
      const [a, b, c] = combo;

      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }

    return null;
  }

  function findBestMove(boardState: string[]) {
    for (let i = 0; i < 9; i++) {
      if (boardState[i] === "") {
        const test = [...boardState];
        test[i] = "O";

        if (checkWinner(test) === "O") {
          return i;
        }
      }
    }

    for (let i = 0; i < 9; i++) {
      if (boardState[i] === "") {
        const test = [...boardState];
        test[i] = "X";

        if (checkWinner(test) === "X") {
          return i;
        }
      }
    }

    if (boardState[4] === "") {
      return 4;
    }

    const corners = [0, 2, 6, 8];

    for (const corner of corners) {
      if (boardState[corner] === "") {
        return corner;
      }
    }

    const available = boardState
      .map((cell, idx) => (cell === "" ? idx : null))
      .filter((v) => v !== null);

    if (available.length === 0) {
      return -1;
    }

    return available[
      Math.floor(Math.random() * available.length)
    ] as number;
  }

  function handleMove(index: number) {
    if (board[index] !== "") return;

    if (
      status === "You Win!" ||
      status === "Computer Wins!" ||
      status === "Draw!"
    ) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = "X";

    const playerWinner = checkWinner(newBoard);

    if (playerWinner === "X") {
      setBoard(newBoard);
      setStatus("You Win!");
      return;
    }

    if (!newBoard.includes("")) {
      setBoard(newBoard);
      setStatus("Draw!");
      return;
    }

    const computerMove = findBestMove(newBoard);

    if (computerMove !== -1) {
      newBoard[computerMove] = "O";
    }

    const computerWinner = checkWinner(newBoard);

    if (computerWinner === "O") {
      setBoard(newBoard);
      setStatus("Computer Wins!");
      return;
    }

    if (!newBoard.includes("")) {
      setBoard(newBoard);
      setStatus("Draw!");
      return;
    }

    setBoard(newBoard);
    setStatus("Your Turn");
  }

  function resetGame() {
    setBoard(Array(9).fill(""));
    setStatus("Your Turn");
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">
        Tic Tac Toe
      </h2>

      <p className="mb-6 text-[#8a8a8a]">
        {status}
      </p>

      <div className="grid grid-cols-3 gap-3 w-75">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleMove(index)}
            className="
              h-24
              w-24
              text-4xl
              font-bold
              rounded-2xl
              bg-[#242424]
              border
              border-white/10
              hover:bg-[#303030]
              transition
            "
          >
            {cell}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="
          mt-8
          bg-white
          text-black
          px-6
          py-3
          rounded-full
          font-semibold
        "
      >
        Restart Game
      </button>
    </div>
  );
}