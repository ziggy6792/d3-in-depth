import { Box, Typography } from '@mui/material';
import { NodeInterface } from 'src/components/ForceGraph/types';
import TimelineTable from 'src/components/TimelineTable';
import { useDispatchSimulationContext, useSimulationContext } from './SimulaitionProvider';

interface ISimulationTimelineProps {
  events: NodeInterface[];
}

interface ISimulationTimelineRowProps {
  node: NodeInterface;
}

const SimulationTimelineRow: React.FC<ISimulationTimelineRowProps> = ({ node }) => {
  return (
    <>
      <Box padding={1}>
        <Typography color='white'>{node.id}</Typography>
      </Box>
      <Box padding={1}>
        <Typography color='white'>{node.details.name}</Typography>
      </Box>
    </>
  );
};

const SimulationTimeline: React.FC<ISimulationTimelineProps> = ({ events }) => {
  const { dispatch } = useDispatchSimulationContext();
  const { time } = useSimulationContext();

  return (
    <TimelineTable
      columns={[
        { name: 'Time', template: '1fr' },
        { name: 'Name', template: '2fr' },
      ]}
      rows={events}
      // onRowSelected={(row) => dispatch({type: 'setTime', payload: row.details})}
      renderRow={(node) => <SimulationTimelineRow node={node} />}
    />
  );
};

export default SimulationTimeline;
