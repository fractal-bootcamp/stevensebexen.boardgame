import { Game } from "~/types";
import crypto from 'crypto';
import { createDefaultGame } from "./game";

// Faked game DB
const games: Array<Game> = []

export const getGame = (id: string): Game | undefined => games.find(g => g.id === id);
export const getAllGames = () => games;

export const createGame = (): Game => {
  const id = crypto.randomBytes(16).toString('hex');
  const game = createDefaultGame(id);
  games.push(game);
  return game;
}

export const updateGame = (game0: Game): Game | undefined => {
  const game = getGame(game0.id);
  if (game === undefined) return undefined;

  Object.assign(game, game0);
  return game;
}

export const addPlayerToGame = (playerId: string, gameId: string) => {
  const game = getGame(gameId);
  if (!game) { return; }
  if (!game.players.find(player => player === playerId)) {
    game.players.push(playerId);
  }
}

export default 0;