import { useEffect } from 'react';
import './App.css'
import routes from '~/routes';

function App() {

  useEffect(() => {
    fetch(`${routes.games}/abc`)
      .then(res => res.json())
      .then(res => console.log(res));
  }, [])

  return (
    <>
    </>
  )
}

export default App
