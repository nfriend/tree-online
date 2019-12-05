import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { App } from './App';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {};

  const enzymeWrapper = shallow(<App {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('components', () => {
  describe('App', () => {
    it('should render a friendly greeting', () => {
      const { enzymeWrapper } = setup();

      expect(enzymeWrapper.find('h1').text()).toBe('Hello, world!');
    });
  });
});
