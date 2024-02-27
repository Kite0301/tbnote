"use client"

import { FixedCardInfo } from "@/type"

type Props = {
  fixedCardInfos: FixedCardInfo[]
}

export default function FixedCardList({
  fixedCardInfos,
}: Props) {
  return (
    <div className="grow ml-2">
      {fixedCardInfos.map((cardInfo) => {
        const { name, number } = cardInfo.card
        return (
          <span
            key={number}
            className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 max-w-full">
            {name}
          </span>
        )
      })}
    </div>
  );
}
