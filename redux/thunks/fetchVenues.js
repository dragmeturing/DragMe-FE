import { setError, isLoading, getVenues } from "../actions/index";
import { BEurl } from "../../utilities/url";

export const fetchVenues = () => {
  return async dispatch => {   
    try {
      dispatch(isLoading(true));
      const response = await fetch(`${BEurl}/venues`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const venues = await response.json();
      dispatch(getVenues(venues));
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};