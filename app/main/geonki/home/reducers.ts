import {Reducer} from 'redux';
import {handleActions, Action} from 'redux-actions';
import {extend} from 'lodash';

import {SET_BOUNDING_BOX, SET_LABELS_VISIBLE, ISetLabelsVisible} from './actionTypes';
import {IBoundingBox} from './models';

export interface IHomeState {
  boundingBox: IBoundingBox;
  labelsVisible: boolean;
}

const initialState: IHomeState = {
  boundingBox: {
    south: 0,
    west: 0,
    north: 0,
    east: 0
  },
  labelsVisible: true
};

export const homeReducer: Reducer<IHomeState> = handleActions<IHomeState, any>({
  [SET_BOUNDING_BOX]: (state: IHomeState, action: Action<any>) => {
    const payload = action.payload as IBoundingBox;
    return extend({}, state, {
      boundingBox: payload
    });
  },
  [SET_LABELS_VISIBLE]: (state: IHomeState, action: Action<any>) => {
    const payload = action.payload as ISetLabelsVisible;
    return extend({}, state, {
      labelsVisible: payload.visible
    });
  }
}, initialState);
