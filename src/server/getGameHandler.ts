import { Request, Response } from "express"
import gameManager from "./gameManager";

const getGameHandler = (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id || !gameManager.getGame(id)) {
    res.status(404).send(`Game with id ${id} not found.`);
    return;
  }

  res.json(gameManager.getGame(id));
}

export default getGameHandler;