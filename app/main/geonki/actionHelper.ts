import {Dispatch} from 'redux';
import {Action, ActionMeta} from 'redux-actions';

export interface IDispatchProps {
  dispatch: Dispatch<any>;
}

export interface IActionCreator<Payload> {
  (payload: Payload): Action<Payload>;
}

export const createAction = <Payload>(type: string): IActionCreator<Payload> => (payload) => ({
  type,
  payload
});

type IMetaStep = (output: any) => any;

interface IMetaSteps {
  steps: IMetaStep[][];
}

type IBoundAction<Payload> = ActionMeta<Action<Payload>, IMetaSteps>;

export const bind = <Payload>(
  action: Action<Payload>,
  onSuccess: IMetaStep,
  onFailure?: IMetaStep
): IBoundAction<Payload> => ({
  type: 'EFFECT_COMPOSE',
  payload: action,
  meta: {
    steps: [[onSuccess, onFailure]]
  }
});
