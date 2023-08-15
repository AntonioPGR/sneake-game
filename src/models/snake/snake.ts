import { Apple } from "models/apple/apple"

export class Snake{
  private position: TAxles[] = [{ x: 0, y: 0 }]
  private size: number = 1
  private direction: TDirections = 'up'
  private step: number = 1

  constructor({ step, start_position, direction}: PropsSnake) {
    if(step) this.setStep(step)
    if (start_position) {
      this.setposition(start_position)
      this.setSize(start_position.length)
    }
    if(direction) this.setDirection(direction)
  }

  // STATUS
  public isDead() {
    
    const head_position = this.getHeadPosition()
    const position = this.getFullposition()

    const equal_position = position.filter((value) => value.x === head_position.x && value.y === head_position.y)
    if (equal_position.length > 0) {
      return true
    }
    return false
  }

  public isEatable(apple: Apple) {
    const apple_position = apple.getPosition()
    const head_snake_position = this.getHeadPosition()
    if (apple_position.x === head_snake_position.x && apple_position.y === head_snake_position.y) {
      return true
    }
    return false
  }

  
  // ACTIONS
  public tryToEat(apple: Apple) {
    if (!this.isEatable(apple)) {
      return false
    }
    apple.raffleNewPosition(this.getFullposition())
    this.growUp()
    return true
  }

  public move() {
    const calculated_position = this.calculateNewPosition()
    const new_position = [calculated_position, ...this.getFullposition()]
    while (new_position.length > this.size) {
      new_position.pop();
    }
    this.setposition(new_position)
  }

  private calculateNewPosition() {
    const head_position = this.getHeadPosition()
    const direction = this.getDirection()
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

  public growUp() {
    this.size += 1
  }

  // GETTERS
  public getStep() {
    return this.step
  }

  public getSize() {
    return this.size
  }

  public getDirection() {
    return this.direction;
  }

  public getHeadPosition() {
    return this.position[0]
  }
  
  public getFullposition() {
    return [...this.position]
  }

  // SETTERS
  private setposition(new_coordinate: TAxles[]) {
    this.position = new_coordinate
  }

  private setDirection(new_direction: TDirections) {
    this.direction = new_direction
  }

  private setStep(new_step: number) {
    this.step = new_step
  }

  private setSize(new_size: number) {
    this.size = new_size
  }

  // DIRECTIONS CHANGERS
  public changeDirectionToUp() {
    if (this.getDirection() !== 'down') {
      this.direction = 'up'
    }
  }

  public changeDirectionToDown() {
    if (this.getDirection() !== 'up') {
      this.direction = 'down'
    }
  }

  public changeDirectionToLeft() {
    if (this.getDirection() !== 'right') {
      this.direction = 'left'
    }
  }

  public changeDirectionToRight() {
    if (this.getDirection() !== 'left') {
      this.direction = 'right'
    }
  }

}