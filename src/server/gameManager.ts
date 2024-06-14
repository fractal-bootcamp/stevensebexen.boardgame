import { createGameState, placeDefaultTokens } from './game';
import { Game } from "~/types";

const games: Array<Game> = [
  placeDefaultTokens(createGameState('abc'))
]

const getGame = (id: string): Game | undefined => games.find(g => g.id === id);

const updateGame = (game0: Game): void => {
  const game = getGame(game0.id);
  if (game === undefined) return;

  Object.assign(game, game0);
}

export default { getGame, updateGame };