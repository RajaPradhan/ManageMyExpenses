import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from 'appPath/actions';

import DonutChart from 'appPath/components/DonutChart';

import helpers from 'appPath/helpers';

import styles from './style.scss';

class OtherInsights extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const userId = '591820b2f1db145b4bdabf5d';
    const month = helpers.getCurrentMonth();
    this.props.fetchCategoryWiseExpenseForAllMonths(userId);
  }

  render() {
    return (
      <div id="other-insights-container">
        <div className={styles['middle-section']}>
          <div className={styles['donutChart-container']}>
            <DonutChart
              data={this.props.otherInsights.categoryWiseExpenseForAllMonths}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return  {otherInsights: state}
}

export default connect(mapStateToProps, actions)(OtherInsights);
