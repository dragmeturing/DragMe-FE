import * as actions from './index'

describe('actions', () => {

  it('should get all shows', () => {
    const shows = [{title:'drag race'}, {title:'a real drag'}];
    const expected = {
      type: 'GET_SHOWS',
      shows
    };

    const result = actions.getShows(shows);

    expect(result).toEqual(expected);

  });

  it('should toggle loading in state', () => {
    const bool = true;
    const expected = {
      type: 'IS_LOADING',
      bool
    };
    
    const result = actions.isLoading(bool);

    expect(result).toEqual(expected);
  });

  it('should set and error into state', () => {
    const error = 'it\'s all gone so wrong';
    const expected = {
      type: 'SET_ERROR',
      error
    };

    const result = actions.setError(error);

    expect(result).toEqual(expected);
  });
});
