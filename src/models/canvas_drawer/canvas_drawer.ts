export class CanvasDrawer{

  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw new Error(`Cannot get 2d context from ${this.canvas}`)
    }
    this.ctx = ctx
  }

  public resetCanvas() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.height, this.canvas.width)
  }
  
  public draw_rect(color:string , side_size:number, position:TPositionPX) {
    const ctx = this.ctx;
    ctx.fillStyle = color
    ctx.fillRect(position.x, position.y, side_size, side_size)
  }

}