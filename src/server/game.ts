export interface GameState {
  board: Board;
}

interface Board {
  cells: Array<GameToken | null>;
}

interface GameToken {
  imageUrl: string;
}

const tokens = {
  'default': { imageUrl: '' }
}

const createBoard = (): Board => ({ cells: Array(64).fill(null) });
export const createGameState = (): GameState => ({ board: createBoard() });