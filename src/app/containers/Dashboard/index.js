import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';
import moment from 'moment';

import Divider from 'material-ui/Divider';
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import helpers from 'appPath/helpers';
import dashboardExports from './exports';
import DataGrid from 'appPath/components/DataGrid';
import BarChart from 'appPath/components/BarChart';
import DonutChart from 'appPath/components/DonutChart';

import styles from './style.scss';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      category: 'Miscellaneous',
      details: '',
      amount: 0
    };
    this.categories = ['Grocery', 'Credit Card', 'Entertainment', 'Education', 'Miscellaneous'];
    this.categoryMenuItems = [];

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleDetailsChange = this.handleDetailsChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleAddExpense = this.handleAddExpense.bind(this);
  }

  componentWillMount() {
    const userId = '591820b2f1db145b4bdabf5d';
    const month = helpers.getCurrentMonth();
    this.createMenuItemsForCategory();
    this.props.fetchMonthlyExpenseDetails(userId, month.toLowerCase());
    this.props.fetchTotalExpensesForAllMonths(userId);
  }

  createMenuItemsForCategory() {
    _.forEach(this.categories, (category) => {
      this.categoryMenuItems.push(<MenuItem value={category} key={category} primaryText={category} />);
    });
  }

  handleDateChange(event, date) {
    this.setState({date});
  }

  handleCategoryChange(event, index, value) {
    this.setState({category: value});
  }

  handleDetailsChange(event, newValue) {
    this.setState({details: newValue});
  }

  handleAmountChange(event, newValue) {
    this.setState({amount: newValue});
  }

  handleAddExpense() {
    const expenseDetails = {
      id: '591820b2f1db145b4bdabf5d',
      expenseId: helpers.getCurrentTimestamp(),
      month: helpers.getCurrentMonth().toLowerCase(),
      date: helpers.formatDate(this.state.date),
      category: this.state.category,
      details: this.state.details,
      currency: 'inr',
      amount: parseInt(this.state.amount)
    };

    this.props.addExpense(expenseDetails);
  }

  render() {
    const sortedDataByMonth = helpers.sortByMonth(this.props.dashboard.totalExpensesForAllMonths);
    return (
      <div>
        <div className={styles['dashboard-left-section']}>
          <DataGrid
            data={this.props.dashboard.monthlyExpenseDetails}
            totalAmountForCurrentMonth={this.props.dashboard.totalAmountForCurrentMonth}
          />
          <br/>
          <Divider />
          <div id="barChart-container">
            <BarChart
              containerId="barChart-container"
              data={sortedDataByMonth}
            />
          </div>
        </div>
        <div className={styles['dashboard-right-section']}>
          <div>
            <h2 className={styles.headers}>
              Add a New Expense
            </h2>
            <Divider />
            <DatePicker
              value={this.state.date}
              hintText="Select date"
              floatingLabelText="Select Date"
              container="inline"
              autoOk
              onChange={this.handleDateChange}
            />
            <SelectField
              value={this.state.category}
              onChange={this.handleCategoryChange}
              maxHeight={200}
              hintText="Select a category"
              floatingLabelText="Category"
            >
              {this.categoryMenuItems}
            </SelectField>
            <br/>
            <TextField
              hintText="Add description"
              floatingLabelText="Details"
              onChange={this.handleDetailsChange}
            />
            <br/>
            <TextField
              hintText="Amount spent"
              floatingLabelText="Amount"
              onChange={this.handleAmountChange}
            />
            <br/>
            <RaisedButton
              label="Add"
              primary={true}
              style={{marginTop: '1em'}}
              onClick={this.handleAddExpense}
            />
          </div>
          <br/>
          <Divider />
          <div className={styles['donutChart-container']}>
            <DonutChart
              data={[1, 2, 1, 5, 6, 8, 10]}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {dashboard: state.dashboard};
}

export default connect(mapStateToProps, dashboardExports.actions)(Dashboard);
