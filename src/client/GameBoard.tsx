import { Game } from "~/types";

interface GameBoardProps {
  game: Game
}

const GameBoard = (props: GameBoardProps) => {
  return (
    <div className='flex flex-row flex-wrap w-[576px]'>
      { props.game.board.map(cell =>
        <div className='flex-0 basis-[72px] h-[72px] border'>
          {<img src={cell?.image} />}
        </div>
      )}
    </div>
  )
}

export default GameBoard;