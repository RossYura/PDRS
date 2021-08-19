import { useDispatch } from 'react-redux';

const useDispatchWrap = (...actionCreators) => {
  const dispatch = useDispatch();

  return actionCreators.map(actionCreator => (...args) => dispatch(actionCreator(...args)));
};

export default useDispatchWrap;