export {setBoundingBox, setLabelsVisible, setMapFixed} from './actionTypes';

import {getPlacesStart} from './actionTypes';
import {bind} from '../actionHelper';
import {IBoundingBox} from './models';

export const getPlaces = (boundingBox: IBoundingBox) => bind<{}>(
  getPlacesStart({}),
  () => getPlacesStart({})
);
