"use client"

import { Card, CardPosition } from "@/type"

type Props = {
  activeCardPosition: { x: number; y: number; }
  activeCardRotation: number
  isFixable: boolean
  onChangeCardPosition: (position: CardPosition) => void
  onChangeCardRotation: (rotation: number) => void
  onFixed: () => void
}

export default function CardController({
  activeCardPosition,
  activeCardRotation,
  isFixable,
  onChangeCardPosition,
  onChangeCardRotation,
  onFixed,
}: Props) {
  return (
    <div className="flex items-center mt-4">
      <div
        className="triangle-left"
        onClick={() => {
          const newPosition = { ...activeCardPosition }
          newPosition.x--
          onChangeCardPosition(newPosition)
        }}
      />
      <div className="h-24 flex flex-col justify-between">
        <div
          className="triangle-top"
          onClick={() => {
            const newPosition = { ...activeCardPosition }
            newPosition.y--
            onChangeCardPosition(newPosition)
          }}
        />
        <div
          className="triangle-bottom"
          onClick={() => {
            const newPosition = { ...activeCardPosition }
            newPosition.y++
            onChangeCardPosition(newPosition)
          }}
        />
      </div>
      <div
        className="triangle-right"
          onClick={() => {
          const newPosition = { ...activeCardPosition }
          newPosition.x++
          onChangeCardPosition(newPosition)
        }}
      />
      <div
        className="p-4 shadow-sm bg-purple-500 w-12 h-12 rounded-full ml-4"
        onClick={() => {
          const newRotation = activeCardRotation === 3 ? 0 : activeCardRotation + 1
          onChangeCardRotation(newRotation)
        }}
      />
      <div className="h-24 flex flex-col justify-between ml-4">
        <button
          className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${isFixable ? 'hover:bg-blue-700' : 'opacity-50 cursor-not-allowed'}`}
          disabled={!isFixable}
          onClick={() => isFixable && onFixed()}
        >
          決定
        </button>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          戻る
        </button>
      </div>
    </div>
  )
}
