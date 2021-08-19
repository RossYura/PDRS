import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from 'redux/reducers';

// disable logger on master branch, as it slows down Аndroid
const middlewares = [thunk]; //, logger];

const enchancer = __DEV__
  ? composeWithDevTools(applyMiddleware(...middlewares))
  : compose(applyMiddleware(...middlewares));

const store = createStore(
  reducer,
  {},
  enchancer
);

export default store;
