import { Apple } from "models/apple/apple"

describe("Apple model", () => {
  
  it("Should appear in a valid square", () => {
    const min_width= 0 
    const min_height= 0
    const max_width= 0
    const max_height= 1

    const apple = new Apple({
      min_width,
      min_height,
      max_width,
      max_height,
    })
    const apple_position = apple.getPosition()

    expect(apple_position.x).to.gte(min_width)
    expect(apple_position.y).to.gte(min_height)
    expect(apple_position.x).to.lte(max_width)
    expect(apple_position.y).to.lte(max_height)
  })

  it("Should appear in another place when eaten", () => {
    const min_width= 0 
    const min_height= 0
    const max_width= 0
    const max_height= 1
    const apple = new Apple({
      max_width,
      min_width,
      max_height,
      min_height,
    })
    const position_1 = apple.getPosition()
    apple.changeApplePosition()
    const position_2 = apple.getPosition()
    expect(position_2.y).to.not.be.equal(position_1.y)
  })

  it("Should not appear in an invalid positon", () => {
    const min_width= 0 
    const min_height= 0
    const max_width= 0
    const max_height= 2
    const apple = new Apple({
      max_width,
      min_width,
      max_height,
      min_height,
    }, [{x:0, y:0}])
    const position_1 = apple.getPosition()
    expect(position_1.y).to.not.be.equal(0)
    apple.changeApplePosition([{ x: position_1.x, y: position_1.y }])
    const position_2 = apple.getPosition()
    expect(position_2.y).to.not.be.equal(position_1.y)
  })
  
})