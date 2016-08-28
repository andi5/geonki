import {Reducer} from 'redux';
import {handleActions, Action} from 'redux-actions';
import {extend} from 'lodash';

import {SET_BOUNDING_BOX} from './actionTypes';
import {IBoundingBox} from './models';

export interface IHomeState {
  boundingBox: IBoundingBox;
}

const initialState: IHomeState = {
  boundingBox: {
    south: 0,
    west: 0,
    north: 0,
    east: 0
  }
};

export const homeReducer: Reducer<IHomeState> = handleActions<IHomeState, any>({
  [SET_BOUNDING_BOX]: (state: IHomeState, action: Action<any>) => {
    const payload = action.payload as IBoundingBox;
    return extend({}, state, {
      boundingBox: payload
    });
  }
}, initialState);
