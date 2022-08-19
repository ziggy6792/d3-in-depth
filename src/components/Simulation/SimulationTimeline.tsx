import { NodeInterface } from 'src/components/ForceGraph/types';
import Container from 'src/components/Container/Container';
import TimelineTable from 'src/components/TimelineTable';

interface ISimulationTimelineProps {
  events: NodeInterface[];
}

const SimulationTimeline: React.FC<ISimulationTimelineProps> = ({ events }) => {
  return <TimelineTable timelineEvents={events} />;
};

export default SimulationTimeline;
