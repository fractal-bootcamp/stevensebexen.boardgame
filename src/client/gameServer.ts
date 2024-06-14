import axios from "axios";
import routes from "~/routes"
import { Game, User } from "~/types";

// Functions to interact with server
export const sendMove = (gameId: string, source: number, destination: number): void => {
  axios.post(`${routes.games}/${gameId}/move`, { source, destination });
}

export const sendNewGameRequest = () => {
  axios.post(routes.games);
}

export const getGame = async (gameId: string): Promise<Game> => {
  const response = await axios.get(`${routes.games}/${gameId}`);
  return response.data;
}

export const createUser = async (): Promise<User> => {
  const user = await axios.post(`${routes.users}`);
  return user.data;
}

export const requestJoinGame = async (gameId: string, userId: string): Promise<Game> => {
  const game = await axios.post(`${routes.games}/${gameId}/join`, { userId });
  return game.data;
}