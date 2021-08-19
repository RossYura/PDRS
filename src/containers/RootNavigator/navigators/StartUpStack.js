import React, {useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import StartupIndexScreen from 'components/discovery/StartupIndex';
import StartupShowScreen from 'components/discovery/StartupShow';
import ProspectCardsScreen from 'components/discovery/ProspectCards';
import TeamMemberProfileScreen from 'components/discovery/TeamMemberProfile';
import PortfolioShowScreen from 'components/portfolio/PortfolioShow';
import ForgotPasswordScreen from 'components/welcome/auth/ForgotPassword';
import { getCompaniesWithPendingInvestments } from 'redux/companies/actions';
import { getStartupMatches, getProspectMatches } from 'redux/startup/actions';
import useDispatchWrap from 'hooks/useDispatchWrap';

const Stack = createStackNavigator();

const StartUpStackNavigator = ({ navigation }) => {
  const [
    getCompaniesWithPendingInvestmentsDispatch,
    getStartupMatchesDispatch,
    getProspectMatchesDispatch
  ] = useDispatchWrap(getCompaniesWithPendingInvestments, getStartupMatches, getProspectMatches);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCompaniesWithPendingInvestmentsDispatch();
      getStartupMatchesDispatch();
      getProspectMatchesDispatch();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator
      headerMode="none"
    >
      <Stack.Screen
        name="StartupIndex"
        component={StartupIndexScreen}
      />
      <Stack.Screen
        name="StartupShow"
        component={StartupShowScreen}
      />
      <Stack.Screen
        name="ProspectCards"
        component={ProspectCardsScreen}
      />
      <Stack.Screen
        name="TeamMemberProfile"
        component={TeamMemberProfileScreen}
      />
      <Stack.Screen
        name="PortfolioShow"
        component={PortfolioShowScreen}
        initialParams={{
          backPath: 'StartupIndex',
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default StartUpStackNavigator;