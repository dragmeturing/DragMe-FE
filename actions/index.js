export const addShow = (show) => ({
  type: 'ADD_SHOW',
  show
});

export const setLoading = (bool) => ({
  type: 'SET_LOADING',
  bool
});

export const setError = (error) => ({
  type: 'SET_ERROR',
  error
});