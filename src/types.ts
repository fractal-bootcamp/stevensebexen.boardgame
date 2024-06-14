export interface Game {
  board: Board;
}

export type Board = Array<GameToken | null>;

export interface GameToken {
  image: string;
}

