import { NodeInterface } from 'src/components/ForceGraph/types';
import Container from 'src/components/Container/Container';
import TimelineTable from './TimelineTable';

interface ISimulationTimelineProps {
  events: NodeInterface[];
}

const bla = {
  conversationId: 'conversationId',
  segmentId: 'segmentId',
  timecode: 'timecode',
  timecodeInSeconds: 20,
  iconSource: 'iconSource',
  transcript: 'transcript',
  dialogSequence: 1,
  notes: 'notes',
};

const SimulationTimeline: React.FC<ISimulationTimelineProps> = (props) => {
  return (
    <Container>
      <TimelineTable timelineEvents={[bla, bla, bla]} />
    </Container>
  );
};

export default SimulationTimeline;
