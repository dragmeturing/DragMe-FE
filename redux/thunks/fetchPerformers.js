import { setError, isLoading, getPerformers } from "../actions/index";
import { BEurl } from "../../utilities/url";

export const fetchPerformers = () => {
  return async dispatch => {
    try {
      dispatch(isLoading(true));
      const response = await fetch(`${BEurl}/performers`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const performers = await response.json();
      dispatch(getPerformers(performers));
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};
