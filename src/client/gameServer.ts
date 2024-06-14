import axios from "axios";
import routes from "~/routes"
import { Game } from "~/types";

// Functions to interact with server
export const sendMove = async (gameId: string, source: number, destination: number): Promise<Game> => {
  const game = await axios.post(`${routes.games}/${gameId}/move`, { source, destination }, { withCredentials: true});
  return game.data;
}

interface NewGameResponse { message: string; game: Game }
export const sendNewGameRequest = async (): Promise<NewGameResponse> => {
  const response = await axios.post(routes.games, null, { withCredentials: true });
  return response.data;
}

export const getGame = async (gameId: string): Promise<Game> => {
  const game = await axios.get(`${routes.games}/${gameId}`, { withCredentials: true });
  return game.data;
}

interface JoinGameResponse {
  game?: Game
  message?: string
}
export const requestJoinGame = async (gameId: string): Promise<JoinGameResponse> => {
  const game = await axios.post(`${routes.games}/${gameId}/join`, null, { withCredentials: true });
  return game.data;
}

export const getAllGames = async (): Promise<string[]> => {
  const games = await axios.get(`${routes.games}`, { withCredentials: true });
  return games.data;
}