import React, { useState } from "react";

const WINNER_BOARDS = [
  "111000000",
  "000111000",
  "000000111",
  "100100100",
  "010010010",
  "001001001",
  "100010001",
  "001010100",
];

const INITIAL_BOARD = [
  ["[ ]", "[ ]", "[ ]"],
  ["[ ]", "[ ]", "[ ]"],
  ["[ ]", "[ ]", "[ ]"],
];

const INITIAL_STATE = {
  board: INITIAL_BOARD,
  currentPlayer: "x",
};

const index = () => {
  const [state, setState] = useState(INITIAL_STATE);

  const togglePlayer = () => {
    const currentPlayer = state.currentPlayer === "x" ? "o" : "x";
    setState((prev) => ({ ...prev, currentPlayer }));
  };

  const updateBoard = (row: number, col: number, player: string) => {
    let mutableBoard = [...state.board];
    mutableBoard[row][col] = player;
    setState((prev) => ({ ...prev, board: mutableBoard }));
  };

  const verifyWinner = (board: string[][], player: string) => {
    const parsedBoard = board.map((row) => {
      return row.map((col) => (col === player ? "1" : "0"));
    });
    const flattened = parsedBoard.flat(1).join("");
    const isWinner = WINNER_BOARDS.includes(flattened);
    return isWinner;
  };

  const hasAWinner = (board: string[][]): string | undefined => {
    const isXWinner = verifyWinner(board, "x");
    const isOWinner = verifyWinner(board, "o");
    const winner = isXWinner ? "x" : isOWinner ? "o" : undefined;
    return winner;
  };

  const handlePlay = (row: number, col: number) => {
    if (!!winner) return;
    updateBoard(row, col, state.currentPlayer);
    togglePlayer();
  };

  const handleRestartGame = () => {
    setState(() => INITIAL_STATE);
    console.log(state);
    console.log("restarted");
  };

  const winner = hasAWinner(state.board);

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
      <p>{winner}</p>
      <button onClick={handleRestartGame}>Restart Game</button>
    </div>
  );
};

export default index;
