// import { Apple } from "models/apple/apple"
import { GameBoard } from "models/game_board/game_board"

export class GameController{
  private canvas: HTMLCanvasElement;
  private gameboard: GameBoard
  private update_interval: NodeJS.Timer | undefined
  private score: number = 0

  constructor({ canvas_id }: PropsGameController) {
    const canvas = document.querySelector(`#${canvas_id}`) as HTMLCanvasElement | null;
    if (canvas === null) {
      throw new Error("canvas_id field can't reffers to a null object")
    }
    this.canvas = canvas
    this.gameboard = new GameBoard({ canvas: this.canvas, table_size: { h: 8, w: 16 } })
    console.log(this.gameboard)
  }

  public startGame() {
    this.resetGameInfo()
    
    this.createUpdateInterval()
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

  // INTERVAL
  private createUpdateInterval() {
    this.update()
    this.update_interval = setInterval(() => {
      this.update()
    }, 700)
  }

  private update() {
    console.log('updating')
  }

}