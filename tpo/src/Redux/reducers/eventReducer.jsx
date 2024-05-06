

import { CHANGE_SORT_METHOD } from '../actions/eventActions';

const initialState = {
  sortBy: null,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SORT_METHOD:
      return {
        ...state,
        sortBy: action.payload,
      };
    default:
      return state;
  }
};

export default eventReducer;
