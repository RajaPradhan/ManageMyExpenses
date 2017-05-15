import { combineReducers } from 'redux';

import dashboardExports from './containers/Dashboard/exports';

const rootReducer = combineReducers({
  [dashboardExports.constants.NAME]: dashboardExports.reducer
});

export default rootReducer;
