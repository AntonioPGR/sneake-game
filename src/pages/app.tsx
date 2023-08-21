import { GameController } from 'models/game_controller/game_controller';
import UpArrow from 'images/up_arrow.svg';
import LeftArrow from 'images/left_arrow.svg';
import RightArrow from 'images/right_arrow.svg';
import DownArrow from 'images/down_arrow.svg';
import { useState, useEffect } from 'react';

export const App = () => {
  const canvas_id = 'gameboard';
  const [game_controller, setGameController] = useState<
    undefined | GameController
  >();

  useEffect(() => {
    setGameController(new GameController(canvas_id));
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-green-100">
      <main className="w-full max-w-2xl flex flex-col justify-center items-center gap-4 ">
        <div
          id="game_root"
          className="w-full h-96 flex justify-center items-center">
          <canvas
            data-cy="board"
            style={{ background: '#CCF294' }}
            id={canvas_id}></canvas>
        </div>

        <button
          className="bg-green-200 px-4 py-2 rounded-md"
          onClick={() => game_controller?.startGame()}>
          Inicar jogo
        </button>

        <section className="w-48 flex flex-col items-center justify-center">
          <button
            onClick={() => game_controller?.changeSnakeDirection('up')}
            data-cy="up_arrow_button"
            className="bg-green-200 p-2 rounded-md">
            <img src={UpArrow} alt="" />
          </button>
          <div className="w-full flex items-center justify-between">
            <button
              onClick={() => game_controller?.changeSnakeDirection('left')}
              data-cy="left_arrow_button"
              className="bg-green-200 p-2 rounded-md">
              <img src={LeftArrow} alt="" />
            </button>
            <button
              onClick={() => game_controller?.changeSnakeDirection('right')}
              data-cy="right_arrow_button"
              className="bg-green-200 p-2 rounded-md">
              <img src={RightArrow} alt="" />
            </button>
          </div>
          <button
            onClick={() => game_controller?.changeSnakeDirection('down')}
            data-cy="down_arrow_button"
            className="bg-green-200 p-2 rounded-md">
            <img src={DownArrow} alt="" />
          </button>
        </section>
      </main>
    </div>
  );
};
