import * as React from 'react';
import {connect} from 'react-redux';

import {increaseX, increaseY} from './actions';
import {IDispatchProps} from '../actionHelper';
import {IRootState} from '../reducers';

interface IHomePageStateProps {
  x: number;
  y: number;
}

interface IHomePageProps extends IHomePageStateProps, IDispatchProps {}

class HomePage extends React.Component<IHomePageProps, {}> {

  public render() {
    const {x, y} = this.props;

    return (
      <div>
        <h1>Welcome to Geonki!</h1>
        <p>
          X: {x}, Y: {y}
        </p>
        <p>
          <input type="button" value="Increase X" onClick={this.onClickX} />
          <input type="button" value="Increase Y" onClick={this.onClickY} />
        </p>
      </div>
    );
  }

  private onClickX = () => {
    this.props.dispatch(increaseX({by: 4}));
  };

  private onClickY = () => {
    this.props.dispatch(increaseY({by: 3}));
  };
}

function mapStateToProps(state: IRootState): IHomePageStateProps {
  const homeState = state.geonki.home;
  return {
    x: homeState.x,
    y: homeState.y
  };
}

export default connect(mapStateToProps)(HomePage);
