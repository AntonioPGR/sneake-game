import { GameController } from 'models/game_controller/game_controller';
import { useState, useEffect } from 'react';
import UpArrow from 'images/up_arrow.svg';
import LeftArrow from 'images/left_arrow.svg';
import RightArrow from 'images/right_arrow.svg';
import DownArrow from 'images/down_arrow.svg';

export const App = () => {
  const canvas_id = 'gameboard';
  const [game_controller, setGameController] = useState<
    GameController | undefined
  >();

  useEffect(() => {
    setGameController(new GameController({ canvas_id: canvas_id }));
  }, []);

  return (
    <>
      <canvas
        data-cy="board"
        style={{ background: '#eec5b7' }}
        id={canvas_id}></canvas>
      <button onClick={() => game_controller?.startGame()}>Inicar jogo</button>
      <section>
        <button
          onClick={() => game_controller?.changeSneakDirection('up')}
          data-cy="up_arrow_button">
          <img src={UpArrow} alt="" />
        </button>
        <button
          onClick={() => game_controller?.changeSneakDirection('left')}
          data-cy="left_arrow_button">
          <img src={LeftArrow} alt="" />
        </button>
        <button
          onClick={() => game_controller?.changeSneakDirection('right')}
          data-cy="right_arrow_button">
          <img src={RightArrow} alt="" />
        </button>
        <button
          onClick={() => game_controller?.changeSneakDirection('down')}
          data-cy="down_arrow_button">
          <img src={DownArrow} alt="" />
        </button>
      </section>
    </>
  );
};
