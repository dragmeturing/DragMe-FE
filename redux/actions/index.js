export const getShows = (shows) => ({
  type: 'GET_SHOWS',
  shows
});

export const getVenues = (venues) => ({
  type: 'GET_VENUES',
  venues
})

export const isLoading = (bool) => ({
  type: 'IS_LOADING',
  bool
});

export const setError = (error) => ({
  type: 'SET_ERROR',
  error
});