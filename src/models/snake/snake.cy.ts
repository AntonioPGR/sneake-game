import { Apple } from "models/apple/apple"
import { Snake } from "./snake"


describe("Snake Model", () => {
  
  const createSneak = () => {
    const step: number = 1
    const direction: TDirections = 'right'
    const start_position: TAxles[] = [{
      x: 5,
      y: 5
    }]
    return new Snake({
      step: step,
      direction: direction,
      start_position: start_position
    })
  }

  it("saves the sneak info correctly", () => {
    const snake = createSneak()
    expect(snake.getStep()).to.equal(1)
    expect(snake.getDirection()).to.equal('right')
    const current_position = snake.getHeadPosition()
    expect(current_position.x).to.equal(5)
    expect(current_position.y).to.equal(5)
  })

  it("changes the direction", () => {
    const snake = createSneak()
    snake.changeDirectionToUp()
    expect(snake.getDirection()).to.equal('up')
  })

  it("moves correctly", () => {
    const snake = createSneak()

    snake.changeDirectionToDown()
    snake.move()
    expect(snake.getHeadPosition().x).to.equal(5)
    expect(snake.getHeadPosition().y).to.equal(4)

    snake.changeDirectionToLeft()
    snake.move()
    expect(snake.getHeadPosition().x).to.equal(4)
    expect(snake.getHeadPosition().y).to.equal(4)
  })

  it("doesn't changes the direction to oposit side in x", () => {
    const snake = createSneak()

    snake.changeDirectionToDown()
    snake.move()
    expect(snake.getHeadPosition().x).to.equal(5)
    expect(snake.getHeadPosition().y).to.equal(4)

    snake.changeDirectionToUp()
    snake.move()
    expect(snake.getHeadPosition().x).to.equal(5)
    expect(snake.getHeadPosition().y).to.equal(3)
  })

  it("doesn't changes the direction to oposit side in y", () => {
    const snake = createSneak()

    snake.move()
    expect(snake.getHeadPosition().x).to.equal(6)
    expect(snake.getHeadPosition().y).to.equal(5)

    snake.changeDirectionToLeft()
    snake.move()
    expect(snake.getHeadPosition().x).to.equal(7)
    expect(snake.getHeadPosition().y).to.equal(5)
  })

  it("saves the position corresponding to sneak size", () => {
    const snake = createSneak()
    snake.move()
    expect(snake.getFullposition().length).to.equal(1)
  })

  it("grows up", () => {
    const snake = createSneak()
    snake.growUp()
    snake.move()
    expect(snake.getFullposition().length).to.equal(2)
  })

  it("dies when colid to itself", () => {
    const snake = new Snake({start_position:[{x:0, y:0}, {x:1, y:0}, {x:1, y:1}, {x:0, y:1}, {x:0, y:0}]})
    expect(snake.isDead()).to.be.true
  })

  it("eats the apple when in same square", () => {
    const snake = new Snake({
      start_position: [{ x: 0, y: 0 }],
      direction: "up"
    })
    const apple = new Apple({
      table_size: {
        max_x: 0,
        min_x: 0,
        max_y: 2,
        min_y: 0
      },
      square_size: 1
    })
    snake.move()
    expect(snake.isEatable(apple)).to.be.true
  })

  it("not eat the apple when in another square", () => {
    const snake = new Snake({
      start_position: [{ x: 0, y: 0 }],
      direction: "up"
    })
    const apple = new Apple({
      table_size: {
        max_x: 0,
        min_x: 0,
        max_y: 2,
        min_y: 0
      },
      square_size: 1
    })
    expect(snake.isEatable(apple)).to.not.be.true
  })

})