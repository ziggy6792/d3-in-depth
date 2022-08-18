import React, { useEffect } from 'react';
import DragSliderAnimation from 'src/components/DragSliderAnimation/DragSliderAnimation';
import { GraphElements, ForceGraph } from 'src/components/ForceGraph';
import { useDispatchSimulationContext, useSimulationContext } from './SimulaitionProvider';
import SimulationNode from './SimulationNode';

const data = {
  nodes: [
    { id: '0', details: { name: 'A' } },
    { id: '1', details: { name: 'B' } },
    { id: '2', details: { name: 'C' } },
    { id: '3', details: { name: 'D' } },
  ],
  links: [
    { source: '3', target: '0' },
    { source: '3', target: '1' },
    { source: '3', target: '2' },
    { source: '0', target: '2' },
    { source: '1', target: '2' },
  ],
} as GraphElements;

// Fetched from api
const nodeSequenceResponse = { [10]: '1', [20]: '2', [50]: '1' };

const Simulation: React.FC = () => {
  const { dispatch } = useDispatchSimulationContext();
  const { time } = useSimulationContext();

  useEffect(() => {
    dispatch({ type: 'setNodeSequence', payload: nodeSequenceResponse });
  }, [dispatch]);

  return (
    <>
      <div className='App' style={{ width: '100vw', height: '100vh', backgroundImage: 'linear-gradient(rgb(11, 21, 64), rgb(35, 5, 38))' }}>
        <DragSliderAnimation value={time} onChange={(value) => dispatch({ type: 'setTime', payload: value })} />
        <ForceGraph graphElements={data} renderNode={(node) => <SimulationNode node={node} />} />
      </div>
    </>
  );
};

export default Simulation;
