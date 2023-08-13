import { Apple } from "./apple"

describe("Apple model", () => {
  const createApple = () => new Apple({
    table_size: {
      max_x: 500,
      min_x: 0,
      max_y: 500,
      min_y: 0
    }
  })
  
  it("Should appear in a valid square", () => {
    console.log("Apple")
    const apple = createApple()
    const apple_position = apple.getPosition()

    expect(apple_position.x).to.gte(0)
    expect(apple_position.y).to.gte(0)
    expect(apple_position.x).to.lte(500)
    expect(apple_position.y).to.lte(500)
  })

  it("Should appear in another place when eaten", () => {
    const apple = new Apple({
      table_size: {
        max_x: 0,
        min_x: 0,
        max_y: 2,
        min_y: 0
      }
    })
    const position_1 = apple.getPosition()
    apple.raffleNewPosition([])
    const position_2 = apple.getPosition()

    expect(position_2.y).to.not.be.equal(position_1.y)
  })

  it("Should not appear in sneak positon", () => {
    const apple = new Apple({
      table_size: {
        max_x: 0,
        min_x: 0,
        max_y: 3,
        min_y: 0
      },
      invalid_start_positions: [{x:0, y:0}]
    })
    const position_1 = apple.getPosition()
    expect(position_1.y).to.not.be.equal(0)
    expect(position_1.y).to.not.be.equal(0)

    apple.raffleNewPosition([{x:0, y:0}])
    const position_2 = apple.getPosition()

    expect(position_2.y).to.not.be.equal(position_1.y)
    expect(position_2.y).to.not.be.equal(0)
  })
  
})