declare interface PropsSnake{
  step?: number
  start_position?: TPositionPX[],
  direction?: TDirections,
}

declare interface PropsApple{
  table_size: TLimitSize,
  position?: TPositionPX,
  invalid_start_positions?: TPositionPX[],
  square_size: number
}

declare interface PropsGameBoard{
  canvas: HTMLCanvasElement,
  canvas_avaible_size: TPositionPX,
  squares_schemas: TPositionPX
}

declare interface PropsGameController{
  canvas_id: string
}

declare interface PropsCanvasDrawer{
  canvas: HTMLCanvasElement
}