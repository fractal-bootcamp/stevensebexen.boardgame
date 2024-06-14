import { Game } from "~/types";

// Faked game DB
const games: Array<Game> = []

export const getGame = (id: string): Game | undefined => games.find(g => g.id === id);
export const getAllGames = () => games;

export const createGame = (game: Game): Game => {
  games.push(game);
  return game;
}

export const updateGame = (game0: Game): Game | undefined => {
  const game = getGame(game0.id);
  if (game === undefined) return undefined;

  Object.assign(game, game0);
  return game;
}

export default 0;