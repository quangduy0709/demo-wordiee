import React from 'react'
import Keyboard from '../Keyboard/Keyboard'
import Square from '../Square/Square'
import './board.css'
interface IProps {
    board: string[]
}
const Board: React.FC<IProps> = (props) => {
    const { board } = props
    return (
        <>

            <div className="board">
                {board.map((square, index) => {
                    return (
                        <div key={index}>
                            <Square value={square} squareIndex={index} />
                        </div>
                    )
                })}
            </div>
            <div className="keyBoard">
                <Keyboard />
            </div>
        </>
    )
}

export default Board