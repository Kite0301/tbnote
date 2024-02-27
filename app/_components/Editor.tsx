"use client"

import { useState } from "react";
import CardSelector from "./CardSelector";
import { Card, CardPosition, CardSquareType, Stage, StageSquareType, FixedCardInfo } from "@/type";
import CardController from "./CardController";
import { StageList } from "../_consts/Stage";

const stage: Stage = StageList[0]

const activeSquareStyle = (square: CardSquareType, isActive: boolean) => (
  {
    Empty: {
      backgroud: 'transparent',
    },
    Fill: {
      background: `repeating-linear-gradient(-45deg, ${isActive ? 'yellow' : 'lightgray'}, ${isActive ? 'yellow' : 'lightgray'} 1px,transparent 0,transparent 4px)`,
    },
    Special: {
      backgroundImage: `radial-gradient(${isActive ? 'orange' : 'lightgray'} 30%, transparent 40%)`,
      backgroundSize: '3px 3px',
    }
  }[square]
)

const rotateSquares = (squares: CardSquareType[], rotation: number): CardSquareType[] => {
  let rotatedSquares = squares
  for (let index = 0; index < rotation; index++) {
    const newSquare: CardSquareType[] = []
    rotatedSquares.forEach((square, index) => {
      const x = index % 8
      const y = Math.floor(index / 8)
      const newX = y
      const newY = 7 - x
      const newIndex = newX + newY * 8
      newSquare[newIndex] = square
    })
    rotatedSquares = newSquare
  }
  return rotatedSquares
}

export default function Editor() {
  const WRAPPER_ROWS = 30
  const WRAPPER_COLS = 20
  const SQUARE_LENGTH = 12

  const [activeCard, setActiveCard] = useState<Card | null>(null)
  const [activeCardPosition, setActiveCardPosition] = useState<CardPosition>({ x: 0, y: 0 })
  const [activeCardRotation, setActiveCardRotation] = useState<number>(0)
  const [fixedCardInfos, setFixedCardInfos] = useState<FixedCardInfo[]>([])

  const fieldSquares: StageSquareType[] = (() => {
    const squares = stage.square.concat()
    fixedCardInfos.forEach(fixedCardInfo => {
      const { card, position, rotation } = fixedCardInfo
      const cardStartIndex = position.y * WRAPPER_COLS + position.x
      const cardSquares = rotateSquares(card.square, rotation)
      cardSquares.forEach((cardSquare, index) => {
        if (cardSquare === 'Empty') return

        const fieldIndex = cardStartIndex + Math.floor(index / 8) * WRAPPER_COLS + index % 8
        const fieldSquare = squares[fieldIndex]
        if (fieldSquare !== 'I') {
          console.warn(`Invalid card position. index: ${fieldIndex}, square: ${fieldSquare}`)
          return
        }
        squares[fieldIndex] = cardSquare === 'Special' ? 'A' : 'B'
      })
    })
    return squares
  })()

  const isCardFixable: boolean = (() => {
    if (!activeCard) return false

    let setableFlag: boolean = true
    let connectFlag: boolean = false
    const squares = fieldSquares.concat()
    const cardStartIndex = activeCardPosition.y * WRAPPER_COLS + activeCardPosition.x
    const cardSquares = rotateSquares(activeCard.square, activeCardRotation)
    cardSquares.forEach((cardSquare, index) => {
      if (!setableFlag || cardSquare === 'Empty') return

      const fieldIndex = cardStartIndex + Math.floor(index / 8) * WRAPPER_COLS + index % 8
      const fieldSquare = squares[fieldIndex]
      setableFlag = fieldSquare === 'I'

      if (connectFlag) return

      const isTopEnd = fieldIndex < WRAPPER_COLS
      const isBottomEnd = fieldIndex >= WRAPPER_COLS * (WRAPPER_ROWS - 1)
      const isLeftEnd = fieldIndex % WRAPPER_COLS === 0
      const idRightEnd = fieldIndex % WRAPPER_COLS + 1 === 0
      const connectCheckIndexes = []
      if (!isTopEnd) connectCheckIndexes.push(fieldIndex - WRAPPER_COLS)
      if (!isBottomEnd) connectCheckIndexes.push(fieldIndex + WRAPPER_COLS)
      if (!isLeftEnd) connectCheckIndexes.push(fieldIndex - 1)
      if (!idRightEnd) connectCheckIndexes.push(fieldIndex + 1)
      if (!isTopEnd && !isLeftEnd) connectCheckIndexes.push(fieldIndex - WRAPPER_COLS - 1)
      if (!isTopEnd && !idRightEnd) connectCheckIndexes.push(fieldIndex - WRAPPER_COLS + 1)
      if (!isBottomEnd && !isLeftEnd) connectCheckIndexes.push(fieldIndex + WRAPPER_COLS - 1)
      if (!isBottomEnd && !idRightEnd) connectCheckIndexes.push(fieldIndex + WRAPPER_COLS + 1)
      connectCheckIndexes.forEach(checkIndex => {
        if (squares[checkIndex] === 'A' || squares[checkIndex] === 'B') connectFlag = true
      })
    })
    return setableFlag && connectFlag
  })()

  return (
    <div className="flex flex-col items-center">
      <div
        style={{ width: WRAPPER_COLS * SQUARE_LENGTH, height: WRAPPER_ROWS * SQUARE_LENGTH }}
        className="relative flex flex-wrap"
      >
        {fieldSquares.map((square, index) =>
          <div
            key={index}
            style={{
              width: SQUARE_LENGTH,
              height: SQUARE_LENGTH,
              background: {
                'O': 'transparent',
                'I': 'black',
                'X': 'gray',
                'A': 'orange',
                'B': 'yellow',
                'C': 'blue',
                'D': 'lightblue',
              }[square],
              borderRight: '1px solid #333',
              borderBottom: '1px solid #333',
            }}
          />
        )}
        {activeCard && (
          <div
            style={{
              width: SQUARE_LENGTH * 8,
              height: SQUARE_LENGTH * 8,
              top: activeCardPosition.y * SQUARE_LENGTH,
              left: activeCardPosition.x * SQUARE_LENGTH,
              boxSizing: 'content-box',
              border: '1px dashed #fff',
            }}
            className="absolute flex flex-wrap"
          >
            {rotateSquares(activeCard.square, activeCardRotation).map((square, index) => (
              <div
                key={index}
                style={{
                  ...activeSquareStyle(square, isCardFixable),
                  width: SQUARE_LENGTH,
                  height: SQUARE_LENGTH,
                }}
              />
            ))}
          </div>
        )}
      </div>
      <CardSelector
        onSelect={(card) => {
          setActiveCard(card)
        }}
      />
      <CardController
        activeCardPosition={activeCardPosition}
        activeCardRotation={activeCardRotation}
        isFixable={isCardFixable}
        onChangeCardPosition={(newPosition) => setActiveCardPosition(newPosition)}
        onChangeCardRotation={(newRotation) => setActiveCardRotation(newRotation)}
        onFixed={() => {
          if (activeCard) {
            setFixedCardInfos(fixedCardInfos.concat([{
              card: activeCard,
              position: activeCardPosition,
              rotation: activeCardRotation,
            }]))
          }
        }}
      />
    </div>
  );
}
