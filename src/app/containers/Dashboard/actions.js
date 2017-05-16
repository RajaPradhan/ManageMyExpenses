import axios from 'axios';
import _ from 'lodash';

import helpers from 'appPath/helpers';

import config from 'root/app.config.json';

import * as t from './actionTypes';

const API_BASE_URL = config.API_BASE_URL;

export const fetchMonthlyExpenseDetails = (userId, month) => {
  return (dispatch) => {
    axios.get(`${API_BASE_URL}/expenses/${userId}/${month}`)
    .then(response => {
      if(response.data.result.length) {
        let monthlyExpenseDetails = response.data.result[0].expenses.expenditure;
        dispatch({
          type: t.SET_MONTHLY_EXPENSE_DETAILS,
          payload: monthlyExpenseDetails
        });
      }
    })
    .catch(error => {
      console.log('Error occured while fetching monthly expense details', error);
    });
  };
};

export const addExpense = (expenseDetails) => {
  return (dispatch) => {
    axios.post(`${API_BASE_URL}/expenses`, expenseDetails)
    .then(response => {
      if(response.data.result.ok === 1) {
        dispatch({
          type: t.ADD_EXPENSE,
          payload: expenseDetails
        });
        dispatch(fetchTotalExpensesForAllMonths(expenseDetails.id));
      }
    })
    .catch();
  };
};

export const fetchTotalExpensesForAllMonths = (userId) => {
  return (dispatch) => {
    axios.get(`${API_BASE_URL}/analytics/expenses/${userId}`)
    .then(response => {
      if(response.data.result.length) {
        dispatch({
          type: t.SET_TOTAL_EXPENSES_FOR_ALL_MONTHS,
          payload: response.data.result
        });

        const totalAmountForCurrentMonth = _.find(response.data.result, {
          _id: helpers.getCurrentMonth().toLowerCase()
        });
        if(totalAmountForCurrentMonth) {
          dispatch({
            type: t.SET_TOTAL_AMOUNT_FOR_CURRENT_MONTH,
            payload: totalAmountForCurrentMonth.total
          });
        }
      }
    })
    .catch();
  };
};

export const fetchCategoryWiseExpenseForAMonth = (userId, month) => {
  return (dispatch) => {
    axios.get(`${API_BASE_URL}/analytics/expenses/category/${userId}/${month}`)
    .then(response => {
      if(response.data.result.length) {
        dispatch({
          type: t.SET_CATEGORY_WISE_EXPENSE_FOR_A_MONTH,
          payload: response.data.result
        });
      }
    })
    .catch();
  };
};
