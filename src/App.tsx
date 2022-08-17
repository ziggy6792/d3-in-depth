import React, { createContext, PropsWithChildren, useReducer } from 'react';
import { IAction, initialState, ISumulationState, simulationReducer } from './simulationReducer';
import DragSliderAnimation from './stories/components/DragSliderAnimation/DragSliderAnimation';
import { ForceGraph, GraphElements } from './stories/components/ForceGraph';

const data = {
  nodes: [
    { id: '0', type: 'FUND', fund: { name: 's', manager: '', year: '2022', type: 'Venture Capital', isOpen: false } },
    { id: '1', type: 'FUND', fund: { name: 's', manager: '', year: '2022', type: 'Venture Capital', isOpen: true } },
    { id: '2', type: 'FUND', fund: { name: 's', manager: '', year: '2022', type: 'Venture Capital', isOpen: true } },
    { id: '0_ROOT', type: 'GROUP_ROOT', groupRootAttribute: 'manager', groupRootText: '' },
  ],
  links: [
    { source: '0_ROOT', target: '0' },
    { source: '0_ROOT', target: '1' },
    { source: '0_ROOT', target: '2' },
    { source: '0', target: '2' },
    { source: '1', target: '2' },
  ],
} as GraphElements;

type DContextType = {
  dispatch?: (tenantId: IAction) => void;
};

const DispatchSimulationContext = createContext<DContextType>({});

const SimulationContext = createContext<ISumulationState | null>(null);

export const SimulationProvier: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [state, dispatch] = useReducer(simulationReducer, initialState);

  return (
    <DispatchSimulationContext.Provider value={{ dispatch }}>
      <SimulationContext.Provider value={state}>{children}</SimulationContext.Provider>
    </DispatchSimulationContext.Provider>
  );
};

const App: React.FC = () => {
  return (
    <SimulationProvier>
      <DragSliderAnimation />

      <div className='App' style={{ width: '100vw', height: '100vh', backgroundImage: 'linear-gradient(rgb(11, 21, 64), rgb(35, 5, 38))' }}>
        <ForceGraph graphElements={data} />
      </div>
    </SimulationProvier>
  );
};

export default App;
