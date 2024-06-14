import { useEffect, useState } from 'react';
import routes from '~/routes';
import { Game } from '~/types';
import GameBoard from './GameBoard';

function App() {
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    fetch(`${routes.games}/abc`)
      .then(res => res.json())
      .then(res => console.log(res));
  }, [])

  return (
    <>
      <p className='text-6xl'>Test</p>
      { game !== null && <GameBoard game={game} /> }
    </>
  )
}

export default App
