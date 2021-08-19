import { useSelector } from 'react-redux';

import { getCurrentUser } from 'redux/user/selectors';

const useUser = () => useSelector(getCurrentUser);

export default useUser;
