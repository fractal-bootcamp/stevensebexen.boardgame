import axios from "axios";
import routes from "~/routes"
import { Game, User } from "~/types";

// Functions to interact with server
export const sendMove = async (gameId: string, source: number, destination: number): Promise<Game> => {
  const game = await axios.post(`${routes.games}/${gameId}/move`, { source, destination });
  return game.data;
}

interface NewGameResponse { message: string; gameId: string }
export const sendNewGameRequest = async (): Promise<NewGameResponse> => {
  const response = await axios.post(routes.games);
  return response.data;
}

export const getGame = async (gameId: string): Promise<Game> => {
  const game = await axios.get(`${routes.games}/${gameId}`);
  return game.data;
}

export const createUser = async (): Promise<User> => {
  const user = await axios.post(`${routes.users}`);
  return user.data;
}

export const requestJoinGame = async (gameId: string, userId: string): Promise<Game> => {
  const game = await axios.post(`${routes.games}/${gameId}/join`, { userId });
  return game.data;
}

export const getAllGames = async (): Promise<string[]> => {
  const games = await axios.get(`${routes.games}`);
  return games.data;
}