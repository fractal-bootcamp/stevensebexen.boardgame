import { Request, Response } from "express";
import crypto from 'crypto';
import { createDefaultGame } from "./game";
import { createGame } from "./gameManager";

const createGameHandler = (req: Request, res: Response) => {
  const id = crypto.randomBytes(16).toString('hex');
  const game = createDefaultGame(id);
  createGame(game);
  res.json({ message: 'Successfully created game.', id: game.id });
}

export default createGameHandler;