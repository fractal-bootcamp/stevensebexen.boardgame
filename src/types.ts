export interface Game {
  id: string
  board: Board;
}

export type Board = Array<GameToken | null>;

export interface GameToken {
  id: string
  image: string;
}

