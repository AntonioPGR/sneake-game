export class GameBoard{

  private squares_schemas: TPositionPX;
  private squares_size: number
  private canvas_size: TPositionPX;
  private canvas : HTMLCanvasElement

  constructor({ canvas, canvas_avaible_size: canvas_avaible_size_in_px, squares_schemas }: PropsGameBoard) {
    this.squares_schemas = squares_schemas;
    this.canvas = canvas
    this.squares_size = this.calculateSquaresSize(canvas_avaible_size_in_px)
    this.canvas_size = this.calculateCanvasSize()
    this.updateCanvasSize()
  }

  private calculateSquaresSize(avaible_size:TPositionPX) : number {
    const minor_axle_size = avaible_size.x < avaible_size.y? avaible_size.x : avaible_size.y
    const minor_axle_squares = avaible_size.x < avaible_size.y ? this.squares_schemas.x : this.squares_schemas.y

    return Math.floor(minor_axle_size / minor_axle_squares)
  }

  private calculateCanvasSize() :TPositionPX {
    return {
      x: this.squares_size * this.squares_schemas.x,
      y: this.squares_size * this.squares_schemas.y
    }
  }

  private updateCanvasSize() {
    this.canvas.width = this.canvas_size.x
    this.canvas.height = this.canvas_size.y
  }

  public getSquaresSize() {
    return this.squares_size
  }

  public convertSquareToPixel(square_positon: TPositionPX) :TPositionPX {
    return {
      x: this.squares_size * square_positon.x,
      y: this.squares_size * square_positon.y
    }
  }

  public isOutside(positon: TPositionPX):Boolean{
    if (positon.x < 0 || positon.x > this.canvas_size.x) {
      return true
    }
    if (positon.y < 0 || positon.y > this.canvas_size.y) {
      return true
    }
    return false
  }

  public getCanvasSize() : TPositionPX {
    return this.canvas_size
  }

}