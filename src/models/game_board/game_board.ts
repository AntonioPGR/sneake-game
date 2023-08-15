export class GameBoard{

  private squares_schemas: TAxles;
  private squares_size: number
  private canvas_size: TAxles;
  private canvas : HTMLCanvasElement

  constructor({ canvas, canvas_avaible_size_in_px, squares_schemas }: PropsGameBoard) {
    this.squares_schemas = squares_schemas;
    this.canvas = canvas
    this.squares_size = this.calculateSquaresSize(canvas_avaible_size_in_px)
    this.canvas_size = this.calculateCanvasSize()
    this.updateCanvasSize()
  }

  private calculateSquaresSize(avaible_size:TAxles) : number {
    const minor_axle_size = avaible_size.x < avaible_size.y? avaible_size.x : avaible_size.y
    const minor_axle_squares = avaible_size.x < avaible_size.y ? this.squares_schemas.x : this.squares_schemas.y

    return Math.floor(minor_axle_size / minor_axle_squares)
  }

  private calculateCanvasSize() :TAxles {
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

  public convertSquareToPixel(square_positon: TAxles) :TAxles {
    return {
      x: this.squares_size * square_positon.x,
      y: this.squares_size * square_positon.y
    }
  }

  public isOutside(square_positon: TAxles):Boolean{
    if (square_positon.x < 0 || square_positon.x > this.squares_schemas.x) {
      return true
    }
    if (square_positon.y < 0 || square_positon.y > this.squares_schemas.y) {
      return true
    }
    return false
  }

  public getCanvasSize() : TAxles {
    return this.canvas_size
  }

}