import { Board, Game, GameToken } from "~/types";
import { BOARD_SIZE } from "~/constants";

// Tokens
const tokens: Array<GameToken> = [
  { id: 'default', image: 'tokens/default.svg' }
]
const getToken = (id: string): GameToken | undefined => tokens.find(token => token.id === id);

// Board manipulation
export const createBoard = (): Board => Array(BOARD_SIZE).fill(null);

const moveToken = (board: Board, source: number, destination: number) =>
  board.map((cell, pos) =>
    pos === source
    ? null
    : pos === destination
    ? board[source]
    : cell
  );

// GameState
export const createGameState = (id: string): Game => ({ id, board: createBoard() });

// GameState manipulation
export const applyMove = (game: Game, source: number, destination: number): Game => {
  if (source < 0 || destination < 0 || source >= BOARD_SIZE || destination == BOARD_SIZE) {
    console.log(`Invalid position ${source}, ${destination}.`);
    return game;
  }
  if (game.board[source] === null) {
    console.log(`Invalid move source ${source}: no token found.`);
    return game;
  }

  // TODO: Handle moves into occupied cells.
  const board = moveToken(game.board, source, destination);

  return { ...game, board };
}

export const placeDefaultTokens = (gameState: Game): Game => {
  const board: Board = Array(64).fill(null).map((cell, index) => (index <= 7 || index >= 56) ? getToken('default') : cell);
  return { ...gameState, board };
}