 import { loadingReducer } from '../loadingReducer';
 import * as actions from '../../actions';

 describe ('isLoadingReducer', () => {

    it('should return default state', () => {
      const expected = false;
      const result = loadingReducer(undefined, {});

      expect(result).toEqual(expected);
    });

    it('should change is loading on the state tree', () => {
      const expected = true;
      const action = actions.isLoading(true);
  
      const result = loadingReducer(undefined, action);
   
      expect(result).toEqual(expected);
    });
 });