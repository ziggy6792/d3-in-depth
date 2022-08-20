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

const getStateFromTime = (state: ISumulationState, newTime: number, newSelectedEvent?: SimulationEvent): ISumulationState => {
  const { events, eventDuration } = state;
  const activeEvents = _.chain(events)
    .filter((node) => {
      return newTime <= node.startTime + eventDuration && newTime >= node.startTime;
    })
    .value();

  if (newSelectedEvent) return { ...state, activeEvents, selectedEvent: newSelectedEvent, time: newTime };

  newSelectedEvent = newSelectedEvent || _(events).findLast((event) => newTime >= event.startTime);

  return { ...state, activeEvents, selectedEvent: newSelectedEvent, time: newTime };
};

export const simulationReducer = (state: ISumulationState, action: IAction): ISumulationState => {
  const { type } = action;

  switch (type) {
    case 'setTime': {
      const time = action.payload;
      return getStateFromTime(state, time);
    }
    case 'setSelectedEvent': {
      const newSelectedEvent = action.payload;
      return getStateFromTime(state, newSelectedEvent.startTime, newSelectedEvent);
    }
    case 'incrementTime': {
      const time = state.time + action.payload;
      return getStateFromTime(state, time);
    }
    case 'setEvents': {
      const events = _.orderBy(action.payload, (node) => node.startTime);
      const time = 0;
      return getStateFromTime({ ...state, events }, time);
    }
    default:
      return state;
  }
};
