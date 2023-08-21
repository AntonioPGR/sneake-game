import ReactDOM from 'react-dom/client';
import { App } from './pages/app';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
