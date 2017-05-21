import React from 'react';

import MainLayout from '../../src/containers/MainLayout';

describe('Container MainLayout', () => {
  it('should have three tabs', () => {
    const wrapper = mount(<MainLayout />);
    expect(wrapper.find('button')).to.have.length(3);
  });

  it('should give the initialSelectedIndex of Tabs', () => {
    const wrapper = mount(<MainLayout />);
    expect(wrapper.find('Tabs').props().initialSelectedIndex).to.equal(0);
  });

  it('should give label of first tab', () => {
    const wrapper = mount(<MainLayout />);
    expect(wrapper.find('Tab').at(0).props().label).to.equal('Dashboard');
  });

  // it('should change the url pathname to /dashboard', () => {
  //   const wrapper = mount(<MainLayout />);
  //   const tab = {
  //     props: {
  //       'data-route': '/dashboard'
  //     }
  //   };
  //   wrapper.find('Tab').at(0).props().onActive(tab);
  //   expect(window.location.pathname).to.equal('/dashboard');
  // });
});
