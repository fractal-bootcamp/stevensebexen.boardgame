import { useEffect, useState } from 'react';
import routes from '~/routes';
import { Game } from '~/types';
import GameBoard from './GameBoard';
import axios from 'axios';
import { getGame, sendMove, sendNewGameRequest } from './gameServer';

const POLL_INTERVAL = 2500;

enum View {
  GAMES,
  GAME
}

function App() {
  const [game, setGame] = useState<Game | null>(null);
  const [gameIds, setGameIds] = useState<Array<string>>([]);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [poller, setPoller] = useState<number>(0);
  const [view, setView] = useState<View>(View.GAMES);

  useEffect(() => {
    switch (view) {
      case View.GAMES:
        axios.get(`${routes.games}`)
          .then(res => setGameIds(res.data));
        break;

      case View.GAME:
        if (!game) break;
        axios.get(`${routes.games}/${game.id}`)
          .then(res => setGame(res.data));
        break;
    }
    
    setTimeout(() => setPoller(poller + 1), POLL_INTERVAL);
  }, [poller])

  const cellClicked = (position: number): void => {
    if (selectedCell === null) {
      game?.board[position] !== null && setSelectedCell(position);
      return
    }
    game?.id && sendMove(game?.id, selectedCell, position);
    setSelectedCell(null);
  }

  const newGame = () => {
    sendNewGameRequest();
  }

  const makeGameActive = (gameId: string) => {
    getGame(gameId)
      .then(res => {
        res && setGame(res);
        setView(View.GAME);
    });
  }

  return (
    <>
    { view === View.GAMES &&
      <>
        {gameIds.map(gameId => 
          <div key={gameId} onClick={() => makeGameActive(gameId)} className='select-none'>
            Game {gameId}
          </div>
        )}
        <button onClick={newGame}>new.</button>
      </>
    }
    { view === View.GAME &&
      <>
        { game !== null && <GameBoard game={game} cellClicked={cellClicked} selectedCell={selectedCell} /> }
        <button onClick={() => setView(View.GAMES)}>home.</button>
      </>
    }
    </>
  )
}

export default App
