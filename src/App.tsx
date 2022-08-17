import React from 'react';
import { SimulationProvier } from './components/Simulation/SimulaitionProvider';
import Simulation from './components/Simulation/Simulation';

const App: React.FC = () => {
  return (
    <SimulationProvier>
      <Simulation />
    </SimulationProvier>
  );
};

export default App;
