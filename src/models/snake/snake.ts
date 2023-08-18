import { Apple } from "models/apple/apple"

export class Snake{
  private position: TPositionPX[] = [{ x: 0, y: 0 }]
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
  public isDead(max_position?:TPositionPX) {
    const head_position = this.getHeadPosition()
    const position = this.getFullposition()

    if (position.length > 1) {
      const equal_position = position.filter((value) => value.x === head_position.x && value.y === head_position.y)
      console.log(equal_position)
      if (equal_position.length > 1) {
        return true
      }
    }

    if (head_position.x < 0 || head_position.y < 0) {
      return true
    }
    if (max_position && (head_position.x > max_position.x || head_position.y > max_position.y)) {
      return true
    }
    return false
  }

  public isEatable(apple: Apple) {
    const apple_position = apple.getPositionInPx()
    const head_snake_position = this.getHeadPosition()
    if (apple_position.x === head_snake_position.x && apple_position.y === head_snake_position.y) {
      return true
    }
    return false
  }

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
      new_position.pop()
    }
    this.setposition(new_position)
  }

  private calculateNewPosition() {
    const head_position = this.getHeadPosition()
    const direction = this.getDirection()
    const step = this.getStep()
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
    const full = this.getFullposition()
    return full[0]
  }
  
  public getFullposition() {
    return [...this.position]
  }

  // SETTERS
  private setposition(new_coordinate: TPositionPX[]) {
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