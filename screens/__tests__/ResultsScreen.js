import React from 'react';
import { ResultsScreen, mapStateToProps, mapDispatchToProps } from '../ResultsScreen';
import { shallow } from 'enzyme';
import { fetchShows } from '../../redux/thunks/fetchShows';
import { cleanVenues } from '../../utilities/mockData';

jest.mock('../../redux/thunks/fetchShows');

describe('ResultsScreen',() => {
  let wrapper, mockFetchShows, mockFetchVenues, mockShows;

  beforeEach(() => {
    mockFetchShows = jest.fn();
    mockFetchVenues = jest.fn();
    mockShows = [{title: 'new drag', id: 1 },{title: 'drag this', id: 2 }]
    wrapper = shallow(<ResultsScreen
      shows = {mockShows}
      venues={cleanVenues}
      fetchShows={mockFetchShows}
      fetchVenues={mockFetchVenues}
    />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when there are no shows', () => {
     wrapper = shallow(
       <ResultsScreen
         shows={[]}
         fetchShows={mockFetchShows}
         fetchVenues={mockFetchVenues}
       />
     );
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
    it('should call dispatch with the currect thunk', () => {
      const mockDispatch = jest.fn();

      const props = mapDispatchToProps(mockDispatch);

      const thunk = fetchShows(mockShows);

      props.fetchShows(mockShows);

      expect(mockDispatch).toHaveBeenCalledWith(thunk)
    });
  });
});


