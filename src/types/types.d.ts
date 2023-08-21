declare type TPositionPX = {
  x: number,
  y: number
}

declare type TPositionSQ = TPositionPX

declare type TSizePX = {
  width: number,
  height: number
}

declare type TSizeSQ = TSizePX

declare type TLimitSizeSQ = {
  max_width: number
  min_width: number
  max_height: number
  min_height: number
}

declare type TLimitSizePX = TLimitSizeSQ

declare type TDirections = 'up' | 'down' | 'left' | 'right'

declare type TDrawData = {
  shape: TShape,
  size: TPositionPX,
  color: string,
  start_position: TPositionPX
}

declare type TVoidFunction = () => void

declare type TMiliseconds = number

declare type TStepsSQ = number

declare type TLengthSQ = number

declare type TCallbackDraw = (color: string, position: TPositionSQ) => void