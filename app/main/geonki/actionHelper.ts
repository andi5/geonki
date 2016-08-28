import {Dispatch} from 'redux';
import {Action} from 'redux-actions';

export interface IDispatchProps {
  dispatch: Dispatch<any>;
}

interface IActionCreator<Payload> {
  (payload: Payload): Action<Payload>;
}

export function createAction<Payload>(type: string): IActionCreator<Payload> {
  return (payload: Payload) => ({
    type,
    payload
  });
}
