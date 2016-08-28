import {createAction} from '../actionHelper';

const namespace = 'home';

export interface IIncreaseXPayload {
  by: number;
}
export const INCREASE_X = `${namespace}/INCREASE_X`;
export const increaseX = createAction<IIncreaseXPayload>(INCREASE_X);

export interface IIncreaseYPayload {
  by: number;
}
export const INCREASE_Y = `${namespace}/INCREASE_Y`;
export const increaseY = createAction<IIncreaseYPayload>(INCREASE_Y);
