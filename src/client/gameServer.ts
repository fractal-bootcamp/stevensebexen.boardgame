import axios from "axios";
import routes from "~/routes"
import { Game } from "~/types";

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