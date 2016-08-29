export interface IBoundingBox {
  south: number;
  west: number;
  north: number;
  east: number;
}

type Place = 'city' | 'suburb';

export interface INode {
  id: number;
  lat: number;
  lon: number;
  tags: {
    name: string;
    place?: Place
  };
}

export interface IOverpassResponse {
  elements: INode[];
}
