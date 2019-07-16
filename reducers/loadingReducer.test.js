 import { loadingReducer } from './loadingReducer';
 import * as actions from '../actions';

 describe ('isLoadingReducer', () => {

    it('should return default state', () => {
      const expected = false;
      const result = loadingReducer(undefined, {});

      expect(result).toEqual(expected);
    });

    it('should change is loading on the state tree', () => {
      const bool = true;
      const action = actions.isLoading(bool);
  
      const result = loadingReducer(undefined, action);
   
      expect(result).toEqual(true);
    });
 });