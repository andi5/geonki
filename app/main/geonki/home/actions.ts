export {setBoundingBox, setLabelsVisible, setMapFixed} from './actionTypes';

import {fetch} from 'redux-effects-fetch';

import {getPlacesStart, getPlacesSuccess, getPlacesFailure} from './actionTypes';
import {bind} from '../actionHelper';
import {IBoundingBox, IOverpassResponse} from './models';

export const getPlaces = (boundingBox: IBoundingBox) => bind<{}>(
  getPlacesStart({}),
  () => fetchPlaces(boundingBox)
);

const fetchPlaces = (boundingBox: IBoundingBox) => {
  const data = overpassDataParam(`node(${overpassBoundingBox(boundingBox)})[place=city][name]`);
  const url = `http://overpass-api.de/api/interpreter?data=${data}`;

  return bind<{}>(
    fetch(url),
    parsePlaces,
    () => getPlacesFailure({})
  );
};

const parsePlaces = ({value}) => getPlacesSuccess(value as IOverpassResponse);

const overpassBoundingBox = (box: IBoundingBox): string => `${box.south},${box.west},${box.north},${box.east}`;

const overpassDataParam = (query: string): string => encodeURIComponent(`[out:json];(${query};);out meta;`);
