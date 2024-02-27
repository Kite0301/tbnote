export type CardPosition = {
  x: number
  y: number
}

export type CardSquareType = 'Empty' | 'Fill' | 'Special'

export type Card = {
  name: string
  number: number
  specialCost: number
  square: CardSquareType[]
}
// O ... outside
// I ... inside
// X ... unavailable
// A ... special block (mine)
// B ... normal block (mine)
// C ... special block (enemy)
// D ... normal block (enemy)
export type StageSquareType = 'O' | 'I' | 'X' | 'A' | 'B' | 'C' | 'D'

export type Stage = {
  name: string
  square: StageSquareType[]
}

export type FixedCardInfo = {
  card: Card
  position: CardPosition
  rotation: number
}
