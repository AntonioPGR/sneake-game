declare interface PropsSnake{
  step?: number
  start_position?: TAxles[],
  direction?: TDirections,
}

declare interface PropsApple{
  table_size: TBoardSize,
  position?: TAxles,
  invalid_start_positions?: TAxles[]
}

declare interface PropsGameBoard{
  canvas: HTMLCanvasElement,
  canvas_avaible_size_in_px: TAxles,
  squares_schemas: TAxles
}
