import { Box, Typography } from '@mui/material';
import { NodeInterface } from 'src/components/ForceGraph/types';
import TimelineTable from 'src/components/TimelineTable';

interface ISimulationTimelineProps {
  events: NodeInterface[];
}

const SimulationTimeline: React.FC<ISimulationTimelineProps> = ({ events }) => {
  return (
    <TimelineTable
      rows={events}
      renderRow={(node) => (
        <>
          <Box padding={1}>
            <Typography color='white'>{node.id}</Typography>
          </Box>
          <Box padding={1}>
            <Typography color='white'>{node.details.name}</Typography>
          </Box>
        </>
      )}
    />
  );
};

export default SimulationTimeline;
