import { setError, isLoading, getShows } from "../actions/index";
import { BEurl } from "../../utilities/url";

export const fetchShows = () => {
  return async dispatch => {
    try {
      dispatch(isLoading(true));
      const response = await fetch(`${BEurl}/shows`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const shows = await response.json();
      dispatch(getShows(shows.data));
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};
