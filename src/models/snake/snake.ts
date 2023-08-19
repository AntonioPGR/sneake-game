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
    const positions = this.positions
    const equal_positions = positions.filter((value) => value.x === head_position.x && value.y === head_position.y)

    if (equal_positions.length > 1) {
      return true
    }

    return false
  }

  // MOVEMENT
  public move() {
    const calculated_position = this.calculateNewPosition()
    const new_positions = [calculated_position, ...this.positions]
    while (new_positions.length > this.length) {
      new_positions.pop()
    }
    this.positions = new_positions
  }

  private calculateNewPosition() {
    const head_position = this.getHeadPosition()
    const direction = this.direction
    const step = this.step
    let new_position = {
      y: head_position.y,
      x: head_position.x
    };
    switch (direction) {
      case 'up':
        new_position!.y = head_position.y - step;
        break;
      case "down":
        new_position!.y = head_position.y + step;
        break;
      case "left":
        new_position!.x = head_position.x - step;
        break;
      case "right":
        new_position!.x = head_position.x + step;
        break;
    }
    return new_position
  }
  
  // DIRECTION
  public changeDirectionTo(direction: TDirections) {
    if (!this.isNewDirectionValid(direction)) return
    
    switch (direction) {
      case "up":
        this.direction = 'up'
        break;
      case "down":
        this.direction = 'down'
        break;
      case "left":
        this.direction = 'left'
        break;
      case "right":
        this.direction = 'right'
        break;
    }
  }

  private isNewDirectionValid(new_direction: TDirections) {
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
    const full = this.positions
    return full[0]
  }
  
  public getPositions() {
    return [...this.positions]
  }

  public getDirection() {
    return this.direction
  }

}