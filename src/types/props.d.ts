declare interface PropsSnake{
  step?: number
  start_position?: TAxles[],
  direction?: TDirections,
}

declare interface PropsApple{
  table_size: TBoardSize,
  position?: TAxles,
  invalid_start_positions?: TAxles[],
  square_size: number
}

declare interface PropsGameBoard{
  canvas: HTMLCanvasElement,
  canvas_avaible_size: TAxles,
  squares_schemas: TAxles
}

declare interface PropsGameController{
  canvas_id: string
}

declare interface PropsCanvasDrawer{
  canvas: HTMLCanvasElement
}