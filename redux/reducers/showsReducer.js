export const showsReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_SHOWS':
      return action.shows

     default: 
      return state;
  };
};