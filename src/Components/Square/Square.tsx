import React, { useEffect } from 'react'
import './square.css'
import { motion } from 'framer-motion'
import { rootState } from '../interface'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
interface IProps {
  value: string;
  squareIndex: number;
}
const Square: React.FC<IProps> = (props) => {
  const { value, squareIndex } = props

  const correctWord = useSelector((state: rootState) => state.board.correctWord).toUpperCase()
  const position = useSelector((state: rootState) => state.board.pos)
  const reduxRow = useSelector((state: rootState) => state.board.row)
  const [correct, setCorrect] = useState<boolean>(false)
  const [allmost, setAllmost] = useState<boolean>(false)
  const [wrong, setWrong] = useState<boolean>(false)
  let worLastIndex = 4
  let currentPos = position === 5 ? worLastIndex : position > 5 && position % 5 === 0 ? worLastIndex : (position % 5) - 1
  const variants = {
    filled: () => ({
      scale: [1.2, 1],
      transition: {
        duration: 0.2
      }
    }),
    unfilled: () => ({
      scale: [1.2, 1],
      transition: {
        duration: 0.2
      }
    })
  }
  useEffect(() => {



    if (correctWord[currentPos] === value) {
      setCorrect(true)
    } else if (!correct && value !== '' && correctWord.includes(value)) {
      setAllmost(true)
    } else if (!correct && value !== '' && !correctWord.includes(value)) {
      setWrong(true)
    }


    return () => {
      setCorrect(false)
      setAllmost(false)
      setWrong(false)
    }
  }, [value])
  const status: any = Math.floor(squareIndex / 5) < reduxRow && (correct ? "correct" : allmost ? "allmost" : wrong ? "wrong" : '')
  return (
    <motion.div animate={value ? "filled" : "unfilled"} variants={variants}>
      <div className="square" id={status ? status : 0}>
        {value}
      </div>
    </motion.div>
  )
}

export default Square 