export class Loop{

  private callback: TVoidFunction
  private loop_time: miliseconds
  private interval: NodeJS.Timer | undefined

  constructor(callback: TVoidFunction, loop_time: miliseconds) {
    this.callback = callback
    this.loop_time = loop_time
  }

  public startLoop() {
    if (this.interval) throw new Error("You need to stop an loop before starting other! [Loop - line 12]");

    this.callback()
    this.interval = setInterval(() => {
      this.callback()
    }, this.loop_time)
  }

  public stopLoop() {
    if (!this.interval) throw new Error("You need start an loop before stoping it! [Loop - line 21]");

    clearInterval(this.interval)
    this.interval = undefined
  }

}