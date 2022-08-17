import React from 'react';
import DragSliderAnimation from 'src/stories/components/DragSliderAnimation/DragSliderAnimation';
import { GraphElements, ForceGraph } from 'src/stories/components/ForceGraph';
import { useDispatchSimulationContext } from './SimulaitionProvider';

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

const Simulation: React.FC = () => {
  const { dispatch } = useDispatchSimulationContext();

  return (
    <>
      <DragSliderAnimation />

      <button onClick={() => dispatch({ type: 'setTime', payload: 10 })}>Set time</button>

      <div className='App' style={{ width: '100vw', height: '100vh', backgroundImage: 'linear-gradient(rgb(11, 21, 64), rgb(35, 5, 38))' }}>
        <ForceGraph graphElements={data} />
      </div>
    </>
  );
};

export default Simulation;
