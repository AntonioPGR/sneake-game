import { GameBoard } from './game_board';

describe('Board model', () => {
  const canva_id = 'test_canva';
  const getCanvas = () => {
    return document.querySelector(`#${canva_id}`) as HTMLCanvasElement;
  };
  const createGameBoard = () => {
    return new GameBoard({
      canvas: getCanvas(),
      canvas_avaible_size_in_px: {
        x: 288,
        y: 312,
      },
      squares_schemas: {
        x: 12,
        y: 12,
      },
    });
  };

  beforeEach(() => {
    cy.mount(<canvas id={canva_id}></canvas>);
  });

  it('calculates the size of the squares based on the avaible size for canva', () => {
    const gameboard = createGameBoard();
    expect(gameboard.getSquaresSize()).to.be.equal(288 / 12);
  });

  it('calculates the size of canvas by timing the squares_size with square number', () => {
    const gameboard = createGameBoard();
    const canvas_size = gameboard.getCanvasSize();
    expect(canvas_size.x).to.be.equal(gameboard.getSquaresSize() * 12);
    expect(canvas_size.y).to.be.equal(gameboard.getSquaresSize() * 12);
  });

  it('sets the width and the height to the canva', () => {
    const gameboard = createGameBoard();
    const canvas_size = gameboard.getCanvasSize();
    const canvas = getCanvas();
    expect(canvas.width).to.be.equal(canvas_size.x);
    expect(canvas.height).to.be.equal(canvas_size.y);
  });

  it('converts a square number into a pixel position', () => {
    const gameboard = createGameBoard();
    const square_position = gameboard.convertSquareToPixel({
      x: 3,
      y: 2,
    });
    expect(square_position.x).to.be.eql(gameboard.getSquaresSize() * 3);
    expect(square_position.y).to.be.eql(gameboard.getSquaresSize() * 2);
  });

  it('calculates if a body is outside based in it positon', () => {
    const gameboard = createGameBoard();
    expect(
      gameboard.isOutside({
        x: 13,
        y: 12,
      }),
    ).to.be.true;
  });
});
