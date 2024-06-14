import { useEffect, useState } from 'react';
import routes from '~/routes';
import { Game } from '~/types';
import GameBoard from './GameBoard';
import axios from 'axios';
import { getAllGames, getGame, requestJoinGame, sendMove, sendNewGameRequest } from './gameServer';

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

  // Polling
  useEffect(() => {
    switch (view) {
      case View.GAMES:
        getAllGames()
          .then(games => setGameIds(games));
        break;

      case View.GAME:
        if (!game) break;
        getGame(game.id)
          .then(res => setGame(res));
        break;
    }
    
    setTimeout(() => setPoller(poller + 1), POLL_INTERVAL);
  }, [poller])

  const cellClicked = (position: number): void => {
    if (selectedCell === null) {
      game?.board[position] !== null && setSelectedCell(position);
      return
    }
    if (game) {
      sendMove(game?.id, selectedCell, position)
        .then(res => setGame(res));
    }
    setSelectedCell(null);
  }

  const newGame = () => {
    sendNewGameRequest()
      .then(res => {
        if (res.game) {
          setGame(res.game);
          setView(View.GAME);
        }
        else {
          console.log(res.message);
        }
      });
  }

  const joinGame = (gameId: string) => {
    requestJoinGame(gameId)
      .then(res => {
        if (res.game) {
          setGame(res.game);
          setView(View.GAME);
        }
        else {
          console.log(res.message);
        }
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
        <div>Players: {game?.players.join(', ')}</div>
        <button onClick={() => setView(View.GAMES)}>home.</button>
      </>
    }
    </>
  )
}

export default App
