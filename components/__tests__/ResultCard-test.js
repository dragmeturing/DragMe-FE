import React from 'react';
import { shallow } from 'enzyme';
import ResultCard from '../ResultCard';
import { shows } from '../../utilities/mockData';

describe('ResultCard', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ResultCard data={shows[0]}/>)
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
