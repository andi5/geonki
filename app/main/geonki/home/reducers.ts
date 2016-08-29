import {Reducer} from 'redux';
import {handleActions, Action} from 'redux-actions';
import {extend} from 'lodash';

import {SET_BOUNDING_BOX} from './actionTypes';
import {SET_LABELS_VISIBLE, ISetLabelsVisible} from './actionTypes';
import {SET_MAP_FIXED, ISetMapFixed} from './actionTypes';
import {GET_PLACES_SUCCESS} from './actionTypes';
import {IBoundingBox, INode, IOverpassResponse} from './models';

export interface IHomeState {
  boundingBox: IBoundingBox;
  labelsVisible: boolean;
  mapFixed: boolean;
  places?: INode[];
}

const initialState: IHomeState = {
  boundingBox: {
    south: 0,
    west: 0,
    north: 0,
    east: 0
  },
  labelsVisible: true,
  mapFixed: false,
  places: null
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
  },
  [SET_MAP_FIXED]: (state: IHomeState, action: Action<any>) => {
    const payload = action.payload as ISetMapFixed;
    return extend({}, state, {
      mapFixed: payload.fixed
    });
  },
  [GET_PLACES_SUCCESS]: (state: IHomeState, action: Action<any>) => {
    const payload = action.payload as IOverpassResponse;
    return extend({}, state, {
      places: payload.elements
    });
  }
}, initialState);
