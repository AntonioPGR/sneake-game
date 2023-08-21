export class Apple{
  private position: TPositionSQ
  private limit_positions: TLimitSizeSQ
  
  constructor(limit_positions:TLimitSizeSQ, invalid_start_positions?:TPositionSQ[]) {
    this.limit_positions = {
      ...limit_positions,
      max_height: limit_positions.max_height - 1,
      max_width: limit_positions.max_width - 1,
    }
    this.position = this.generateNewPosition(invalid_start_positions)
  }

  public changeApplePosition(invalid_positions?:TPositionSQ[]) {
    this.position = this.generateNewPosition(invalid_positions)
  }

  private generateNewPosition(invalid_positions?:TPositionSQ[]):TPositionSQ {
    const limit_positions = this.limit_positions
    let new_position;
    do {
      new_position = {
        x: Math.floor( Math.random() * (limit_positions.max_width + 1 - limit_positions.min_width)) + limit_positions.min_width,
        y: Math.floor( Math.random() * (limit_positions.max_height + 1 - limit_positions.min_height)) + limit_positions.min_height,
      } 
    } while(!this.isPositionValid(new_position, invalid_positions))
    return new_position;
  }

  private isPositionValid(position: TPositionSQ, invalid_positions?: TPositionSQ[]) {
    const current_positon = this.position
    if (position.x === current_positon?.x && position.y === current_positon?.y) {
      return false
    }
    if (invalid_positions) {
      const equals = invalid_positions.find(value => value.x === position.x && value.y === position.y)
      if (equals) return false
    }
    return true
  }

  public getPosition() {
    return this.position
  }

  public draw(callback: TCallbackDraw) {
    const color = '#F26B5E  '
    const position = this.position
    callback(color, position)
  }

}