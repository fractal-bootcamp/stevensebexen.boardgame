import { useEffect, useState } from 'react';
import routes from '~/routes';
import { Game } from '~/types';
import GameBoard from './GameBoard';
import axios from 'axios';
import { createUser, getAllGames, requestJoinGame, sendMove, sendNewGameRequest } from './gameServer';

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
  const [userId, setUserId] = useState<string>('');

  // Polling
  useEffect(() => {
    switch (view) {
      case View.GAMES:
        getAllGames()
          .then(games => setGameIds(games));
        break;

      case View.GAME:
        if (!game) break;
        axios.get(`${routes.games}/${game.id}`)
          .then(res => setGame(res.data));
        break;
    }
    
    setTimeout(() => setPoller(poller + 1), POLL_INTERVAL);
  }, [poller])

  // Assign user id
  useEffect(() => {
    createUser()
      .then(res => setUserId(res.id));
  }, []);

  const cellClicked = (position: number): void => {
    if (selectedCell === null) {
      game?.board[position] !== null && setSelectedCell(position);
      return
    }
    if (game) {
      const game0 = sendMove(game?.id, selectedCell, position);
    }
    setSelectedCell(null);
  }

  const newGame = () => {
    sendNewGameRequest();
  }

  const joinGame = (gameId: string) => {
    requestJoinGame(gameId, userId)
      .then(game => {
        setGame(game);
        setView(View.GAME);
    });
  }

  return (
    <>
    { view === View.GAMES &&
      <>
        {gameIds.map(gameId => 
          <div key={gameId} onClick={() => joinGame(gameId)} className='select-none'>
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
