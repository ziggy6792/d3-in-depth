import { Box, Typography } from '@mui/material';
import { NodeData, NodeInterface } from 'src/components/ForceGraph/types';
import TimelineTable from 'src/components/TimelineTable';
import { useDispatchSimulationContext, useSimulationContext } from './SimulaitionProvider';

interface ISimulationTimelineProps {
  events: NodeData[];
}

interface ISimulationTimelineRowProps {
  node: NodeData;
}

const SimulationTimelineRow: React.FC<ISimulationTimelineRowProps> = ({ node }) => {
  return (
    <>
      <Box padding={1}>
        <Typography color='white'>{node.startTime}</Typography>
      </Box>
      <Box padding={1}>
        <Typography color='white'>{node.id}</Typography>
      </Box>
    </>
  );
};

const SimulationTimeline: React.FC<ISimulationTimelineProps> = ({ events }) => {
  const { dispatch } = useDispatchSimulationContext();
  const { time, activeNodes } = useSimulationContext();

  return (
    <TimelineTable
      columns={[
        { name: 'Time', template: '1fr' },
        { name: 'Name', template: '2fr' },
      ]}
      rows={events}
      onRowSelected={(node) => dispatch({ type: 'setTime', payload: node.startTime })}
      selectedRow={activeNodes?.length ? activeNodes[0] : null}
      renderRow={(node) => <SimulationTimelineRow node={node} />}
    />
  );
};

export default SimulationTimeline;
