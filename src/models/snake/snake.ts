export class Snake{
  private positions: TPositionSQ[] 
  private direction: TDirections
  private length: TLengthSQ 
  private step: TStepsSQ 

  constructor(step: TStepsSQ, direction:TDirections, initial_position:TPositionSQ[]) {
    this.step = step
    this.direction = direction
    this.positions = initial_position
    this.length = initial_position.length
  }

  // STATUS
  public isCollidingWithItself() {
    const head_position = this.getHeadPosition()
    const positions = this.getPositions()
    const equal_positions = positions.filter((value) => value.x === head_position.x && value.y === head_position.y)

    if (equal_positions.length > 1) {
      return true
    }

    return false
  }

  // MOVEMENT
  public move() {
    const new_head_positon = this.calculateNewPosition()
    const current_positions = this.getPositions()
    const new_positions = [new_head_positon, ...current_positions]
    while (new_positions.length > this.length) {
      new_positions.pop()
    }
    this.positions = new_positions
  }

  private calculateNewPosition(setup_direction?:TDirections) :TPositionSQ {
    const head_position = this.getHeadPosition()
    const direction = setup_direction ?? this.getDirection()
    const step = this.getStep()
    let new_head_position = { ...head_position };
    switch (direction) {
      case "up":
        new_head_position.y = head_position.y - step
        break;
      case "down":
        new_head_position.y = head_position.y + step
        break;
      case "left":
        new_head_position.x = head_position.x - step
        break;
      case "right":
        new_head_position.x = head_position.x + step
        break;
    }
    return new_head_position
  }
  
  // DIRECTION
  public changeDirectionTo(direction: TDirections) {
    if (!this.isNewDirectionValid(direction)) return
    this.direction = direction
  }

  private isNewDirectionValid(new_direction: TDirections) {
    const new_position = this.calculateNewPosition(new_direction)
    const before_head_position = this.getPositions()[1]
    if (new_position.x === before_head_position.x && new_position.y === before_head_position.y) {
      return
    }
    switch (new_direction) {
      case "up":
        return this.direction !== 'down'
      case "down":
        return this.direction !== 'up'
      case "left":
        return this.direction !== 'right'
      case "right":
        return this.direction !== 'left'
    }
  }

  // SIZE
  public growUp() {
    this.length += 1
  }

  // GETTERS
  public getHeadPosition() {
    const full = this.getPositions()
    return full[0]
  }

  public getBodyPositions() {
    const positions = this.getPositions()
    if (positions.length <= 1) {
      return []
    }
    const body_positons = positions
    body_positons.shift()
    return body_positons
  }
  
  public getPositions() {
    return [...this.positions]
  }

  public getDirection() : TDirections {
    return this.direction
  }

  public getStep() : number {
    return Number(this.step)
  }

  // DRAW
  public draw(callback: TCallbackDraw) {
    const color_head = '#025E73'
    const position_head = this.getHeadPosition()
    callback(color_head, position_head)

    const color_body = '#026873'
    const body_positons = this.getBodyPositions()
    body_positons.map((position) => {
      callback(color_body, position);
    })
  }

}