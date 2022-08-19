import { NodeInterface } from 'src/components/ForceGraph/types';
import TimelineTable from 'src/components/TimelineTable';

interface ISimulationTimelineProps {
  events: NodeInterface[];
}

const SimulationTimeline: React.FC<ISimulationTimelineProps> = ({ events }) => {
  return <TimelineTable rows={events} />;
};

export default SimulationTimeline;
