import { Apple } from "models/apple/apple";
import { CanvasDrawer } from "../canvas_drawer/canvas_drawer";
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

  constructor(canvas_id:string) {
    const canvas_size = 12 
    const canvas = document.querySelector(`#${canvas_id}`) as HTMLCanvasElement | null;
    if (canvas === null) {
      throw new Error("canvas_id field can't reffers to a null object")
    }
    this.canvas = canvas

    this.gameboard = new GameBoard(this.canvas, { width: 450, height: 450 }, {x:canvas_size, y:canvas_size} )
    this.canvas_drawer = new CanvasDrawer(canvas)
    this.sneak = new Snake(this.gameboard.getSquaresSize(), 'up', [{ x: Math.floor(this.gameboard.getCanvasSize().x/2), y:  Math.floor(this.gameboard.getCanvasSize().y/2) }])
    this.apple = new Apple({max_width: canvas_size, max_height: canvas_size, min_width: 0, min_height: 0}, this.sneak.getPositions())
    this.loop = new Loop(() => this.update(), 500)
  }

  public startGame() {
    this.renderElements()
    this.loop.startLoop()
  }
  
  public changeSneakDirection(direction: TDirections) {
    this.sneak.changeDirectionTo(direction)
  }

  // RENDERS
  private renderElements() {
    const squares_size = this.gameboard.getSquaresSize()
    this.canvas_drawer.resetCanvas()
    
    this.canvas_drawer.draw_rect('#FF0000', squares_size, this.gameboard.convertSquareToPixel(this.apple.getPosition()))

    this.canvas_drawer.draw_rect('#00DD00', squares_size, this.sneak.getHeadPosition())
    const snake_positons = this.sneak.getPositions()
    snake_positons.shift()
    snake_positons.map((value) => {
      this.canvas_drawer.draw_rect('#00FF00', squares_size, { x: value.x, y: value.y })
    })

  }

  private update() {
    this.sneak.move()
    if (this.sneak.isCollidingWithItself()) {
      this.canvas_drawer.resetCanvas()
      this.loop.stopLoop()
      return
    }
    this.renderElements()
  }

}