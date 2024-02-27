"use client"

import { Card } from "@/type"

type Props = {
  cardList: Card[]
  onSelect: (card: Card) => void
}

export default function CardSelector({ cardList, onSelect }: Props) {
  return (
    <div className="flex flex-col h-40 flex-wrap box-content border-t border-l overflow-x-scroll">
      {cardList.sort((a, b) => a.number > b.number ? 1 : -1).map(card => (
        <div
          key={card.number}
          onClick={() => onSelect(card)}
          className="flex flex-col items-center justify-center h-20 w-20 py-1 border-b border-r"
        >
          <div className="w-12 h-12 border box-content flex flex-wrap bg-slate-900">
            {card.square.map((square, index) => (
              <div
                key={index}
                className="w-1.5 h-1.5"
                style={{
                  background: {
                    Empty: 'transparent',
                    Fill: 'yellow',
                    Special: 'orange',
                  }[square],
                }}
              />
            ))}

          </div>
          <div className="text-center text-xs mt-1 truncate w-20 px-1">{card.name}</div>
        </div>
      ))}
    </div>
  )
}
