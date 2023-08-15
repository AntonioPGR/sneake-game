import { GameController } from 'models/game_controller/game_controller';
import { useState, useEffect } from 'react';

export const Board = () => {
  const canvas_id = 'gameboard';
  const [game_controller, setGameController] = useState<
    GameController | undefined
  >();

  useEffect(() => {
    setGameController(new GameController({ canvas_id: canvas_id }));
  }, []);

  return (
    <>
      <canvas data-cy="board" id={canvas_id}></canvas>
      <button onClick={() => game_controller?.startGame()}>Inicar jogo</button>
    </>
  );
};
