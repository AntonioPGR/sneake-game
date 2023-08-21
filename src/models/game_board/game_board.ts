export class GameBoard{

  private squares_lenght: TLengthSQ
  private squares_quantity: TPositionSQ;
  private size_px: TPositionPX;
  private canvas : HTMLCanvasElement

  constructor(canvas:HTMLCanvasElement, canvas_avaible_size:TSizePX, squares_quantity:TPositionSQ) {
    this.canvas = canvas
    this.squares_quantity = squares_quantity;
    this.squares_lenght = this.calculateSquaresLenght(canvas_avaible_size)
    this.size_px = this.calculateCanvasSize()
    this.updateCanvasSize()
  }

  private calculateSquaresLenght(avaible_size: TSizePX): TLengthSQ {
    // Numero de px presente no menor eixo
    const minor_axle_size = avaible_size.width < avaible_size.height ? avaible_size.width : avaible_size.height
    // Numero de quadrados presente no eixo com menor numero de quadrados desejados
    const minor_axle_squares = avaible_size.width < avaible_size.height ? this.squares_quantity.x : this.squares_quantity.y

    return Math.floor(minor_axle_size / minor_axle_squares)
  }

  private calculateCanvasSize() :TPositionPX {
    return {
      x: this.squares_lenght * this.squares_quantity.x,
      y: this.squares_lenght * this.squares_quantity.y
    }
  }

  private updateCanvasSize() {
    this.canvas.width = this.size_px.x
    this.canvas.height = this.size_px.y
  }

  public getSquaresSize() {
    return this.squares_lenght
  }

  public convertSquareToPixel(square_positon: TPositionPX) :TPositionPX {
    return {
      x: this.squares_lenght * square_positon.x,
      y: this.squares_lenght * square_positon.y
    }
  }

  public isOutside(positon: TPositionPX):boolean{
    if (positon.x < 0 || positon.x > this.size_px.x - 1) {
      return true
    }
    if (positon.y < 0 || positon.y > this.size_px.y - 1) {
      return true
    }
    return false
  }

  public getCanvasSize() : TPositionPX {
    return this.size_px
  }

  public getCanvasSquareSize(): TPositionSQ {
    return {
      x: this.squares_quantity.x,
      y: this.squares_quantity.y
    }
  }

}