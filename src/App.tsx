import React from 'react';
import { SimulationProvier } from './components/Simulation/SimulaitionProvider';
import Simulation from './components/Simulation/Simulation';
import createCache from '@emotion/cache';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import theme from './theme';

export const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

// Solution from https://dev.to/admitkard/mobile-issue-with-100vh-height-100-100vh-3-solutions-3nae
const calcVh = () => {
  (document.querySelector(':root') as any).style.setProperty('--vh', `${window.innerHeight / 100}px`);
};

calcVh();
window.addEventListener('resize', () => {
  calcVh();
});

const App: React.FC = () => {
  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={theme}>
        <SimulationProvier>
          <div
            style={{
              height: 'calc(100 * var(--vh))',
              width: '100%',
              position: 'fixed',
              zIndex: -1,
              backgroundImage: 'linear-gradient(rgb(11, 21, 64), rgb(35, 5, 38))',
            }}
          ></div>
          <Simulation />
        </SimulationProvier>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
