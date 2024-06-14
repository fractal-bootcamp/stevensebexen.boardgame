import { useEffect, useState } from 'react';
import routes from '~/routes';
import { Game } from '~/types';
import GameBoard from './GameBoard';
import axios from 'axios';
import gameServer from './gameServer';

function App() {
  const [game, setGame] = useState<Game | null>(null);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [poller, setPoller] = useState<number>(0);

  useEffect(() => {
    axios.get(`${routes.games}/abc`)
      .then(res => setGame(res.data));
    
    setTimeout(() => setPoller(poller + 1), 1000);
  }, [poller])

  const cellClicked = (position: number): void => {
    if (selectedCell === null) {
      game?.board[position] !== null && setSelectedCell(position);
      return
    }
    game?.id && gameServer.sendMove(game?.id, selectedCell, position);
    setSelectedCell(null);
  }

  return (
    <>
      <p className='text-6xl'>Test</p>
      { game !== null && <GameBoard game={game} cellClicked={cellClicked} selectedCell={selectedCell} /> }
    </>
  )
}

export default App
