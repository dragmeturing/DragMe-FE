import * as actions from './index'

describe('actions', () => {


  it('should get all shows', () => {
    const result = actions.getShows()

  });

  it('should toggle loading in state', () => {

  });

  it('should set and error into state', () => {
    const error = 'it\'s all gone so wrong';
    const expected = {
      type: 'SET_ERROR',
      error
    };

    const result = actions.setError(error)

    expect(result).toEqual(expected)
  });
});
