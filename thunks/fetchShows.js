import { setError, isLoading, getShows } from "../actions/index";

export const fetchShows = () => {
  return async dispatch => {
    const url = "https://dragme-be.herokuapp.com/api/show";
   
    try {
      dispatch(isLoading(true));
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const shows = await response.json();
      dispatch(getShows(shows));
      dispatch(isLoading(false));
      console.log('shows in fetch',shows)
    } catch (error) {
      dispatch(setError(error.error));
    }
  };
};