"use client"

import { useState } from "react";
import { Card } from "@/type";

type Props = {
  onSelect: (card: Card) => void
}

const cardList: Card[] = [
  {
    name: "KoJudgekun",
    number: 102,
    specialCost: 3,
    square: [
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Fill",
      "Fill",
      "Special",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Fill",
      "Fill",
      "Fill",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Fill",
      "Empty",
      "Fill",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty"
    ],
  },
  {
    name: "Ajio",
    number: 193,
    specialCost: 4,
    square: [
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Fill",
      "Fill",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Fill",
      "Fill",
      "Fill",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Fill",
      "Special",
      "Fill",
      "Empty",
      "Empty",
      "Empty",
      "Fill",
      "Fill",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Fill",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty"
    ],
  },
  {
    name: "Anaaki",
    number: 115,
    specialCost: 5,
    square: [
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Fill",
      "Empty",
      "Empty",
      "Empty",
      "Fill",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Fill",
      "Special",
      "Fill",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Fill",
      "Fill",
      "Fill",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Fill",
      "Fill",
      "Fill",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Fill",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty"
    ],
  },
  {
    name: "Anemo",
    number: 191,
    specialCost: 5,
    square: [
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Fill",
      "Empty",
      "Empty",
      "Empty",
      "Fill",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Fill",
      "Fill",
      "Fill",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Fill",
      "Empty",
      "Fill",
      "Empty",
      "Fill",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Special",
      "Empty",
      "Fill",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Fill",
      "Empty",
      "Fill",
      "Empty",
      "Fill",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty",
      "Empty"
    ],
  },
]

export default function CardSelector({ onSelect }: Props) {
  return (
    <div className="flex flex-col h-24 p-4">
      {cardList.map(card => (
        <div
          key={card.number}
          onClick={() => onSelect(card)}
        >
          {card.name}</div>
      ))}
    </div>
  )
}
