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

  getInitialSelectedIndex() {
    const pathname = window.location.pathname;

    if(pathname === '/dashboard') {
      return 0;
    } else if(pathname === '/monthly-insights') {
      return 1;
    } else if(pathname === '/other-insights') {
      return 2;
    } else {
      return 0;
    }
  }

  getActiveTabPathname() {
    return window.location.pathname;
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
          <Tabs
            initialSelectedIndex={this.getInitialSelectedIndex()}
          >
            <Tab
              label="Dashboard"
              data-route="/dashboard"
              onActive={this.handleTabChange}
            >
              {this.getActiveTabPathname() === '/dashboard' && this.props.children}
            </Tab>

            <Tab
              label="Monthly Insights"
              data-route="/monthly-insights"
              onActive={this.handleTabChange}
            >
              {this.getActiveTabPathname() === '/monthly-insights' && this.props.children}
            </Tab>

            <Tab
              label="Other Insights"
              data-route="/other-insights"
              onActive={this.handleTabChange}
            >
              {this.getActiveTabPathname() === '/other-insights' && this.props.children}
            </Tab>
          </Tabs>
        </MuiThemeProvider>
      </div>
    );
  }
}
