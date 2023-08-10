import { Snake } from "./snake"

const step: number = 1
const direction: TDirections = 'left'
const start_coordinates: TCoordinates = {
  x: 5,
  y: 5
} 

describe("Snake Model", () => {
  const createSneak = () => {
    return new Snake({
      step: step,
      direction: direction,
      start_coordinates: {...start_coordinates}
    })
  }

  it("saves the sneak info correctly", () => {
    const snake = createSneak()
    expect(snake.getStep()).to.equal(step)
    expect(snake.getCurrentDirection()).to.equal(direction)
    const current_coordinates = snake.getCurrentHeadCoordinate()
    expect(current_coordinates.x).to.equal(start_coordinates.x)
    expect(current_coordinates.y).to.equal(start_coordinates.y)
  })

  it("changes the direction", () => {
    const snake = createSneak()
    snake.changeDirectionToUp()
    expect(snake.getCurrentDirection()).to.equal('up')
  })

  it("moves correctly", () => {
    const snake = createSneak()
    snake.move()
    expect(snake.getCurrentHeadCoordinate().x).to.equal(start_coordinates.x - 1)
    expect(snake.getCurrentHeadCoordinate().y).to.equal(start_coordinates.y)

    snake.changeDirectionToUp()
    snake.move()
    expect(snake.getCurrentHeadCoordinate().x).to.equal(start_coordinates.x - 1)
    expect(snake.getCurrentHeadCoordinate().y).to.equal(start_coordinates.y + 1)
  })

  it("dies when colid to itself", () => {
    const snake = createSneak()

    snake.changeDirectionToDown()
    snake.move()

    snake.changeDirectionToRight()
    snake.move()

    snake.changeDirectionToUp()
    snake.move()
    cy.log("coordinates: ", snake.getFullCoordinates())
    expect(snake.isDead()).to.be.true
  })

})