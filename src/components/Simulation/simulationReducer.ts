/* eslint-disable @typescript-eslint/no-explicit-any */

import _ from 'lodash';
import { NodeData } from 'src/components/ForceGraph';

export interface ISumulationState {
  time: number;
  nodes: NodeData[];
  activeNode: NodeData | null;
}

export type IAction =
  | {
      type: 'setTime';
      payload: number;
    }
  | {
      type: 'incrementTime';
      payload: number;
    }
  | {
      type: 'serNodes';
      payload: NodeData[];
    };

export const initialState: ISumulationState = {
  time: 0,
  nodes: [],
  activeNode: null,
};

export const simulationReducer = (state: ISumulationState, action: IAction): ISumulationState => {
  const { type } = action;

  switch (type) {
    case 'setTime': {
      const activeNode = _.chain(state.nodes)
        .findLast((dec) => {
          return +dec.startTime < action.payload;
        })
        .value();

      return { ...state, time: action.payload, activeNode };
    }
    case 'incrementTime': {
      return { ...state, time: state.time + action.payload };
    }
    case 'serNodes': {
      return { ...state, nodes: action.payload };
    }
    default:
      return state;
  }
};
