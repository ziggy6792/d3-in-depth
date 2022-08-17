import React from 'react';
import DragSliderAnimation from './stories/components/DragSliderAnimation/DragSliderAnimation';
import { FundGraph as FundGraph } from './stories/components/FundGraph/FundGraph';
import { GraphElements } from './stories/components/FundGraph/types';

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

const App: React.FC = () => {
  return (
    <>
      <DragSliderAnimation />

      <div className='App' style={{ width: '100vw', height: '100vh', backgroundImage: 'linear-gradient(rgb(11, 21, 64), rgb(35, 5, 38))' }}>
        <FundGraph graphElements={data} />
      </div>
    </>
  );
};

export default App;
