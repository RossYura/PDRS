import React from 'react';
import { ActivityIndicator, View, TouchableOpacity} from 'react-native';
import compose from 'recompose/compose';
import SvgUri from 'expo-svg-uri';
import { connect } from 'react-redux';

import withUser from 'HOCs/withUser';
import Text from 'components/common/Text';
import Space from 'components/common/Space';
import colors from 'styles/colors';
import FullViewCard
  from 'components/newsfeed/NewsfeedIndex/components/FullViewCard';
import arrowUpIcon from 'assets/images/arrow_up.svg';
import {
  getCompanyNewsFeedSelector,
  getPortfolioSelector,
} from 'redux/portfolio/selectors';
import {
  getCompanyNewsfeed,
  expandCompanyNewsfeed,
} from 'redux/portfolio/actions';
import { getLoaderStatusByKey } from 'redux/common/selectors';
import { EXPAND_COMPANY_NEWS_FEED_LOADING_KEY } from '../../constants';
import { cardsMap as cardsMapIndex } from 'components/newsfeed/NewsfeedIndex';
import ArticleCard
  from 'components/newsfeed/NewsfeedIndex/components/cards/ArticleCard';
import InsightCard
  from 'components/newsfeed/NewsfeedIndex/components/cards/InsightCard';
import TractionCard
  from 'components/newsfeed/NewsfeedIndex/components/cards/TractionCard';
import MiscCard
  from 'components/newsfeed/NewsfeedIndex/components/cards/MiscCard';
import TeamCard
  from 'components/newsfeed/NewsfeedIndex/components/cards/TeamCard';

const cardsMap = {
  ...cardsMapIndex,
  insight: {
    CardComponent: InsightCard,
    detailsRoute: 'PortfolioFeedDetailsInsight',
  },
  article: {
    CardComponent: ArticleCard,
    detailsRoute: 'PortfolioFeedDetailsArticle',
  },
  traction: {
    CardComponent: TractionCard,
    detailsRoute: 'PortfolioFeedDetailsTraction',
  },
  misc: {
    CardComponent: MiscCard,
    detailsRoute: 'PortfolioFeedDetailsMisc',
  },
  team: {
    CardComponent: TeamCard,
    detailsRoute: 'PortfolioFeedDetailsTeam',
  },
};

class FeedTab extends React.Component {

  render () {
    const {
      companyNewsfeed: { list, currentPage, pagesTotal },
      isExpandLoading,
    } = this.props;

    return (
      <View
        onLayout={(event) => this.props.setHeight(1, event.nativeEvent.layout.height + 50)}
        style={{
          alignItems: 'center'
        }}
      >
        {
          list.map((updateEvent, index) => {
            const updateEventCardGroup = cardsMap[updateEvent.category];

            if(updateEventCardGroup) {
              const CardComponent = (index === 0 && updateEvent.image)
                ? FullViewCard
                : updateEventCardGroup.CardComponent;
              const { CardComponent: CardComponentOrigin, ...cardProps } = updateEventCardGroup;

              return (
                <CardComponent
                  key={updateEvent.id + updateEvent.eventType}
                  updateEvent={updateEvent}
                  {...cardProps}
                />
              );
            } else {
              return null;
            }
          })
        }
        {
          isExpandLoading && (
            <ActivityIndicator size="large"/>
          )
        }
        {
          (currentPage === pagesTotal) && (
            <View
              style={{
                alignItems: 'center',
                maxWidth: 230,
                alignSelf: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() => this.props.scrollToPosition(0)}
              >
                <SvgUri source={arrowUpIcon}/>
              </TouchableOpacity>
              <Space size={15}/>
              <Text
                fontSize={14}
                color={colors._darkblue}
                textAlign="center"
              >
                Woah there! You’ve reached the bottom. Refresh your feed to see
                if your startups shared something new!
              </Text>
              <Space size={15}/>
            </View>
          )
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  portfolio: getPortfolioSelector(state),
  companyNewsfeed: getCompanyNewsFeedSelector(state),
  isExpandLoading: getLoaderStatusByKey(state)(
    EXPAND_COMPANY_NEWS_FEED_LOADING_KEY),
});

const mapDispatchToProps = {
  getCompanyNewsfeed,
  expandCompanyNewsfeed,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withUser,
)(FeedTab);
