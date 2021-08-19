import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import NewsfeedIndexScreen from 'components/newsfeed/NewsfeedIndex';
import NewsfeedDetailsArticleScreen from 'components/newsfeed/NewsfeedDetails/Article';
import NewsfeedDetailsTractionScreen from 'components/newsfeed/NewsfeedDetails/Traction';
import NewsfeedDetailsMiscScreen from 'components/newsfeed/NewsfeedDetails/Misc';
import NewsfeedDetailsTeamScreen from 'components/newsfeed/NewsfeedDetails/Team';

const Stack = createStackNavigator();

const NewsfeedStackNavigator = () => {
  return (
    <Stack.Navigator
      headerMode="none"
    >
      <Stack.Screen
        name="NewsfeedIndex"
        component={NewsfeedIndexScreen}
        initialParams={{
          backPath: 'NewsfeedIndex',
        }}
      />
      <Stack.Screen
        name="NewsfeedDetailsArticle"
        component={NewsfeedDetailsArticleScreen}
        initialParams={{
          backPath: 'NewsfeedIndex',
        }}
      />
      <Stack.Screen
        name="NewsfeedDetailsTraction"
        component={NewsfeedDetailsTractionScreen}
        initialParams={{
          backPath: 'NewsfeedIndex',
        }}
      />
      <Stack.Screen
        name="NewsfeedDetailsMisc"
        component={NewsfeedDetailsMiscScreen}
        initialParams={{
          backPath: 'NewsfeedIndex',
        }}
      />
      <Stack.Screen
        name="NewsfeedDetailsTeam"
        component={NewsfeedDetailsTeamScreen}
        initialParams={{
          backPath: 'NewsfeedIndex',
        }}
      />
    </Stack.Navigator>
  );
};

export default NewsfeedStackNavigator;