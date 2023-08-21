import { Board } from 'components/Board';
import { Control } from 'components/Control';
import { useRecoilValue } from 'recoil';
import { state_game_controller } from 'states/game_controller.recoil';

export const App = () => {
  const game_controller = useRecoilValue(state_game_controller);

  return (
    <>
      <Board />
      <button onClick={() => game_controller?.startGame()}>Inicar jogo</button>
      <Control />
    </>
  );
};
