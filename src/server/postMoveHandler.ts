import { Request, Response } from "express";
import gameManager from "./gameManager";
import { applyMove } from "./game";

// games/:id/move
const postMoveHandler = (req: Request, res: Response) => {
  const game = gameManager.getGame(req.params.id);
  if (!game) {
    res.status(404).send('Game not found');
    return;
  }

  const moveInfo = req.body as { source: number, destination: number }
  if (!moveInfo.source || !moveInfo.destination) {
    res.status(400).send(`Invalid move: ${moveInfo.source}, ${moveInfo.destination}`);
    return;
  }

  const game0 = applyMove(game, moveInfo.source, moveInfo.destination);
  gameManager.updateGame(game0);
}

export default postMoveHandler;