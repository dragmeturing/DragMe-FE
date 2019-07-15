export const showsReducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_SHOWS':
      return action.shows

     default: 
      return state;
  };
};