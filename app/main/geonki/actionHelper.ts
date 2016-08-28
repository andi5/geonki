import {Dispatch} from 'redux';
import {Action} from 'redux-actions';

export interface IDispatchProps {
  dispatch: Dispatch<any>;
}

interface IActionCreator<Payload> {
  (payload: Payload): Action<Payload>;
}

export const createAction = <Payload>(type: string): IActionCreator<Payload> => (payload) => ({
  type,
  payload
});
