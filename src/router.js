import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import MainLayout from './containers/MainLayout';
import Dashboard from './containers/Dashboard';
import MonthlyInsights from './containers/MonthlyInsights';
import OtherInsights from './containers/OtherInsights';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={Dashboard} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="monthly-insights" component={MonthlyInsights} />
      <Route path="other-insights" component={OtherInsights} />
    </Route>
  </Router>
);
