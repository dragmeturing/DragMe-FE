export const showsReducer = (state = [], action) => {
  switch (action.type) {
    case: 'ADD_SHOW':
      return [...state, action.show];

     default: 
      return state;
  };
};