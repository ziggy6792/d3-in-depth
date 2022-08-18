import { NodeInterface } from 'src/components/ForceGraph/types';
import Container from 'src/components/Container/Container';
import TimelineTable from './TimelineTable';

interface ISimulationTimelineProps {
  events: NodeInterface[];
}

const SimulationTimeline: React.FC<ISimulationTimelineProps> = ({ events }) => {
  return (
    <Container>
      <TimelineTable timelineEvents={events} />
    </Container>
  );
};

export default SimulationTimeline;
