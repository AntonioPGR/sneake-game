declare type TAxles = {
  x: number,
  y: number
}

declare type TBoardSize = {
  max_x: number
  min_x: number
  max_y: number
  min_y: number
}

declare type TDirections = 'up' | 'down' | 'left' | 'right'

declare type TShape = 'square'

type THexLetters = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
type THexNumbers = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type THexChar = THexLetters | THexNumbers
type THex3 = `${THexChar}${THexChar}${THexChar}`
type THex6 = `${THex3}${THex3}`
declare type THexadecimal = `#${THex6}`

declare type TDrawData = {
  shape: TShape,
  size: TAxles,
  color: string,
  start_position: TAxles
}