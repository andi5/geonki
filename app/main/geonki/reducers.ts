import {combineReducers, Reducer} from 'redux';
import {routerReducer} from 'react-router-redux';

import {IHomeState, homeReducer} from './home/reducers';

interface IGeonkiState {
  home: IHomeState;
}

const geonkiReducer: Reducer<IGeonkiState> = combineReducers<IGeonkiState>({
  home: homeReducer
});

export interface IRootState {
  geonki: IGeonkiState;
}

export const rootReducer: Reducer<IRootState> = combineReducers<IRootState>({
  geonki: geonkiReducer,
  routing: routerReducer
});
