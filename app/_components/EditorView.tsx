"use client"

import { Card, CardPosition, StageSquareType, FixedCardInfo } from "@/type"
import EditorField from "./EditorField";
import FixedCardList from "./FixedCardList";

type Props = {
  activeCard: Card | null
  activeCardPosition: CardPosition
  activeCardRotation: number
  fixedCardInfos: FixedCardInfo[]
  isCardFixable: boolean
  fieldSquares: StageSquareType[]
}

export default function EditorView({
  activeCard,
  activeCardPosition,
  activeCardRotation,
  fixedCardInfos,
  isCardFixable,
  fieldSquares,
}: Props) {
  return (
    <div className="flex w-full">
      <EditorField
        activeCard={activeCard}
        activeCardPosition={activeCardPosition}
        activeCardRotation={activeCardRotation}
        isCardFixable={isCardFixable}
        fieldSquares={fieldSquares}
      />
      <FixedCardList
        fixedCardInfos={fixedCardInfos}
      />
    </div>
  );
}
