"use client"

import { useState } from "react";
import CardSelector from "./CardSelector";
import { Card, CardPosition, Stage, StageSquareType, FixedCardInfo } from "@/type";
import CardController from "./CardController";
import { FIELD_ROWS, FIELD_COLS } from "../_consts/Size";
import EditorView from "./EditorView";
import Util from "../_util";

type Props = {
  cardList: Card[]
  stageList: Stage[]
}

export default function Editor({ cardList, stageList }: Props) {
  const [activeCard, setActiveCard] = useState<Card | null>(null)
  const [activeCardPosition, setActiveCardPosition] = useState<CardPosition>({ x: 6, y: 16 }) // 適当
  const [activeCardRotation, setActiveCardRotation] = useState<number>(0)
  const [fixedCardInfos, setFixedCardInfos] = useState<FixedCardInfo[]>([])

  const stage: Stage = stageList[0]

  const fieldSquares: StageSquareType[] = (() => {
    const squares = stage.square.concat()
    fixedCardInfos.forEach(fixedCardInfo => {
      const { card, position, rotation } = fixedCardInfo
      const cardStartIndex = position.y * FIELD_COLS + position.x
      const cardSquares = Util.rotateSquares(card.square, rotation)
      cardSquares.forEach((cardSquare, index) => {
        if (cardSquare === 'Empty') return

        const fieldIndex = cardStartIndex + Math.floor(index / 8) * FIELD_COLS + index % 8
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
    const cardStartIndex = activeCardPosition.y * FIELD_COLS + activeCardPosition.x
    const cardSquares = Util.rotateSquares(activeCard.square, activeCardRotation)
    cardSquares.forEach((cardSquare, index) => {
      if (!setableFlag || cardSquare === 'Empty') return

      const fieldIndex = cardStartIndex + Math.floor(index / 8) * FIELD_COLS + index % 8
      const fieldSquare = squares[fieldIndex]
      setableFlag = fieldSquare === 'I'

      if (connectFlag) return

      const isTopEnd = fieldIndex < FIELD_COLS
      const isBottomEnd = fieldIndex >= FIELD_COLS * (FIELD_ROWS - 1)
      const isLeftEnd = fieldIndex % FIELD_COLS === 0
      const idRightEnd = fieldIndex % FIELD_COLS + 1 === 0
      const connectCheckIndexes = []
      if (!isTopEnd) connectCheckIndexes.push(fieldIndex - FIELD_COLS)
      if (!isBottomEnd) connectCheckIndexes.push(fieldIndex + FIELD_COLS)
      if (!isLeftEnd) connectCheckIndexes.push(fieldIndex - 1)
      if (!idRightEnd) connectCheckIndexes.push(fieldIndex + 1)
      if (!isTopEnd && !isLeftEnd) connectCheckIndexes.push(fieldIndex - FIELD_COLS - 1)
      if (!isTopEnd && !idRightEnd) connectCheckIndexes.push(fieldIndex - FIELD_COLS + 1)
      if (!isBottomEnd && !isLeftEnd) connectCheckIndexes.push(fieldIndex + FIELD_COLS - 1)
      if (!isBottomEnd && !idRightEnd) connectCheckIndexes.push(fieldIndex + FIELD_COLS + 1)
      connectCheckIndexes.forEach(checkIndex => {
        if (squares[checkIndex] === 'A' || squares[checkIndex] === 'B') connectFlag = true
      })
    })
    return setableFlag && connectFlag
  })()

  return (
    <div className="flex flex-col items-center w-full">
      <EditorView
        activeCard={activeCard}
        activeCardPosition={activeCardPosition}
        activeCardRotation={activeCardRotation}
        fixedCardInfos={fixedCardInfos}
        isCardFixable={isCardFixable}
        fieldSquares={fieldSquares}
      />
      <CardSelector
        cardList={cardList}
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
            setActiveCard(null)
          }
        }}
      />
    </div>
  );
}
