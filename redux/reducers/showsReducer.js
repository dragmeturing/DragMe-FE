export const showsReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_SHOWS':
      return action.shows
    case 'ADD_SHOW':
      return [action.show, ...state]
     default: 
      return state;
  };
};