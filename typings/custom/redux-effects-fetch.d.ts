declare module 'redux-effects-fetch' {
  import {Action, Middleware} from 'redux';

  const fetchMiddleware: Middleware;
  export default fetchMiddleware;

  export function fetch(url?: string, params?: RequestInit): Action;
  export const FETCH: string;
  export const fetchEncodeJSON: Middleware;
}
