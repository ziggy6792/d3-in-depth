import { GraphNode } from 'src/components/ForceGraph';

export interface SimulationEvent {
  node: GraphNode;
  startTime: number;
}
