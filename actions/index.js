export const updateShows = (shows) => ({
  type: 'UPDATE_SHOWS',
  shows
})

export const setLoading = (bool) => ({
  type: 'SET_LOADING',
  bool
});

export const setError = (error) => ({
  type: 'SET_ERROR',
  error
});