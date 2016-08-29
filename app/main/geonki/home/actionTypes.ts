import {createAction} from '../actionHelper';

import {IBoundingBox} from './models';

const namespace = 'home';

export const SET_BOUNDING_BOX = `${namespace}/SET_BOUNDING_BOX`;
export const setBoundingBox = createAction<IBoundingBox>(SET_BOUNDING_BOX);

export interface ISetLabelsVisible {
  visible: boolean;
}
export const SET_LABELS_VISIBLE = `${namespace}/SET_LABELS_VISIBLE`;
export const setLabelsVisible = createAction<ISetLabelsVisible>(SET_LABELS_VISIBLE);

export interface ISetMapFixed {
  fixed: boolean;
}
export const SET_MAP_FIXED = `${namespace}/SET_MAP_FIXED`;
export const setMapFixed = createAction<ISetMapFixed>(SET_MAP_FIXED);

export const GET_PLACES_START = `${namespace}/GET_PLACES_START`;
export const getPlacesStart = createAction<{}>(GET_PLACES_START);
