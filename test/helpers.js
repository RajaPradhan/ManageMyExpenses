import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import _ from 'lodash';

import reducer from 'appPath/reducer';

import { expect } from 'chai';
import { sinon, spy, stub } from 'sinon';
import { mount, render, shallow } from 'enzyme';

global.expect = expect;
global.sinon = sinon;
global.spy = spy;
global.stub = stub;

global.mount = mount;
global.render = render;
global.shallow = shallow;

global._ = _;

// Prevent mocha from interpreting CSS @import files
function noop() {
  return null;
}

require.extensions['.css', '.scss'] = noop;

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducer);

const renderComponent = (renderType, Component, props, state) => {
  const wrapper = renderType(
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );

  return wrapper.find(Component);
};

global.renderComponent = renderComponent;
