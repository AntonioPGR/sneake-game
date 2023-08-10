interface PropsSnake{
  step: number
  start_coordinates?: TCoordinates,
  direction?: TDirections
}

export class Snake{
  private coordinates: TCoordinates[] = [{x:0, y:0}]
  private direction: TDirections = 'up'
  private step: number = 1

  constructor({ step, start_coordinates, direction }: PropsSnake) {
    if(step) this.setStep(step)
    if(start_coordinates) this.setCoordinates([start_coordinates]) 
    if(direction) this.setDirection(direction)
  }

  // STATUS
  public isDead() {
    
    const head_position = this.getCurrentHeadCoordinate()
    const coordinates = this.getFullCoordinates()
    console.log(coordinates)

    const equal_coordinates = coordinates.filter((value) => value === head_position)
    if (equal_coordinates.length === 0) {
      return true
    }
    return false
  }

  // MOVEMENT
  public move() {
    const new_position = this.calculateNewPosition()
    const new_coordinates = [new_position, ...this.getFullCoordinates()]
    console.log(new_coordinates)
    this.setCoordinates(new_coordinates)
  }

  private calculateNewPosition() {
    const head_position = this.getCurrentHeadCoordinate()
    const direction = this.getCurrentDirection()
    const step = this.getStep()
    let new_position = head_position;
    switch (direction) {
      case 'up':
        new_position.y += step;
        break;
      case "down":
        new_position.y -= step;
        break;
      case "left":
        new_position.x -= step
        break;
      case "right":
        new_position.x += step
        break;
    }
    return new_position
  }

  // GETTERS
  public getStep() {
    return this.step
  }

  public getCurrentDirection() {
    return this.direction;
  }

  public getCurrentHeadCoordinate() {
    return this.coordinates[0]
  }
  
  public getFullCoordinates() {
    return [...this.coordinates]
  }

  // SETTERS
  private setCoordinates(new_coordinate: TCoordinates[]) {
    this.coordinates = new_coordinate
  }

  private setDirection(new_direction: TDirections) {
    this.direction = new_direction
  }

  private setStep(new_step: number) {
    this.step = new_step
  }

  // DIRECTIONS CHANGERS
  public changeDirectionToUp() {
    this.direction = 'up'
  }

  public changeDirectionToDown() {
    this.direction = 'down'
  }

  public changeDirectionToLeft() {
    this.direction = 'left'
  }

  public changeDirectionToRight() {
    this.direction = 'right'
  }

}