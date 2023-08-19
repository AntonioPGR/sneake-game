import { Loop } from "models/loop/loop"

describe("Loop model", () => {
  
  it('Should call the callback function after starting', () => {
    const object = {
      callback(){}
    }
    const spy = cy.spy(object, 'callback')
    const loop = new Loop(object.callback, 100)

    loop.startLoop()
    expect(spy).to.be.called
    loop.stopLoop()
  })

})