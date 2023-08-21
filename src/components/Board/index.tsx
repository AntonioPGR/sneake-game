import { GameController } from 'models/game_controller/game_controller';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { state_game_controller } from 'states/game_controller.recoil';

export const Board = () => {
  const canvas_id = 'gameboard';
  const setGameController = useSetRecoilState(state_game_controller);

  useEffect(() => {
    setGameController(new GameController(canvas_id));
  }, []);

  return (
    <canvas
      data-cy="board"
      style={{ background: '#CCF294' }}
      id={canvas_id}></canvas>
  );
};
