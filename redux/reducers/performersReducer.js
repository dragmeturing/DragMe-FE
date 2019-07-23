export const performersReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_PERFORMERS":
      return action.performers;

    default:
      return state;
  }
};
