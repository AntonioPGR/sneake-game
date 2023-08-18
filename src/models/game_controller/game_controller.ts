import { Apple } from "models/apple/apple";
import { CanvasDrawer } from "models/canvas_drawer/canvas_drawer";
import { GameBoard } from "models/game_board/game_board"
import { Loop } from "models/loop/loop";
import { Snake } from "models/snake/snake";

export class GameController{
  private canvas: HTMLCanvasElement;
  private gameboard: GameBoard
  private sneak: Snake
  private apple: Apple
  private canvas_drawer: CanvasDrawer
  private loop: Loop

  constructor({ canvas_id }: PropsGameController) {
    const canvas_size = 6 
    const canvas = document.querySelector(`#${canvas_id}`) as HTMLCanvasElement | null;
    if (canvas === null) {
      throw new Error("canvas_id field can't reffers to a null object")
    }
    this.canvas = canvas
    this.gameboard = new GameBoard({ canvas: this.canvas, canvas_avaible_size: { x: 450, y: 450 }, squares_schemas: {x:canvas_size, y:canvas_size} })
    this.canvas_drawer = new CanvasDrawer(canvas)
    this.sneak = new Snake({
      direction: 'up',
      start_position: [this.gameboard.convertSquareToPixel({ x: 0, y: canvas_size })],
      step: this.gameboard.getSquaresSize()
    })
    this.apple = new Apple({
      table_size: {
        max_width: canvas_size,
        max_height: canvas_size,
        min_width: 0,
        min_height: 0
      },
      invalid_start_positions: this.sneak.getFullposition(),
      square_size: this.gameboard.getSquaresSize()
    })
    this.loop = new Loop(() => this.update(), 500)
  }

  public startGame() {
    this.renderElements()
    this.loop.startLoop()
    // this.createUpdateInterval()
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

  // RENDERS
  private renderElements() {
    const squares_size =this.gameboard.getSquaresSize()

    this.canvas_drawer.resetCanvas()
    this.canvas_drawer.draw_rect('#00DD00', squares_size, this.sneak.getHeadPosition())

    const snake_positons = this.sneak.getFullposition()
    snake_positons.shift()
    snake_positons.map((value) => {
      this.canvas_drawer.draw_rect('#00FF00', squares_size, { x: value.x, y: value.y })
    })

    this.canvas_drawer.draw_rect('#FF0000', squares_size, this.gameboard.convertSquareToPixel(this.apple.getPosition()))
  }

  private update() {
    this.sneak.move()
    if (this.sneak.isEatable(this.apple)){
      this.apple.raffleNewPosition(this.sneak.getFullposition())
      this.sneak.growUp()
    }
    if (this.sneak.isDead({ x: this.gameboard.getSquaresSize() * 5, y: this.gameboard.getSquaresSize() * 5 })) {
      this.canvas_drawer.resetCanvas()
      this.loop.stopLoop()
      return
    }
    this.renderElements()
  }

}