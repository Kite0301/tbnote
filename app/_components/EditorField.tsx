"use client"

import { Card, CardPosition, StageSquareType } from "@/type";
import { FIELD_ROWS, FIELD_COLS, FIELD_SQUARE_LENGTH } from "../_consts/Size";
import EditorActiveCard from "./EditorActiveCard";

type Props = {
  activeCard: Card | null
  activeCardPosition: CardPosition
  activeCardRotation: number
  isCardFixable: boolean
  fieldSquares: StageSquareType[]
}

export default function EditorField({
  activeCard,
  activeCardPosition,
  activeCardRotation,
  isCardFixable,
  fieldSquares,
}: Props) {
  return (
    <div
      style={{ width: FIELD_COLS * FIELD_SQUARE_LENGTH, height: FIELD_ROWS * FIELD_SQUARE_LENGTH }}
      className="shrink-0 relative flex flex-wrap border border box-content border-slate-500"
    >
      {fieldSquares.map((square, index) =>
        <div
          key={index}
          style={{
            width: FIELD_SQUARE_LENGTH,
            height: FIELD_SQUARE_LENGTH,
            background: {
              'O': 'transparent',
              'I': 'black',
              'X': 'gray',
              'A': 'orange',
              'B': 'yellow',
              'C': 'blue',
              'D': 'lightblue',
            }[square],
            borderRight: (index + 1) % FIELD_COLS === 0 ? 'none' : '1px solid rgba(255, 255, 255, 0.25)',
            borderBottom: index + 1 > (FIELD_ROWS - 1) * FIELD_COLS ? 'none' : '1px solid rgba(255, 255, 255, 0.25)',
          }}
        />
      )}
      {activeCard && (
        <EditorActiveCard
          activeCard={activeCard}
          activeCardPosition={activeCardPosition}
          activeCardRotation={activeCardRotation}
          isCardFixable={isCardFixable}
        />
      )}
    </div>
  );
}
