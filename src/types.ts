export interface Game {
  players: string[]
  id: string
  board: Board;
}

export type Board = Array<GameToken | null>;

export interface GameToken {
  id: string
  image: string;
}

export interface User {
  id: string;
}