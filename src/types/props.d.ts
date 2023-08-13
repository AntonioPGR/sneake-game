declare interface PropsSnake{
  step?: number
  start_position?: TPosition[],
  direction?: TDirections,
}

declare interface PropsApple{
  table_size: TBoardSize,
  position?: TPosition,
  invalid_start_positions?: TPosition[]
}
