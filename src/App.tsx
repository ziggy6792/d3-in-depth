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

const App: React.FC = () => {
  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={theme}>
        <SimulationProvier>
          <Simulation />
        </SimulationProvier>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
