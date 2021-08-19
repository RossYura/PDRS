import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { Vibration } from 'react-native';
import {
  getStartupsUrl,
  getStartupByIdUrl,
  submitStartupQuestionUrl,
} from 'static/constants/apiUrls';
import { setLoading } from 'redux/user/actions';
import {
  INVEST_STARTUP,
  GET_INVEST_MATCHES,
  GET_SELECTED_INVEST_MATCH,
  SUBMIT_STARTUP_QUESTION,
  GET_PROSPECT_MATCHES,
  TOGGLE_PROSPECT_SWITCH,
} from './actionTypes';
import NetworkService from 'services/network';

export const toggleProspectSwitch = () => ({
  type: TOGGLE_PROSPECT_SWITCH,
});

export const setProspectSwitch = (toggleStatus) => ({
  type: TOGGLE_PROSPECT_SWITCH,
  payload: {
    toggleStatus
  }
});

export const investStartup = ({ investment_entity_id, selectedMatchId, count }) =>
  dispatch => {
    return NetworkService.Startup()
      .code200(({ data }) => {
        dispatch({ type: INVEST_STARTUP, data });
        showMessage({
          message: 'Boom! You\'ve Chipped in!',
          description: 'This investment is now in your portfolio',
          type: 'success',
          floating: true,
          duration: 4500,
        });
        Vibration.vibrate();
      })
      .code204(() => {
        showMessage({
          message: 'Hot Stuff!',
          description: 'Unfortunately this startup\'s round is completely full',
          type: 'warning',
          floating: true,
          duration: 3000,
        });
      })
      .err(() => {
        showMessage({
          message: 'Oops, we couldn\'t chip you in',
          description: 'We have been notified, please try again',
          type: 'warning',
          floating: true,
          duration: 3000,
        });
      })
      .invest(investment_entity_id, selectedMatchId, count);
  };

export const getStartupMatches = () => dispatch => {
  return NetworkService.Startup()
    .withLoader()
    .code200(({ data }) => {
      dispatch({ type: GET_INVEST_MATCHES, data });
    })
    .err(() => {
      showMessage({
        message: 'Oops, something went wrong!',
        description: 'We have been notified, please try again',
        type: 'warning',
        floating: true,
        duration: 3000,
      });
    })
    .get();
};

export const getProspectMatches = () => dispatch => NetworkService.Startup()
  .code200(({ data }) => {
    dispatch({ type: GET_PROSPECT_MATCHES, payload: data.prospectMatches });
  })
  .getProspectMatches();

export const setProspectMatchesAfterVoting = (data, swipedMatches) => dispatch => {
  data.splice(0, swipedMatches.length);
  dispatch({ type: GET_PROSPECT_MATCHES, payload: data });
};

export const emptyProspectMatches = () => ({
  type: GET_PROSPECT_MATCHES,
  payload: [],
});

export const getStartupMatchById = (matchId) => async dispatch => {
  setLoading(true)(dispatch);
  let url = getStartupByIdUrl(matchId);
  try {
    let { data } = await axios.get(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (data.status === 200) {
      dispatch({ type: GET_SELECTED_INVEST_MATCH, data });
    } else if (data.status === 204) {
      dispatch({
        type: GET_SELECTED_INVEST_MATCH, data: {
          matchStatus: 'inactive',
        },
      });
    }
    setLoading(false)(dispatch);
  } catch (error) {
    setLoading(false)(dispatch);
    throw(error);
  }
};

export const submitStartupQuestion = (companyId, payload) => async dispatch => {
  setLoading(true)(dispatch);
  let url = submitStartupQuestionUrl(companyId);
  try {
    let { data } = await axios.post(url, {
      'investorQuestion': payload,
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (data.status === 200) {
      dispatch({ type: SUBMIT_STARTUP_QUESTION, data });
    } else {
      throw(new Error('Please check your question and try again'));
    }
    setLoading(false)(dispatch);
  } catch (error) {
    setLoading(false)(dispatch);
    throw(error);
  }
};