import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileForm1Screen from 'components/profile/ProfileForm1';
import ProfileForm2Screen from 'components/profile/ProfileForm2';
import ProfileForm3Screen from 'components/profile/ProfileForm3';
import ProfileForm4Screen from 'components/profile/ProfileForm4';
import useEffectAsync from 'hooks/useEffectAsync';
import useUser from 'hooks/useUser';

const Stack = createStackNavigator();

const profileStackStepsConditions = {
  'ProfileForm4': user => user.keywords?.length > 0,
  'ProfileForm3': user => user.investorQuizComplete,
  'ProfileForm2': user => user.investmentEntities?.length > 0,
};

const ProfileStackNavigator = () => {
  const user = useUser();
  const [initialScreen, setInitialScreen] = useState(null);

  useEffectAsync(async () => {
    const signUpStep = Object.keys(profileStackStepsConditions)
      .find(step => profileStackStepsConditions[step](user));

    if (signUpStep) {
      setInitialScreen(signUpStep);
    } else {
      setInitialScreen('ProfileForm1');
    }
  }, []);

  if (!initialScreen)
    return null;

  return (
    <Stack.Navigator
      initialRouteName={initialScreen}
      headerMode="none"
    >
      <Stack.Screen
        name="ProfileForm1"
        component={ProfileForm1Screen}
      />
      <Stack.Screen
        name="ProfileForm2"
        component={ProfileForm2Screen}
      />
      <Stack.Screen
        name="ProfileForm3"
        component={ProfileForm3Screen}
      />
      <Stack.Screen
        name="ProfileForm4"
        component={ProfileForm4Screen}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;