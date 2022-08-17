/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ISumulationState {
  time: number;
}

export type IAction =
  | {
      type: 'setTime';
      payload: number;
    }
  | {
      type: 'incrementTime';
      payload: number;
    };

export const initialState: ISumulationState = {
  time: 0,
};

export const simulationReducer = (state: ISumulationState, action: IAction): ISumulationState => {
  const { type } = action;

  switch (type) {
    case 'setTime': {
      return { ...state, time: action.payload };
    }
    case 'incrementTime': {
      return { ...state, time: state.time + action.payload };
    }
    default:
      return state;
  }
};
