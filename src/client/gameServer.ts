import axios from "axios";
import routes from "~/routes"

// Functions to interact with server
const sendMove = (gameId: string, source: number, destination: number): void => {
  axios.post(`${routes.games}/${gameId}/move`, { source, destination });
}

export default { sendMove }