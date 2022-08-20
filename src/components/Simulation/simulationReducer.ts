/* eslint-disable @typescript-eslint/no-explicit-any */

import _ from 'lodash';
import { Event } from 'src/components/ForceGraph';

export interface ISumulationState {
  time: number;
  nodes: Event[];
  activeNodes: Event[];
  eventDuration: number;
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
      payload: Event[];
    };

export const initialState: ISumulationState = {
  time: 0,
  nodes: [],
  activeNodes: null,
  eventDuration: 10,
};

export const simulationReducer = (state: ISumulationState, action: IAction): ISumulationState => {
  const { type } = action;

  switch (type) {
    case 'setTime': {
      const currTime = action.payload;

      const activeNodes = _.chain(state.nodes)
        .filter((node) => {
          return currTime <= node.startTime + state.eventDuration && currTime >= node.startTime;
        })
        .value();

      return { ...state, time: action.payload, activeNodes };
    }
    case 'incrementTime': {
      return { ...state, time: state.time + action.payload };
    }
    case 'serNodes': {
      const nodes = _.orderBy(action.payload, (node) => node.startTime);

      return { ...state, nodes };
    }
    default:
      return state;
  }
};
