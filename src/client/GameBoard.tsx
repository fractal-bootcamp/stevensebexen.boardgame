import { Game } from "~/types";

interface GameBoardProps {
  game: Game
  cellClicked: (position: number) => void
  selectedCell: number | null
}

// Controlled representation of game board
const GameBoard = (props: GameBoardProps) => {
  return (
    <div className='flex flex-row flex-wrap w-[576px]'>
      { props.game.board.map((cell, index) =>
        <div
          key={index}
          className='flex-0 basis-[72px] h-[72px] border'
          onClick={ () => { props.cellClicked(index) } }
          style={{ borderWidth: props.selectedCell === index ? '2px' : '1px', borderColor: props.selectedCell === index ? '#db3944' : '#808080' }}
        >
          {<img src={cell?.image} />}
        </div>
      )}
    </div>
  )
}

export default GameBoard;