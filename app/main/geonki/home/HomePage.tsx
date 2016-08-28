import * as React from 'react';
import {connect} from 'react-redux';
import * as ol from 'openlayers';

import {setBoundingBox} from './actions';
import {IDispatchProps} from '../actionHelper';
import {IRootState} from '../reducers';
import {getNamespaces} from './namespaces';
import {IBoundingBox} from './models';

import './homePage.scss';

const {cssPrefix} = getNamespaces(['HomePage']);

interface IHomePageStateProps {
  boundingBox: IBoundingBox;
}

const latitudeAndLongitude = 'EPSG:4326';
const webMercator = 'EPSG:3857';

interface IHomePageProps extends IHomePageStateProps, IDispatchProps {}

class HomePage extends React.Component<IHomePageProps, {}> {

  private mapNode: JSX.Element;
  private setMap = (node: JSX.Element): void => {
    this.mapNode = node;
  };

  public componentDidMount = (): void => {
    this.initializeMap();
  };

  private initializeMap = (): void => {
    const map = new ol.Map({
      target: this.mapNode,
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([11.0668, 49.4449], webMercator),
        zoom: 11
      })
    });

    map.on('moveend', this.onMoveEnd);
  };

  private onMoveEnd = (event: ol.MapEvent): void => {
    const map = event.map;
    const extent = map.getView().calculateExtent(map.getSize());
    const bottomLeft = ol.proj.transform(ol.extent.getBottomLeft(extent), webMercator, latitudeAndLongitude);
    const topRight = ol.proj.transform(ol.extent.getTopRight(extent), webMercator, latitudeAndLongitude);

    this.props.dispatch(setBoundingBox({
      south: bottomLeft[1],
      west: bottomLeft[0],
      north: topRight[1],
      east: topRight[0]
    }));
  };

  public render() {
    const {boundingBox} = this.props;

    return (
      <div>
        <h1>Welcome to Geonki!</h1>
        <div>
          <div ref={this.setMap} className={`${cssPrefix}-map`} />
          <p>
            {boundingBox.south},{boundingBox.west},{boundingBox.north},{boundingBox.east}
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState): IHomePageStateProps => {
  const homeState = state.geonki.home;
  return {
    boundingBox: homeState.boundingBox
  };
};

export default connect(mapStateToProps)(HomePage);
