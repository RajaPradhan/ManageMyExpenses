import React from 'react';

import MainLayout from 'appPath/containers/MainLayout';
import Dashboard from 'appPath/containers/Dashboard';

describe('Dashboard Container', () => {
  it('should call componentWillMount once', () => {
    //console.log('prototype', Dashboard);
    //stub(Dashboard.prototype, 'componentWillMount', () => {console.log('doneeeeee');});
    // stub(MainLayout.prototype, 'getActiveTabPathname', () => { return '/dashboard'; });
    // const wrapper = renderComponent(mount, MainLayout, {}, {});
    // console.log('prototype ======', wrapper.find('Tab').at(0).children());
    // stub(wrapper.find(Dashboard).prototype, 'componentWillMount', () => {});

    //expect(Dashboard.prototype.componentWillMount.calledOnce).to.equal(true);
    //Dashboard.prototype.componentWillMount.restore();
  });
});
