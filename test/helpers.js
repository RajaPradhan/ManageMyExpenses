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

// Prevent mocha from interpreting CSS @import files
function noop() {
  return null;
}

require.extensions['.css', '.scss'] = noop;
