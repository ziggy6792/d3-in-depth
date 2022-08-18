import { SimulationLinkDatum, SimulationNodeDatum } from 'd3';

export interface NodeDetails {
  name: string;
}

export interface NodeInterface extends SimulationNodeDatum {
  id: string;
  details?: NodeDetails;
}

export interface GraphElements {
  nodes: NodeInterface[];
  links: SimulationLinkDatum<NodeInterface>[];
}
