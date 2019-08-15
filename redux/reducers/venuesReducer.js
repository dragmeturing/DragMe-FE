export const venuesReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_VENUES":
      return action.venues;
    case "ADD_VENUE":
      return [...state, action.venue];
    default:
      return state;
  }
};
