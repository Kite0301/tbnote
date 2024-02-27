import { CardSquareType } from "@/type"

const Util = {
  rotateSquares: (squares: CardSquareType[], rotation: number): CardSquareType[] => {
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
}

export default Util
