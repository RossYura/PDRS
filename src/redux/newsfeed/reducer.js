import {
  GET_NEWSFEED,
  EXPAND_NEWSFEED,
} from './actionTypes';

const initialState = {
  list: [],
  currentPage: 1,
  pagesTotal: Infinity,
};

const portfolioReducer = (state = initialState, action) => {
  switch (action.type) {

  case GET_NEWSFEED:
    return {
      ...state,
      list: action.data.updateEvents,
    };

  case EXPAND_NEWSFEED: {
    const newUpdateEvents = action.payload.data.updateEvents;
    const page = action.payload.page;

    return {
      ...state,
      list: [
        ...state.list,
        ...newUpdateEvents,
      ],
      currentPage: newUpdateEvents.length > 0
        ? page
        : state.currentPage,
      pagesTotal: newUpdateEvents.length > 0
        ? state.pagesTotal
        : state.currentPage,
    };
  }

  default:
    return state;
  }
};

export default portfolioReducer;