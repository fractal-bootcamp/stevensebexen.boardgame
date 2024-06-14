import { Request, Response } from "express"
import { getAllGames } from "./gameManager"

const getGamesHandler = (_: Request, res: Response) => {
  res.json(getAllGames().map(game => game.id));
}

export default getGamesHandler