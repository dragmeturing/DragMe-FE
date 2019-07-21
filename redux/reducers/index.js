import { combineReducers } from 'redux';
import { showsReducer } from './showsReducer';
import { loadingReducer } from './loadingReducer';
import { errorReducer } from './errorReducer';
import { userReducer } from './userReducer'
import { venuesReducer } from './venuesReducer';

export const rootReducer = combineReducers({
  shows: showsReducer,
  loading: loadingReducer,
  error: errorReducer,
  user: userReducer,
  venues: venuesReducer
});