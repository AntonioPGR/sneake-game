import { Snake } from "models/snake/snake"


describe("Snake Model", () => {
  
  const createSneak = () => {
    const step: number = 1
    const direction: TDirections = 'right'
    const start_position: TPositionSQ[] = [{
      x: 5,
      y: 5
    }]
    return new Snake(step, direction, start_position)
  }

  it("saves the sneak info correctly", () => {
    const snake = createSneak()
    const current_position = snake.getHeadPosition()
    expect(current_position.x).to.equal(5)
    expect(current_position.y).to.equal(5)
  })

  it("changes the direction", () => {
    const snake = createSneak()
    snake.changeDirectionTo('up')
    expect(snake.getDirection()).to.equal('up')
  })

  it("moves correctly", () => {
    const snake = createSneak()

    snake.changeDirectionTo('down')
    snake.move()
    expect(snake.getHeadPosition().x).to.equal(5)
    expect(snake.getHeadPosition().y).to.equal(6)

    snake.changeDirectionTo('left')
    snake.move()
    expect(snake.getHeadPosition().x).to.equal(4)
    expect(snake.getHeadPosition().y).to.equal(6)
  })

  it("doesn't changes the direction to oposit side in y", () => {
    const snake = createSneak()

    snake.changeDirectionTo('down')
    snake.move()
    expect(snake.getHeadPosition().x).to.equal(5)
    expect(snake.getHeadPosition().y).to.equal(6)

    snake.changeDirectionTo('up')
    snake.move()
    expect(snake.getHeadPosition().x).to.equal(5)
    expect(snake.getHeadPosition().y).to.equal(7)
  })

  it("doesn't changes the direction to oposit side in x", () => {
    const snake = createSneak()

    snake.move()
    snake.changeDirectionTo('right')
    expect(snake.getHeadPosition().x).to.equal(6)
    expect(snake.getHeadPosition().y).to.equal(5)

    snake.changeDirectionTo('left')
    snake.move()
    expect(snake.getHeadPosition().x).to.equal(7)
    expect(snake.getHeadPosition().y).to.equal(5)
  })

  it("saves the position corresponding to sneak size", () => {
    const snake = createSneak()
    snake.move()
    expect(snake.getPositions().length).to.equal(1)
  })

  it("grows up", () => {
    const snake = createSneak()
    snake.growUp()
    snake.move()
    expect(snake.getPositions().length).to.equal(2)
  })

  it("dies when colid to itself", () => {
    const snake = new Snake(1, 'up', [{x:0, y:0}, {x:1, y:0}, {x:1, y:1}, {x:0, y:1}, {x:0, y:0}])
    expect(snake.isCollidingWithItself()).to.be.true
  })

})