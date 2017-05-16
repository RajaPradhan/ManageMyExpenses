import * as t from './actionTypes';

const initialState = {
  monthlyExpenseDetails: [],
  totalExpensesForAllMonths: [],
  totalAmountForCurrentMonth: 0,
  categoryWiseExpenseForAMonth: [],
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

    case t.SET_CATEGORY_WISE_EXPENSE_FOR_A_MONTH:
      return Object.assign({}, state, {
        categoryWiseExpenseForAMonth: action.payload
      });

    default:
      return state;
  }
}
