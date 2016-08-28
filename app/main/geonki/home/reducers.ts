import {Reducer} from 'redux';
import {handleActions, Action} from 'redux-actions';
import {extend} from 'lodash';

import {INCREASE_X, IIncreaseXPayload} from './actionTypes';
import {INCREASE_Y, IIncreaseYPayload} from './actionTypes';

export interface IHomeState {
  x: number;
  y: number;
}

const initialState: IHomeState = {
  x: 0,
  y: 0
};

export const homeReducer: Reducer<IHomeState> = handleActions<IHomeState, any>({
  [INCREASE_X]: (state: IHomeState, action: Action<any>) => {
    const payload = action.payload as IIncreaseXPayload;
    return extend({}, state, {
      x: state.x + payload.by
    });
  },
  [INCREASE_Y]: (state: IHomeState, action: Action<any>) => {
    const payload = action.payload as IIncreaseYPayload;
    return extend({}, state, {
      y: state.y + payload.by
    });
  }
}, initialState);
