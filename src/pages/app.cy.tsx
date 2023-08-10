import { App } from './app';

describe('<App />', () => {
  it('renders', () => {
    cy.mount(<App />);
  });
});
