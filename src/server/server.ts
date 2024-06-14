import express, { NextFunction, Request, Response } from 'express';
import getGameHandler from './getGameHandler';

const app = express();
const PORT = 3000;

app.use((_: Request, res: Response, next: NextFunction) => {
  res
    .header('Access-Control-Allow-Origin', '*')
    .header('Access-Control-Allow-Methods', '*')
    .header('Access-Control-Allow-Headers', '*');
  
    next();
})
app.use(express.json());

app.get('/', (req, res) => { res.json({hello: 'hi'}) });
app.get('/games/:id', getGameHandler);

app.listen(PORT, () => { console.log(`Server listening on port ${PORT}.`)});