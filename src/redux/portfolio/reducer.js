import {
  GET_PORTFOLIO,
  GET_PORTFOLIO_UPDATE_LOGS,
  ACTIVE_SECTIONS_UPDATE,
  GET_COMPANY_NEWSFEED,
  EXPAND_COMPANY_NEWSFEED
} from './actionTypes';

const initialState = {
  portfolio: {
    portfolioDeltaScore: '',
    pendingInvestments: [],
    investments: [],
    companies: [],
  },
  companyUpdateLogs: {
    company: {
      userInvestments: [],
      investorUpdates: [],
      teamMembers: []
    }
  },
  activeSections: [],
  companyNewsfeed: {
    list: [],
    currentPage: 1,
    pagesTotal: Infinity,
  }
};

const portfolioReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_COMPANY_NEWSFEED:
    return {
      ...state,
      companyNewsfeed: {
        ...initialState.companyNewsfeed,
        list: action.data.investorUpdateEvents,
      }
    };

  case EXPAND_COMPANY_NEWSFEED: {
    const newUpdateEvents = action.payload.data.investorUpdateEvents;
    const page = action.payload.page;

    return {
      ...state,
      companyNewsfeed: {
        list: [
          ...state.companyNewsfeed.list,
          ...newUpdateEvents,
        ],
        currentPage: newUpdateEvents.length > 0
          ? page
          : state.companyNewsfeed.currentPage,
        pagesTotal: newUpdateEvents.length > 0
          ? state.companyNewsfeed.pagesTotal
          : state.companyNewsfeed.currentPage,
      }
    };
  }

  case GET_PORTFOLIO: {
    const { companies: companiesOrigin, pendingInvestments } = action.data;
    const companies = companiesOrigin
      .filter(({ investmentStatus }) => investmentStatus !==
        'complete_unsuccessful');

    return {
      ...state,
      portfolio: {
        ...action.data,
        companies,
        pendingCompanies: Object.values(
          pendingInvestments
            .reduce((
              res,
              investment,
            ) => ({
              ...res,
              [investment.companyId]: {
                ...companies
                  .find(company => company.id === investment.companyId),
                endDate: investment.match.end_date,
              },
            }), {}),
        )
          .sort((a, b) => {
            if (a.investmentStatus === 'complete_successful') {
              return 1;
            }
            if (b.investmentStatus === 'complete_successful') {
              return -1;
            } else {
              return 0;
            }
          }),
      },
    };
  }
  case GET_PORTFOLIO_UPDATE_LOGS:
    return {
      ...state,
      companyUpdateLogs: action.data,
    };

  case ACTIVE_SECTIONS_UPDATE:
    return {
      ...state,
      activeSections: action.data,
    };

  default:
    return state;
  }
};

export default portfolioReducer;