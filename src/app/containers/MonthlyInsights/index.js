import React, { Component } from 'react';
import { connect } from 'react-redux';

import monthlyInsightsExports from './exports';

import Divider from 'material-ui/Divider';

import Tiles from 'appPath/components/Tiles';
import DataGrid from 'appPath/components/DataGrid';
import DonutChart from 'appPath/components/DonutChart';

import helpers from 'appPath/helpers';

import styles from './style.scss';

class MonthlyInsights extends Component {
  constructor(props) {
    super(props);

    this.handleTileClick = this.handleTileClick.bind(this);
  }

  componentWillMount() {
    console.log('gdgdgddg');
    const userId = '591820b2f1db145b4bdabf5d';
    const month = helpers.getCurrentMonth();
    this.props.fetchMonthlyExpenseDetails(userId, month.toLowerCase());
    this.props.fetchTotalExpensesForAllMonths(userId);
    this.props.fetchCategoryWiseExpenseForAMonth(userId, month.toLowerCase());
  }

  handleTileClick(month) {
    const userId = '591820b2f1db145b4bdabf5d';
    this.props.fetchMonthlyExpenseDetails(userId, month.toLowerCase());
    this.props.fetchCategoryWiseExpenseForAMonth(userId, month.toLowerCase());
  }

  render() {
    return (
      <div id="monthly-insights-container">
        <div className={styles['left-section']}>
          <Tiles
            months={helpers.months}
            expenses={this.props.monthlyInsights.totalExpensesForAllMonths}
            handleTileClick={this.handleTileClick}
          />
        </div>

        <div className={styles['right-section']}>
          <DataGrid
            data={this.props.monthlyInsights.monthlyExpenseDetails}
            totalAmountForCurrentMonth={this.props.monthlyInsights.totalAmountForCurrentMonth}
          />
          <br/>
          <Divider />
          <div className={styles['donutChart-container']}>
            <DonutChart
              data={this.props.monthlyInsights.categoryWiseExpenseForAMonth}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return  {monthlyInsights: state.dashboard}
}

export default connect(mapStateToProps, monthlyInsightsExports.actions.default)(MonthlyInsights);
