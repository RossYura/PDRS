import {
  GET_INVEST_MATCHES,
  INVEST_STARTUP,
  GET_SELECTED_INVEST_MATCH,
  SUBMIT_STARTUP_QUESTION,
  GET_PROSPECT_MATCHES,
  TOGGLE_PROSPECT_SWITCH
} from './actionTypes';

const initialState = {
  pendingInvestments: [],
  matches: [],
  selected_match: {
    company: {},
    pitchVideoUrl: '',
    investorQuestions: [],
    metrics: [],
    metricMonths: {},
    allInvestments: [],
    userInvestments: [],
    match: {},
  },
  prospectMatches: [],
  prospectSwitchToggled: false
};

const startupReducer = (state = initialState, action) => {
  switch (action.type) {
  case TOGGLE_PROSPECT_SWITCH:
    return {
      ...state,
      prospectSwitchToggled: action.payload ? action.payload.toggleStatus : !state.prospectSwitchToggled
    };

  case INVEST_STARTUP:
    return {
      ...state,
    };

  case GET_INVEST_MATCHES:
    return {
      ...state,
      ...action.data
    };

  case GET_PROSPECT_MATCHES:
    return {
      ...state,
      prospectMatches: action.payload
    };

  case GET_SELECTED_INVEST_MATCH:
    return {
      ...state,
      selected_match: action.data,
    };

  case SUBMIT_STARTUP_QUESTION:
    return {
      ...state,
    };

  default:
    return state;
  }
};

export default startupReducer;