export class CanvasDrawer{

  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D

  constructor({canvas}:PropsCanvasDrawer) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')!
  }

  public resetCanvas() {
    const ctx = this.context;
    ctx.clearRect(0, 0, this.canvas.height, this.canvas.width)
  }

  public draw(draw_data: TDrawData) {
    switch (draw_data.shape) {
      case 'square':
        this.draw_rect(draw_data)
        break;
    }
  }
  
  private draw_rect({color, size, start_position: start_position}:TDrawData) {
    const ctx = this.context;
    ctx.fillStyle = color
    ctx.fillRect(start_position.x, start_position.y, size.x, size.y)
  }

}