/* eslint-disable @typescript-eslint/no-explicit-any */

import _ from 'lodash';

type NodeSequence = { [key: number]: string };

export interface ISumulationState {
  time: number;
  nodeSequence: NodeSequence;
  activeNode: string | null;
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
      type: 'setNodeSequence';
      payload: NodeSequence;
    };

export const initialState: ISumulationState = {
  time: 0,
  nodeSequence: {},
  activeNode: null,
};

export const simulationReducer = (state: ISumulationState, action: IAction): ISumulationState => {
  const { type } = action;

  switch (type) {
    case 'setTime': {
      const nextNodeStartTime = _.chain(Object.keys(state.nodeSequence))
        .findLast((dec) => {
          return +dec < action.payload;
        })
        .value();

      const activeNode = state.nodeSequence[nextNodeStartTime];

      return { ...state, time: action.payload, activeNode };
    }
    case 'incrementTime': {
      return { ...state, time: state.time + action.payload };
    }
    case 'setNodeSequence': {
      return { ...state, nodeSequence: action.payload };
    }
    default:
      return state;
  }
};
