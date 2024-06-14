import { GameState, createGameState } from './game';

const games: { [key: string]: GameState } = {
  'abc': createGameState()
}

const getGame = (id: string): GameState | null => games[id] || null;

export default { getGame };