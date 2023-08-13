import { Apple } from "models/apple/apple"
import { Snake } from "models/snake/snake"

declare interface PropsGameBoard{
  size: TBoardSize,
  apple: Apple,
  snake: Snake
}
export class GameBoard{

  private size: TBoardSize
  private apple: Apple
  private snake: Snake

  constructor({size, apple, snake}: PropsGameBoard) {
    this.size = size
    this.apple = apple
    this.snake = snake
  }

  // ACIONS
  public updateGame(){
    
  }

  // GETTERS
  public getSize() {
    return this.size
  }

}