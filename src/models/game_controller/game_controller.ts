import { Apple } from "models/apple/apple";
import { CanvasDrawer } from "models/canvas_drawer/canvas_drawer";
import { GameBoard } from "models/game_board/game_board"
import { Snake } from "models/snake/snake";

export class GameController{
  private canvas: HTMLCanvasElement;
  private gameboard: GameBoard
  private update_interval: NodeJS.Timer | undefined
  private sneak: Snake
  private apple: Apple
  private score: number = 0
  private canvas_drawer: CanvasDrawer

  constructor({ canvas_id }: PropsGameController) {
    const canvas_size = 6 
    const canvas = document.querySelector(`#${canvas_id}`) as HTMLCanvasElement | null;
    if (canvas === null) {
      throw new Error("canvas_id field can't reffers to a null object")
    }
    this.canvas = canvas
    this.gameboard = new GameBoard({ canvas: this.canvas, canvas_avaible_size: { x: 450, y: 450 }, squares_schemas: {x:canvas_size, y:canvas_size} })
    this.canvas_drawer = new CanvasDrawer({canvas})
    this.sneak = new Snake({
      direction: 'up',
      start_position: [this.gameboard.convertSquareToPixel({ x: 0, y: canvas_size })],
      step: this.gameboard.getSquaresSize()
    })
    this.apple = new Apple({
      table_size: {
        max_x: canvas_size,
        max_y: canvas_size,
        min_x: 0,
        min_y: 0
      },
      invalid_start_positions: this.sneak.getFullposition(),
      square_size: this.gameboard.getSquaresSize()
    })
  }

  public startGame() {
    this.resetGameInfo()
    this.renderElements()
    this.createUpdateInterval()
  }
  
  public changeSneakDirection(direction: TDirections) {
    switch (direction) {
      case 'down':
        this.sneak.changeDirectionToDown()
        break;
      case 'up':
        this.sneak.changeDirectionToUp()
        break;
      case 'left':
        this.sneak.changeDirectionToLeft()
        break;
      case 'right':
        this.sneak.changeDirectionToRight()
        break;
    }
  }

  // RESETS
  private resetGameInfo() {
    this.clearUpdateInterval()
    this.resetScore()
  }

  private clearUpdateInterval() {
    clearTimeout(this.update_interval);
    this.update_interval = undefined
  }

  private resetScore() {
    this.score = 0
  }

  // RENDERS
  private renderElements() {
    this.canvas_drawer.resetCanvas()
    this.canvas_drawer.draw({
      shape: 'square',
      color: '#00DD00',
      size: {
        x: this.gameboard.getSquaresSize(),
        y: this.gameboard.getSquaresSize(),
      },
      start_position: this.sneak.getHeadPosition()
    })
    const snake_positons = this.sneak.getFullposition()
    snake_positons.shift()
    snake_positons.map((value) => {
      this.canvas_drawer.draw({
        shape: 'square',
        color: '#00FF00',
        size: {
          x: this.gameboard.getSquaresSize(),
          y: this.gameboard.getSquaresSize(),
        },
        start_position: {
          x: value.x,
          y: value.y
        }
      })
    })
    this.canvas_drawer.draw({
      shape: 'square',
      color: '#FF0000',
      size: {
        x: this.gameboard.getSquaresSize(),
        y: this.gameboard.getSquaresSize(),
      },
      start_position: this.gameboard.convertSquareToPixel(this.apple.getPosition())
    })
  }

  // INTERVAL
  private createUpdateInterval() {
    this.update()
    this.update_interval = setInterval(() => {
      this.update()
    }, 700)
  }

  private update() {
    this.sneak.move()
    if (this.sneak.isEatable(this.apple)){
      this.apple.raffleNewPosition(this.sneak.getFullposition())
      this.sneak.growUp()
    }
    if (this.sneak.isDead({ x: this.gameboard.getSquaresSize() * 5, y: this.gameboard.getSquaresSize() * 5 })) {
      this.canvas_drawer.resetCanvas()
      clearInterval(this.update_interval);
      return
    }
    this.renderElements()
  }

}