export class CanvasDrawer{
  
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private square_length: number
  
  constructor(canvas: HTMLCanvasElement, square_length:number) {
    this.canvas = canvas
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw new Error(`Cannot get 2d context from ${this.canvas}`)
    }
    this.ctx = ctx
    this.square_length = square_length
  }
  
  // CLEAR
  public clearCanvas() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.height, this.canvas.width)
    this.drawBackGround(["#CCF294", "#A3D952"])
  }

  public drawBackGround(colors: [string, string]) {
    const canvas_width = this.canvas.width
    const canvas_height = this.canvas.height
    const square_legth = this.square_length
  
    let color = colors[1]
    for (let y = 0; y < canvas_height; y += square_legth){
      color = color === colors[1]? colors[0] : colors[1]  
      for (let x = 0; x < canvas_width; x += square_legth){
        this.drawRect(color, {x, y},)
        color = color === colors[1]? colors[0] : colors[1]
      }
    }
  }
  
  // RECTS
  public drawRect(color:string , position:TPositionPX, size?:TSizePX) {
    const ctx = this.ctx;
    ctx.fillStyle = color
    ctx.fillRect(position.x, position.y, size?.width ?? this.square_length, size?.height ?? this.square_length)
  }

  // MESSAGES
  public drawMessage(message:string, message_position:TPositionPX, size?:number) {
    const ctx = this.ctx;
    const font_size = size ?? 24
    const font_family = 'Times'
    const color = '#FFF'

    ctx.font = `${font_size}px ${font_family}`;
    
    const text_dimensions: TSizePX = {
      width: ctx.measureText(message).width,
      height: ctx.measureText('M').width - 2
    }
    this.drawMessageBackground(message_position, text_dimensions)
    ctx.fillStyle = color
    ctx.fillText(message, message_position.x, message_position.y + font_size - 7);
  }

  private drawMessageBackground(start_position:TPositionPX, text_dimensions:TSizePX) {
    const border = 4

    const bg_positon: TPositionPX = {
      x: start_position.y - border,
      y: start_position.x - border,
    }
    const bg_size: TSizePX = {
      width: text_dimensions.width + border * 2,
      height: text_dimensions.height + border * 2
    }
    const bg_color = "#0008"
    this.drawRect(bg_color, bg_positon, bg_size)
  }
}