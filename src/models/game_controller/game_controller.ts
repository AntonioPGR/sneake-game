import { Apple } from "models/apple/apple";
import { CanvasDrawer } from "../canvas_drawer/canvas_drawer";
import { GameBoard } from "models/game_board/game_board"
import { Loop } from "models/loop/loop";
import { Snake } from "models/snake/snake";

export class GameController{
  private canvas: HTMLCanvasElement;
  private gameboard: GameBoard
  private snake: Snake
  private apple: Apple
  private canvas_drawer: CanvasDrawer
  private loop: Loop
  private score: number

  constructor(canvas_id:string) {
    const canvas_size = 12 
    const canvas = document.querySelector(`#${canvas_id}`) as HTMLCanvasElement | null;
    if (canvas === null) {
      throw new Error("canvas_id field can't reffers to a null object")
    }
    this.canvas = canvas

    this.gameboard = new GameBoard(this.canvas, { width: 450, height: 450 }, { x: canvas_size, y: canvas_size })
    const square_legth = this.gameboard.getSquaresSize()
    this.canvas_drawer = new CanvasDrawer(canvas, square_legth)
    const head_start_position = { x: Math.floor(this.gameboard.getCanvasSquareSize().x / 2), y: Math.floor(this.gameboard.getCanvasSquareSize().y / 2) }
    const body_start_positions = [{ x: head_start_position.x, y: head_start_position.y + 1 }, { x: head_start_position.x, y: head_start_position.y + 2 }]
    this.snake = new Snake(1, 'up', [head_start_position, ...body_start_positions])
    this.apple = new Apple({max_width: canvas_size, max_height: canvas_size, min_width: 0, min_height: 0}, this.snake.getPositions())
    this.loop = new Loop(() => this.update(), 500)
    this.score = 0
    this.renderElements()
  }

  public startGame() {
    this.renderElements()
    this.loop.startLoop()
  }
  
  public changeSnakeDirection(direction: TDirections) {
    this.snake.changeDirectionTo(direction)
  }

  // UPDATE
  private update() {
    this.snake.move()
    if (this.isSnakeDied()) {
      this.die()
      return
    }
    if (this.snakeCanEat()) {
      this.eatApple()
    }
    this.renderElements()
  }

  private isSnakeDied() {
    if (this.snake.isCollidingWithItself()) return true
    const snake_postion = this.gameboard.convertSquareToPixel(this.snake.getHeadPosition())
    if(this.gameboard.isOutside(snake_postion)) return true
    return false
  }

  private die() {
    this.loop.stopLoop()
    this.resetGameBoard()
    this.canvas_drawer.drawMessage(`Score: ${this.score}`, { x: 100, y: 100 }, 54)
  }

  private snakeCanEat() {
    const head_position = this.snake.getHeadPosition()
    const apple_position = this.apple.getPosition()
    return head_position.x === apple_position.x && head_position.y === apple_position.y
  }

  private eatApple() {
    this.snake.growUp()
    this.apple.changeApplePosition(this.snake.getPositions())
    this.growScore()
  }

  private growScore() {
    this.score += 1
  }

  private renderElements() {
    this.resetGameBoard()
    this.renderGameClasses()
    this.renderGameInfo()
  }
  
  private resetGameBoard() {
    this.canvas_drawer.clearCanvas()
  }

  private renderGameInfo() {
    this.canvas_drawer.drawMessage(`Score: ${this.score}`, { x: 12, y: 12  })
  }

  private renderGameClasses() {
    const callback_function: TCallbackDraw = (color, position) => {
      this.canvas_drawer.drawRect(color, this.gameboard.convertSquareToPixel(position))
    }
    this.apple.draw(callback_function)
    this.snake.draw(callback_function)
  }

}