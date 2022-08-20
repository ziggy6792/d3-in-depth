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

const getActiveEvents = (
  { events, eventDuration }: ISumulationState,
  time: number,
  selectedEvent: SimulationEvent = _(events).findLast((event) => time >= event.startTime)
) => {
  const activeEvents = _.chain(events)
    .filter((node) => {
      return time <= node.startTime + eventDuration && time >= node.startTime;
    })
    .value();

  if (selectedEvent) return { activeEvents, selectedEvent: selectedEvent };

  return { activeEvents, selectedEvent };
};

export const simulationReducer = (state: ISumulationState, action: IAction): ISumulationState => {
  const { type } = action;

  switch (type) {
    case 'setTime': {
      const time = action.payload;
      const { activeEvents, selectedEvent } = getActiveEvents(state, time);
      return { ...state, time, activeEvents, selectedEvent };
    }
    case 'setSelectedEvent': {
      const newSelectedEvent = action.payload;
      const { activeEvents, selectedEvent } = getActiveEvents(state, newSelectedEvent.startTime, newSelectedEvent);
      return { ...state, time: selectedEvent.startTime, activeEvents, selectedEvent };
    }
    case 'incrementTime': {
      const time = state.time + action.payload;
      const { activeEvents, selectedEvent } = getActiveEvents(state, time);
      return { ...state, time, activeEvents, selectedEvent };
    }
    case 'setEvents': {
      const events = _.orderBy(action.payload, (node) => node.startTime);
      const time = 0;
      const { activeEvents, selectedEvent } = getActiveEvents(state, time);
      return { ...state, time, events, activeEvents, selectedEvent };
    }
    default:
      return state;
  }
};
