import React from 'react'
import Key from '../Key/Key'
import './keyboard.css'
import { setBoard } from '../../Redux/boardSlice'
import { rootState } from '../interface'
import { decPos } from '../../Redux/boardSlice'
import { incRow } from '../../Redux/boardSlice'
import { useSelector, useDispatch } from 'react-redux'
import wordList from '../../word.json'

const Keyboard: React.FC = () => {
    const rows: string[] = [
        "q w e r t y u i o p",
        "a s d f g h j k l",
        "z x c v b n m"]
    let allWords = wordList.words
    const position = useSelector((state: rootState) => state.board.pos)
    const board = useSelector((state: rootState) => state.board.board)
    const dispatch = useDispatch()
    const row = useSelector((state: rootState) => state.board.row)
    const correctWord = useSelector((state: rootState) => state.board.correctWord)
    let boardsWords: string = `${board[position - 5]}${board[position - 4]}${board[position - 3]}${board[position - 2]}${board[position - 1]}`.toLowerCase()

    const clickBack = () => {
        if (Math.floor((position - 1) / 5) < row) return

        const newBoard = [...board]
        newBoard[position - 1] = " "
        dispatch(decPos())
        dispatch(setBoard(newBoard))
    }
    const clickEnter = () => {
        console.log(correctWord);
        

        if (allWords.includes(boardsWords)) {
            if (position % 5 === 0 && position !== 0) {
                dispatch(incRow())

                

            }
        } else if (!allWords.includes(boardsWords) ) {
            alert('Invalid word')
        }
        if (boardsWords.includes(correctWord)) {
            alert('you win !!')
            window.location.reload();
        }
        if (position >= 30){
            alert('You lose')
            window.location.reload();
       
        }



    }
    return (
        <div className="keyboard-container">
            {rows.map((row, index) => {
                return (
                    <div className="row" key={index}>
                        {index === 2 && (<span onClick={clickEnter} className="letter-row">Enter </span>)}
                        {row.split(" ").map((letter, index) => {
                            return (
                                <div className="letter-row" key={index}>
                                    <Key letter={letter.toUpperCase()} />
                                    {letter === "m" && <span onClick={clickBack}> Back</span>}
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default Keyboard 