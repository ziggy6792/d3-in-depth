import { SimulationLinkDatum, SimulationNodeDatum } from 'd3';

export enum FundType {
  VENTURE_CAPITAL = 'Venture Capital',
  REAL_ESTATE = 'Real Estate',
  HEDGE_FUND = 'Hedge Fund',
}

export enum SelectionFundAttributes {
  MANAGER = 'manager',
  YEAR = 'year',
  TYPE = 'type',
  ISOPEN = 'isOpen',
}

export enum NodeType {
  FUND = 'FUND',
}

export interface NodeDetails {
  name: string;
  manager: string;
  year: string;
  type: FundType;
  isOpen: boolean;
}

export interface NodeInterface extends SimulationNodeDatum {
  id: string;
  type: NodeType;
  details?: NodeDetails;
}

export interface GraphElements {
  nodes: NodeInterface[];
  links: SimulationLinkDatum<NodeInterface>[];
}
