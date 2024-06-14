import { createGameState, placeDefaultTokens } from './game';
import { Game } from "~/types";

const games: { [key: string]: Game } = {
  'abc': placeDefaultTokens(createGameState())
};

const getGame = (id: string): Game | null => games[id] || null;

export default { getGame };