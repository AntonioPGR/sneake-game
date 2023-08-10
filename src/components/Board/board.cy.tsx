import { Board } from './index';

describe('<Board />', () => {
  beforeEach(() => {
    cy.mount(<Board />);
  });

  it('renders the game board', () => {
    cy.getByDataCy('board');
  });
});
