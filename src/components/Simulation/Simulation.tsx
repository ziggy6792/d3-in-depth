import { Grid } from '@mui/material';
import _ from 'lodash';
import React, { useEffect } from 'react';
import DragSliderAnimation from 'src/components/DragSliderAnimation/DragSliderAnimation';
import { GraphElements, ForceGraph, NodeData } from 'src/components/ForceGraph';
import { useDispatchSimulationContext, useSimulationContext } from './SimulaitionProvider';
import SimulationNode from './SimulationNode';
import SimulationTimeline from './SimulationTimeline';

const nodes = [
  { id: '0', startTime: 10 },
  { id: '0', startTime: 19 },
  { id: '0', startTime: 28 },
  { id: '0', startTime: 37 },
  // { id: '1', name: 'B', startTime: 20 },
  // { id: '1', startTime: 25 },
  // { id: '2', name: 'C', startTime: 30 },
  // { id: '3', name: 'D', startTime: 40 },
] as NodeData[];

const graphNodes = [{ data: { id: '0' } }, { data: { id: '1' } }, { data: { id: '2' } }, { data: { id: '3' } }];

const graphElements = {
  nodes: graphNodes,
  links: [
    { source: '3', target: '0' },
    { source: '3', target: '1' },
    { source: '3', target: '2' },
    { source: '0', target: '2' },
    { source: '1', target: '2' },
  ],
} as GraphElements;

const Simulation: React.FC = () => {
  const { dispatch } = useDispatchSimulationContext();
  const { time } = useSimulationContext();

  useEffect(() => {
    dispatch({ type: 'serNodes', payload: nodes });
  }, [dispatch]);

  return (
    <>
      <Grid direction='column' container style={{ width: '100vw', height: '100vh', backgroundImage: 'linear-gradient(rgb(11, 21, 64), rgb(35, 5, 38))' }}>
        <Grid item>
          <DragSliderAnimation value={time} onValueChanged={(value) => dispatch({ type: 'setTime', payload: value })} />
        </Grid>

        <Grid item>
          <Grid container direction='row'>
            <Grid item xs={6}>
              <ForceGraph graphElements={graphElements} renderNode={(node) => <SimulationNode node={node} />} />
            </Grid>
            <Grid item xs={6}>
              <SimulationTimeline events={nodes} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Simulation;
