import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import NewsfeedDetailsArticleScreen from 'components/newsfeed/NewsfeedDetails/Article';
import NewsfeedDetailsTractionScreen from 'components/newsfeed/NewsfeedDetails/Traction';
import NewsfeedDetailsMiscScreen from 'components/newsfeed/NewsfeedDetails/Misc';
import NewsfeedDetailsTeamScreen from 'components/newsfeed/NewsfeedDetails/Team';
import PortfolioIndexScreen from 'components/portfolio/PortfolioIndex';
import PortfolioShowScreen from 'components/portfolio/PortfolioShow';
import NewsfeedDetailsInsightScreen from 'components/newsfeed/NewsfeedDetails/Insight';
import TeamMemberProfileScreen from 'components/discovery/TeamMemberProfile';

const Stack = createStackNavigator();

const PortfolioStackNavigator = () => {
  return (
    <Stack.Navigator
      headerMode="none"
    >
      <Stack.Screen
        name="PortfolioIndex"
        component={PortfolioIndexScreen}
      />
      <Stack.Screen
        name="PortfolioShow"
        component={PortfolioShowScreen}
        initialParams={{
          backPath: 'PortfolioIndex',
        }}
      />
      <Stack.Screen
        name="TeamMemberProfile"
        component={TeamMemberProfileScreen}
      />
      <Stack.Screen
        name="PortfolioFeedDetailsArticle"
        component={NewsfeedDetailsArticleScreen}
        initialParams={{
          backPath: 'PortfolioShow',
        }}
      />
      <Stack.Screen
        name="PortfolioFeedDetailsInsight"
        component={NewsfeedDetailsInsightScreen}
        initialParams={{
          backPath: 'PortfolioShow',
        }}
      />
      <Stack.Screen
        name="PortfolioFeedDetailsTraction"
        component={NewsfeedDetailsTractionScreen}
        initialParams={{
          backPath: 'PortfolioShow',
        }}
      />
      <Stack.Screen
        name="PortfolioFeedDetailsMisc"
        component={NewsfeedDetailsMiscScreen}
        initialParams={{
          backPath: 'PortfolioShow',
        }}
      />
      <Stack.Screen
        name="PortfolioFeedDetailsTeam"
        component={NewsfeedDetailsTeamScreen}
        initialParams={{
          backPath: 'PortfolioShow',
        }}
      />
    </Stack.Navigator>
  );
};

export default PortfolioStackNavigator;