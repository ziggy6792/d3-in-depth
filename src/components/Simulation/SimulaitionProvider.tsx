import React, { createContext, PropsWithChildren, useContext, useReducer } from 'react';
import { IAction, initialState, ISumulationState, simulationReducer } from './simulationReducer';

type DContextType = {
  dispatch?: (tenantId: IAction) => void;
};

export function useSimulationContext() {
  return useContext(SimulationContext);
}

export function useDispatchSimulationContext() {
  return useContext(DispatchSimulationContext);
}

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
