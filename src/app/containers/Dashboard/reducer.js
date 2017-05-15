import * as t from './actionTypes';

const initialState = {
  monthlyExpenseDetails: [],
  totalExpensesForAllMonths: [],
  totalAmountForCurrentMonth: 0
};

export default function(state = initialState, action) {
  switch(action.type) {
    case t.SET_MONTHLY_EXPENSE_DETAILS:
      return Object.assign({}, state, {
        monthlyExpenseDetails: action.payload
      });

    case t.ADD_EXPENSE:
      return Object.assign({}, state, {
        monthlyExpenseDetails: [...state.monthlyExpenseDetails, action.payload]
      });

    case t.SET_TOTAL_EXPENSES_FOR_ALL_MONTHS:
      return Object.assign({}, state, {
        totalExpensesForAllMonths: action.payload
      });

    case t.SET_TOTAL_AMOUNT_FOR_CURRENT_MONTH:
      return Object.assign({}, state, {
        totalAmountForCurrentMonth: action.payload
      });

    default:
      return state;
  }
}
