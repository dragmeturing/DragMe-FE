import React from 'react';
import { ResultsScreen, mapStateToProps, mapDispatchToProps } from '../ResultsScreen';
import { shallow } from 'enzyme';
import { fetchShows } from '../../thunks/fetchShows';

jest.mock('../../thunks/fetchShows');

describe('ResultsScreen',() => {
  let wrapper, mockFetchShows, mockShows;

  beforeEach(() => {
    mockFetchShows = jest.fn();
    mockShows = [{title: 'new drag'},{title: 'drag this'}]
    wrapper = shallow(<ResultsScreen
      shows = {mockShows}
      fetchShows={mockFetchShows}
    />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when there are no shows', () => {
     wrapper = shallow(<ResultsScreen
      shows = {[]}
      fetchShows={mockFetchShows}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    it('should call fetchShows', () => {
      expect(mockFetchShows).toHaveBeenCalled();
    });
  });

  describe('mapStateToProps', () => {
    it('should map state to props', () => {
      const mockState = {shows:mockShows};
      const expected = {shows:mockShows};

      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected)
    });
  });

    describe('mapDispatchToProps', () => {
    it('should map ', () => {
      const mockDispatch = jest.fn();

      const props = mapDispatchToProps(mockDispatch);

      const thunk = fetchShows(mockShows);

      props.fetchShows(mockShows);

      expect(mockDispatch).toHaveBeenCalledWith(thunk)
    });
  });
});


