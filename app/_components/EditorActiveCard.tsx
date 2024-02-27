"use client"

import { Card, CardPosition, CardSquareType } from "@/type";
import { FIELD_SQUARE_LENGTH } from "../_consts/Size";
import Util from "../_util";

type Props = {
  activeCard: Card
  activeCardPosition: CardPosition
  activeCardRotation: number
  isCardFixable: boolean
}

export default function EditorActiveCard({
  activeCard,
  activeCardPosition,
  activeCardRotation,
  isCardFixable,
}: Props) {
  return (
    <div
      style={{
        width: FIELD_SQUARE_LENGTH * 8,
        height: FIELD_SQUARE_LENGTH * 8,
        top: activeCardPosition.y * FIELD_SQUARE_LENGTH,
        left: activeCardPosition.x * FIELD_SQUARE_LENGTH,
      }}
      className="absolute flex flex-wrap"
    >
      {Util.rotateSquares(activeCard.square, activeCardRotation).map((square, index) => (
        <div
          key={index}
          style={{
            ...activeSquareStyle(square, isCardFixable),
            width: FIELD_SQUARE_LENGTH,
            height: FIELD_SQUARE_LENGTH,
          }}
        />
      ))}
    </div>
  );
}

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
