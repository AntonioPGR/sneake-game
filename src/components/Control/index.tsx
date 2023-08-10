import UpArrow from 'images/up_arrow.svg';
import LeftArrow from 'images/left_arrow.svg';
import RightArrow from 'images/right_arrow.svg';
import DownArrow from 'images/down_arrow.svg';

export const Control = () => {
  return (
    <section>
      <button data-cy="up_arrow_button">
        <img src={UpArrow} alt="" />
      </button>
      <button data-cy="left_arrow_button">
        <img src={LeftArrow} alt="" />
      </button>
      <button data-cy="right_arrow_button">
        <img src={RightArrow} alt="" />
      </button>
      <button data-cy="down_arrow_button">
        <img src={DownArrow} alt="" />
      </button>
    </section>
  );
};
