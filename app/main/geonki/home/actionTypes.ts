import {createAction} from '../actionHelper';

import {IBoundingBox} from './models';

const namespace = 'home';

export const SET_BOUNDING_BOX = `${namespace}/SET_BOUNDING_BOX`;
export const setBoundingBox = createAction<IBoundingBox>(SET_BOUNDING_BOX);
