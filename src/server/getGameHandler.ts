import { Request, Response } from "express"
import { getGame } from "./gameManager";

// /games/:id
const getGameHandler = (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id || !getGame(id)) {
    res.status(404).send(`Game with id ${id} not found.`);
    return;
  }

  res.json(getGame(id));
}

export default getGameHandler;