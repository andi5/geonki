import {getNamespaces as parentGetNamespaces, INamespaces} from '../namespaces';

const name: string = 'home';

export const getNamespaces = (componentPath: string[]): INamespaces => parentGetNamespaces([name, ...componentPath]);
