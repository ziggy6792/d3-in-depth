import { SimulationLinkDatum, SimulationNodeDatum } from 'd3';

export interface Idable {
  id: string;
}

export interface NodeData extends Idable {
  name: string;
  startTime: number;
}

export interface GraphNode extends Idable {
  name: string;
}

export interface NodeInterface extends SimulationNodeDatum {
  data: GraphNode;
}

export interface GraphElements {
  nodes: NodeInterface[];
  links: SimulationLinkDatum<NodeInterface>[];
}
