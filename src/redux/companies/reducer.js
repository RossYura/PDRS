import {
  COMPANIES_WITH_INVESTMENTS_RECEIVED
} from './actionTypes';

const initialState = {
  pendingCompanies: []
};

const investmentsReducer = (state = initialState, action) => {
  const { type, payload, error, meta } = action;
  switch (type) {

  case COMPANIES_WITH_INVESTMENTS_RECEIVED: {
    return {
      ...state,
      pendingCompanies: payload
    };
  }

  default:
    return state;
  }
};

export default investmentsReducer;