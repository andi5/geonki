import * as React from 'react';
import {connect} from 'react-redux';

import {setBoundingBox, setLabelsVisible, getPlaces} from './actions';
import {IDispatchProps} from '../actionHelper';
import {IRootState} from '../reducers';
import {getNamespaces} from './namespaces';
import {IBoundingBox} from './models';
import Map from './Map';

import './homePage.scss';
import {setMapFixed} from './actionTypes';

const {cssPrefix} = getNamespaces(['HomePage']);

interface IHomePageStateProps {
  boundingBox: IBoundingBox;
  labelsVisible: boolean;
  mapFixed: boolean;
}

interface IHomePageProps extends IHomePageStateProps, IDispatchProps {}

class HomePage extends React.Component<IHomePageProps, {}> {

  private setBoundingBoxBound = (boundingBox: IBoundingBox): void => {
    this.props.dispatch(setBoundingBox(boundingBox));
  };

  public render() {
    const {boundingBox, labelsVisible, mapFixed} = this.props;

    return (
      <div>
        <h1>Welcome to Geonki!</h1>
        <div>
          <div className={`${cssPrefix}-map`}>
            <Map withLabels={labelsVisible} setBoundingBox={this.setBoundingBoxBound} fixed={mapFixed} />
          </div>
          <p>
            <label>
              <input type="checkbox" checked={labelsVisible} onChange={this.onLabelsVisibleChange} />
              With labels
            </label>
          </p>
          <p>
            {boundingBox.south},{boundingBox.west},{boundingBox.north},{boundingBox.east}
          </p>
          <p>
            {!mapFixed && <input type="button" value="Fix map!" onClick={this.fixMap} />}
            {mapFixed && <span>Fixed</span>}
          </p>
        </div>
      </div>
    );
  }

  private onLabelsVisibleChange = (): void => {
    this.props.dispatch(setLabelsVisible({visible: !this.props.labelsVisible}));
  };

  private fixMap = (): void => {
    this.props.dispatch(setMapFixed({fixed: true}));
    this.props.dispatch(getPlaces(this.props.boundingBox))
  };
}

const mapStateToProps = (state: IRootState): IHomePageStateProps => {
  const homeState = state.geonki.home;
  return {
    boundingBox: homeState.boundingBox,
    labelsVisible: homeState.labelsVisible,
    mapFixed: homeState.mapFixed
  };
};

export default connect(mapStateToProps)(HomePage);
