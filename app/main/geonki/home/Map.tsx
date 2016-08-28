import * as React from 'react';

import {IBoundingBox} from './models';
import {getNamespaces} from './namespaces';

import './map.scss';

const {cssPrefix} = getNamespaces(['Map']);

interface IMapProps {
  withLabels: boolean;
  fixed: boolean;
  setBoundingBox(boundingBox: IBoundingBox): void;
}

const latitudeAndLongitude = 'EPSG:4326';
const webMercator = 'EPSG:3857';

export default class Map extends React.Component<IMapProps, {}> {

  private mapNode: JSX.Element;
  private setMap = (node: JSX.Element): void => {
    this.mapNode = node;
  };

  private map: ol.Map;
  private layerWithoutLabels: ol.layer.Layer;
  private layerWithLabels: ol.layer.Layer;

  public componentDidMount = (): void => {
    this.initializeMap();
  };

  private initializeMap = (): void => {
    this.layerWithoutLabels = new ol.layer.Tile({
      visible: !this.props.withLabels,
      source: new ol.source.OSM({
        url: 'https://tiles.wmflabs.org/osm-no-labels/{z}/{x}/{y}.png',
        crossOrigin: null,
        wrapX: false
      })
    });

    this.layerWithLabels = new ol.layer.Tile({
      visible: this.props.withLabels,
      source: new ol.source.OSM({
        wrapX: false
      })
    });

    this.map = new ol.Map({
      target: this.mapNode,
      layers: [this.layerWithoutLabels, this.layerWithLabels],
      view: new ol.View({
        center: ol.proj.fromLonLat([11.0668, 49.4449], webMercator),
        zoom: 11
      }),
      controls: [new ol.control.Attribution()]
    });

    this.map.on('moveend', this.onMoveEnd);
  };

  public componentWillReceiveProps = (nextProps: IMapProps): void => {
    if (this.props.withLabels !== nextProps.withLabels) {
      this.layerWithoutLabels.setVisible(!nextProps.withLabels);
      this.layerWithLabels.setVisible(nextProps.withLabels);
    }

    if (this.props.fixed !== nextProps.fixed) {
      if (nextProps.fixed) {
        this.map.getInteractions().clear();
      } else {
        this.map.getInteractions().extend(ol.interaction.defaults({}).getArray());
      }
    }
  };

  private onMoveEnd = (event: ol.MapEvent): void => {
    const map = event.map;
    const extent = map.getView().calculateExtent(map.getSize());
    const bottomLeft = ol.proj.transform(ol.extent.getBottomLeft(extent), webMercator, latitudeAndLongitude);
    const topRight = ol.proj.transform(ol.extent.getTopRight(extent), webMercator, latitudeAndLongitude);

    this.props.setBoundingBox({
      south: bottomLeft[1],
      west: bottomLeft[0],
      north: topRight[1],
      east: topRight[0]
    });
  };

  public render() {
    return <div ref={this.setMap} className={cssPrefix} />;
  }
}
