import React, { useState } from "react";

const index = () => {
  const [state, setState] = useState({
    board: [
      ["[ ]", "[ ]", "[ ]"],
      ["[ ]", "[ ]", "[ ]"],
      ["[ ]", "[ ]", "[ ]"],
    ],
    currentPlayer: "x",
  });

  const togglePlayer = () => {
    const currentPlayer = state.currentPlayer === "x" ? "o" : "x";
    setState((prev) => ({ ...prev, currentPlayer }));
  };

  const mutateBoard = (row: number, col: number, player: string) => {
    let mutableBoard = state.board;
    mutableBoard[row][col] = player;
    setState((prev) => ({ ...prev, board: mutableBoard }));
  };

  const handlePlay = (row: number, col: number) => {
    mutateBoard(row, col, state.currentPlayer);
    togglePlayer();
  };

  const verifyLine = (line: string[]) => {
    return line.every((entry) => entry === "o" || entry === "x");
  };

  const verifyWinner = (board: string[][]): "o" | "x" => {
    return "o";
  };

  const winner = verifyWinner(state.board);

  console.log(winner);

  return (
    <div>
      {state.board.map((_, rowIndex) => (
        <div key={rowIndex}>
          {state.board.map((_, colIndex) => (
            <button
              key={colIndex}
              onClick={() => handlePlay(rowIndex, colIndex)}
            >
              {state.board[rowIndex][colIndex]}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default index;
