import React from 'react';
import { SimulationProvier } from './stories/simulation/SimulaitionProvider';
import Simulation from './stories/simulation/Simulation';

const App: React.FC = () => {
  return (
    <SimulationProvier>
      <Simulation />
    </SimulationProvier>
  );
};

export default App;
