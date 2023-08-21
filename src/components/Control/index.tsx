import { useRecoilValue } from 'recoil';
import UpArrow from 'images/up_arrow.svg';
import LeftArrow from 'images/left_arrow.svg';
import RightArrow from 'images/right_arrow.svg';
import DownArrow from 'images/down_arrow.svg';
import { state_game_controller } from 'states/game_controller';

export const Control = () => {
  const game_controller = useRecoilValue(state_game_controller);

  return (
    <section>
      <button
        onClick={() => game_controller?.changeSnakeDirection('up')}
        data-cy="up_arrow_button">
        <img src={UpArrow} alt="" />
      </button>
      <button
        onClick={() => game_controller?.changeSnakeDirection('left')}
        data-cy="left_arrow_button">
        <img src={LeftArrow} alt="" />
      </button>
      <button
        onClick={() => game_controller?.changeSnakeDirection('right')}
        data-cy="right_arrow_button">
        <img src={RightArrow} alt="" />
      </button>
      <button
        onClick={() => game_controller?.changeSnakeDirection('down')}
        data-cy="down_arrow_button">
        <img src={DownArrow} alt="" />
      </button>
    </section>
  );
};
