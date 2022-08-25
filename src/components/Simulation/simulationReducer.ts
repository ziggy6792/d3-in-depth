/* eslint-disable @typescript-eslint/no-explicit-any */

import _ from 'lodash';
import { SimulationEvent } from './types';

export interface ISumulationState {
  time: number;
  events: SimulationEvent[];
  selectedEvent: SimulationEvent | null;
  activeEvents: SimulationEvent[];
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
      type: 'setSelectedEvent';
      payload: SimulationEvent;
    }
  | {
      type: 'setEvents';
      payload: SimulationEvent[];
    };

export const initialState: ISumulationState = {
  time: 0,
  events: [],
  activeEvents: null,
  selectedEvent: null,
  eventDuration: 10,
};

const updateState = (state: ISumulationState, newState: Partial<ISumulationState>): ISumulationState => {
  const mergedState = { ...state, ...newState };

  const { time, events, eventDuration } = mergedState;

  const activeEvents = _.chain(events)
    .filter((node) => {
      return time <= node.startTime + eventDuration && time >= node.startTime;
    })
    .value();

  return { ...mergedState, activeEvents, selectedEvent: newState.selectedEvent || _(events).findLast((event) => time >= event.startTime) };
};

export const simulationReducer = (state: ISumulationState, action: IAction): ISumulationState => {
  const { type } = action;

  switch (type) {
    case 'setTime': {
      const time = action.payload;
      return updateState(state, { time });
    }
    case 'setSelectedEvent': {
      const selectedEvent = action.payload;
      return updateState(state, { time: selectedEvent.startTime, selectedEvent });
    }
    case 'incrementTime': {
      const time = state.time + action.payload;
      return updateState(state, { time });
    }
    case 'setEvents': {
      const events = _.orderBy(action.payload, (node) => node.startTime);
      const time = 0;
      return updateState(state, { time, events });
    }
    default:
      return state;
  }
};
