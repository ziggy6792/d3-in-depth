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
  const { events, eventDuration } = state;
  const { time: newTime, selectedEvent: newSelectedEvent } = newState;

  const activeEvents = _.chain(events)
    .filter((node) => {
      return newTime <= node.startTime + eventDuration && newTime >= node.startTime;
    })
    .value();

  return { ...state, ...newState, activeEvents, selectedEvent: newSelectedEvent || _(events).findLast((event) => newTime >= event.startTime) };
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
