import { setError, isLoading, loginUser } from "../actions/index";
import { postPerformer } from "../../api/postPerformer";

export const fetchLogin = (token, navigate) => {
  return async dispatch => {
    try {
      dispatch(isLoading(true));
      const response = await postPerformer(token);
      console.log("response", response);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const user = await response.json();
      navigate('User')
      console.log("user", user);
      dispatch(loginUser(user));
      dispatch(isLoading(false));
    } catch (error) {
      navigate("User");
      dispatch(setError(error.message));
    }
  };
};
