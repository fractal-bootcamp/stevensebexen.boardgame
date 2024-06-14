import { Request, Response } from "express";
import { applyMove } from "./game";
import { addPlayerToGame, createGame, getAllGames, getGame, updateGame } from "./gameManager";
import { createUser } from "./userManager";

// POST /games
export const createGameHandler = (_: Request, res: Response) => {
  const game = createGame();
  res.json({ message: 'Successfully created game', gameId: game.id });
}

// GET /games/:id
export const getGameHandler = (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id || !getGame(id)) {
    res.status(404).send(`Game with id ${id} not found.`);
    return;
  }

  res.json(getGame(id));
}

// GET /games
export const getGamesHandler = (_: Request, res: Response) => {
  res.json(getAllGames().map(game => game.id));
}

// POST /games/:id/move
export const postMoveHandler = (req: Request, res: Response) => {
  const game = getGame(req.params.id);
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
  updateGame(game0);
}

// POST /users
export const createUserHandler = (_: Request, res: Response) => {
  const user = createUser();
  res.json(user);
}

// POST /games/:id/join
export const joinGameHandler = (req: Request, res: Response) => {
  const gameId = req.params.id;
  const userId = req.body.userId;
  
  const game = getGame(gameId);
  if (!game) {
    res.status(404).send('Game not found');
    return;
  }
  if (game.players.length >= 2) {
    res.send('That game is full');
    return;
  }
  addPlayerToGame(userId, gameId);
  res.json(game);
}