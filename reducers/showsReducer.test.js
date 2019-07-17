 import { showsReducer } from './showsReducer';
 import * as actions from '../actions';

describe('showsReducer', () => {
   const shows = [{title:'drag race'}, {title:'a real drag'}];

  it('should return default state', () => {
    const expected = [];
    const result = showsReducer(undefined, {});

    expect(result).toEqual(expected);
  });

  it('should get shows and put them in state', () => {
    const expected = shows;
    const action = actions.getShows(shows);
    const result = showsReducer([], action);

    expect(result).toEqual(expected);
  });
});

