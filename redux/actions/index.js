export const getShows = (shows) => ({
  type: 'GET_SHOWS',
  shows
});

export const addShow = (show) => ({
  type: 'ADD_SHOW',
  show
});

export const getVenues = (venues) => ({
  type: 'GET_VENUES',
  venues
});

export const addVenue = (venue) => ({
  type: 'ADD_VENUE',
  venue
});

export const getPerformers = (performers) => ({
  type: 'GET_PERFORMERS',
  performers
});

export const isLoading = (bool) => ({
  type: 'IS_LOADING',
  bool
});

export const setError = (error) => ({
  type: 'SET_ERROR',
  error
});

export const loginUser = (user) => ({
  type: 'LOGIN_USER',
  user
});

export const logoutUser = () => ({
  type: 'LOGOUT_USER'
});