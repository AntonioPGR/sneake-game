import { Control } from './index';
import UpArrowSrc from 'images/up_arrow.svg';
import LeftArrowSrc from 'images/left_arrow.svg';
import RightArrowSrc from 'images/right_arrow.svg';
import DownArrowSrc from 'images/down_arrow.svg';

describe('<Board />', () => {
  beforeEach(() => {
    cy.mount(<Control />);
  });

  const get_arrows = () => {
    return {
      up_arrow: cy.getByDataCy('up_arrow_button'),
      left_arrow: cy.getByDataCy('left_arrow_button'),
      right_arrow: cy.getByDataCy('right_arrow_button'),
      down_arrow: cy.getByDataCy('down_arrow_button'),
    };
  };

  it('renders the control keys', () => {
    cy.getByDataCy('up_arrow_button');
    cy.getByDataCy('left_arrow_button');
    cy.getByDataCy('right_arrow_button');
    cy.getByDataCy('down_arrow_button');
  });

  it('checks the control images', () => {
    const arrows = get_arrows();
    arrows.up_arrow.find('img').should('have.attr', 'src', UpArrowSrc);
    arrows.left_arrow.find('img').should('have.attr', 'src', LeftArrowSrc);
    arrows.right_arrow.find('img').should('have.attr', 'src', RightArrowSrc);
    arrows.down_arrow.find('img').should('have.attr', 'src', DownArrowSrc);
  });
});
