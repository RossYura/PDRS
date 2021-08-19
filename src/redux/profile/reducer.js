import { GET_KEYWORDS } from './actionTypes';

const initialState = {
  keywords: []
};

const profileReducer = (state = initialState, action) => {
  switch(action.type) {

  case GET_KEYWORDS: 
    return {
      ...state,
      keywords: action.data.keywords
    };

  default:
    return state;
  }
};

export default profileReducer;