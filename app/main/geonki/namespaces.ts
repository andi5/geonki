import {lowerFirst} from 'lodash';

const cssChildren: {[key: string]: string} = {
  home: 'home'
};

export interface INamespaces {
  cssPrefix: string;
  intlNamespace: string;
}

export const getNamespaces = (componentPath: string[]): INamespaces => {
  const cssComponentPath = componentPath.map((segment, idx) => {
    if (idx === 0) {
      return cssChildren[segment] || segment;
    } else if (idx === componentPath.length - 1) {
      return lowerFirst(segment);
    } else {
      return segment;
    }
  });

  return {
    cssPrefix: cssComponentPath.join('-'),
    intlNamespace: componentPath.join('.')
  };
};
