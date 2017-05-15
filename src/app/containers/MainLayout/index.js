import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';

import styles from './style.scss';

export default class MainLayout extends Component {
  constructor(props) {
    super(props);
  }

  handleTabChange(tab) {
    const dataRoute = tab.props['data-route'];
    browserHistory.push(dataRoute);
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar
            title="ManageMyExpenses"
            showMenuIconButton={false}
          />
        </MuiThemeProvider>

        <MuiThemeProvider>
          <Tabs>
            <Tab
              label="Dashboard"
              data-route="/dashboard"
              onActive={this.handleTabChange}
            >
              {this.props.children}
            </Tab>

            <Tab
              label="Monthly Insights"
              data-route="/monthly-insights"
              onActive={this.handleTabChange}
            >
              {this.props.children}
            </Tab>

            <Tab label="Other Insights"
              data-route="/other-insights"
              onActive={this.handleTabChange}
            >
              {this.props.children}
            </Tab>
          </Tabs>
        </MuiThemeProvider>
      </div>
    );
  }
}
