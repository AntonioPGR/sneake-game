export class Apple{
  private position: TAxles = {x:0, y:0}
  private table_size: TBoardSize = { max_x: 1, min_x: 0, max_y: 0, min_y: 0 }
  private square_size: number
  
  constructor({table_size, position, invalid_start_positions, square_size}:PropsApple) {
    this.setTableSize(table_size)
    if (position) { this.setPosition(position) }
    else { this.raffleNewPosition(invalid_start_positions) }
    this.square_size = square_size
  }

  // ACTIONS
  public raffleNewPosition(invalid_positions?: TAxles[]) {
    let new_position;
    if(!invalid_positions) invalid_positions = []
    do {
      new_position = this.generateNewPosition()
    } while(!this.isPositionValid(new_position, invalid_positions))
    this.setPosition(new_position)
  }

  public getPositionInPx(): TAxles {
    return {
      x: this.getPosition().x * this.square_size,
      y: this.getPosition().y * this.square_size
    }
  }

  private generateNewPosition() {
    const table = this.getTableSize()
    const new_position : TAxles = {
      x: Math.floor( Math.random() * (table.max_x - table.min_x)) + table.min_x,
      y: Math.floor( Math.random() * (table.max_y - table.min_y)) + table.min_y,
    } 
    return new_position;
  }

  private isPositionValid(position: TAxles, invalid_positions?: TAxles[]) {
    const current_positon = this.getPosition()
    if (position.x === current_positon.x && position.y === current_positon.y) {
      return false
    }
    if (invalid_positions) {
      const equals = invalid_positions.find(value => value.x === position.x && value.y === position.y)
      if (equals) return false
    }
    return true
  }

  // SETTERS
  private setTableSize(table_size:TBoardSize) {
    this.table_size = table_size
  }

  private setPosition(position:TAxles) {
    this.position = position
  }

  // GETTERS
  public getTableSize() {
    return this.table_size
  }

  public getPosition() {
    return this.position
  }

}