import express, { NextFunction, Request, Response } from 'express';
import { createGameHandler, createUserHandler, getGameHandler, getGamesHandler, joinGameHandler, postMoveHandler } from './endpoints';

// Init
const app = express();
const PORT = 3000;

// Middleware
app.use((_: Request, res: Response, next: NextFunction) => {
  res
    .header('Access-Control-Allow-Origin', '*')
    .header('Access-Control-Allow-Methods', '*')
    .header('Access-Control-Allow-Headers', '*');
  
    next();
})
app.use(express.json());

// Endpoints
app.get('/', (_, res) => { res.json({hello: 'hi'}) });
app.get('/games/:id', getGameHandler);
app.get('/games', getGamesHandler)

app.post('/games/:id/move', postMoveHandler);
app.post('/games/:id/join', joinGameHandler);
app.post('/games', createGameHandler)
app.post('/user', createUserHandler);

// Listen
app.listen(PORT, () => { console.log(`Server listening on port ${PORT}.`)});