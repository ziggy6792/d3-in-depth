import { Box, Typography } from '@mui/material';
import { SimulationEvent } from './types';
import TimelineTable from 'src/components/TimelineTable';
import { useDispatchSimulationContext, useSimulationContext } from './SimulaitionProvider';

interface ISimulationTimelineProps {
  events: SimulationEvent[];
}

interface ISimulationTimelineRowProps {
  event: SimulationEvent;
}

const SimulationTimelineRow: React.FC<ISimulationTimelineRowProps> = ({ event }) => {
  return (
    <>
      <Box padding={1}>
        <Typography color='white'>{event.startTime}</Typography>
      </Box>
      <Box padding={1}>
        <Typography color='white'>{event.node.name}</Typography>
      </Box>
    </>
  );
};

const SimulationTimeline: React.FC<ISimulationTimelineProps> = ({ events }) => {
  const { dispatch } = useDispatchSimulationContext();
  const { selectedEvent } = useSimulationContext();

  return (
    <TimelineTable
      columns={[
        { name: 'Time', template: '1fr' },
        { name: 'Name', template: '2fr' },
      ]}
      rows={events}
      onRowSelected={(event) => dispatch({ type: 'setSelectedEvent', payload: event })}
      selectedRow={selectedEvent}
      renderRow={(event) => <SimulationTimelineRow event={event} />}
    />
  );
};

export default SimulationTimeline;
