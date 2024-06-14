import { Board, Game } from "~/types";
import { BOARD_SIZE } from "~/constants";

const tokens = {
  'default': 'tokens/default.svg'
}

export const createBoard = (): Board => Array(BOARD_SIZE).fill(null);
export const createGameState = (id: string): Game => ({ id, board: createBoard() });

export const moveToken = (game: Game, source: number, destination: number): Game => {
  if (source < 0 || destination < 0 || source >= BOARD_SIZE || destination == BOARD_SIZE) {
    console.log(`Invalid position ${source}, ${destination}.`);
    return game;
  }
  if (game.board[source] === null) {
    console.log(`Invalid move source ${source}: no token found.`);
    return game;
  }

  const board = game.board.map((cell, pos) =>
    pos === source
    ? null
    : pos === destination
    ? game.board[source]
    : cell
  );

  return { ...game, board };
}

export const placeDefaultTokens = (gameState: Game): Game => {
  const board: Board = Array(64).fill(null).map((cell, index) => (index <= 7 || index >= 56) ? { image: tokens.default } : cell);
  return { ...gameState, board };
}