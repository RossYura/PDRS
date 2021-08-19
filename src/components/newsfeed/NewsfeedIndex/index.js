import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ActivityIndicator, View, TouchableOpacity } from 'react-native';
import SvgUri from 'expo-svg-uri';
import { replaceLocalhostToUrl } from 'utils/string';

import { getNewsfeed, expandNewsfeed } from 'redux/newsfeed/actions';
import { getNewsFeedSelector } from 'redux/newsfeed/selectors';
import ScreenContainer from 'containers/ScreenContainer';
import Text from 'components/common/Text';
import withUser from 'HOCs/withUser';
import Space from 'components/common/Space';
import ArticleCard from './components/cards/ArticleCard';
import InsightCard from './components/cards/InsightCard';
import TractionCard from './components/cards/TractionCard';
import MiscCard from './components/cards/MiscCard';
import TeamCard from './components/cards/TeamCard';
import { getLoaderStatusByKey } from 'redux/common/selectors';
import { EXPAND_NEWS_FEED_LOADING_KEY } from './constants';
import arrowUpIcon from 'assets/images/arrow_up.svg';
import colors from 'styles/colors';
import { DEVICE_HEIGHT } from 'styles/metrics';

export const cardsMap = {
  insight: {
    CardComponent: InsightCard,
    detailsRoute: 'NewsfeedDetailsInsight',
  },
  article: {
    CardComponent: ArticleCard,
    detailsRoute: 'NewsfeedDetailsArticle',
  },
  traction: {
    CardComponent: TractionCard,
    detailsRoute: 'NewsfeedDetailsTraction',
  },
  misc: {
    CardComponent: MiscCard,
    detailsRoute: 'NewsfeedDetailsMisc',
  },
  team: {
    CardComponent: TeamCard,
    detailsRoute: 'NewsfeedDetailsTeam',
  },
};

class NewsfeedIndex extends React.Component {
  state = {
    scrollPosition: null,
  };

  componentDidUpdate () {
    if (typeof (this.state.scrollPosition) === 'number') {
      this.setState({ scrollPosition: null });
    }
  }

  handleScreenScroll = (e) => {
    const { expandNewsfeed, feed: { currentPage, pagesTotal }, isExpandLoading } = this.props;
    const {
      contentOffset: { y: contentOffset },
      contentSize: { height: contentSize },
    } = e.nativeEvent;

    if (contentOffset / contentSize > 0.6 && currentPage < pagesTotal &&
      !isExpandLoading) {
      expandNewsfeed(currentPage + 1);
    }
  };

  setFirstIteminList = (list) => {
    let cardIndex = list.findIndex(card => card.image);
    if (cardIndex > -1) {
      list[cardIndex].withoutHeader = true;
      list.unshift(...list.splice(cardIndex, 1));
    }

    return list;
  };

  renderEmptySpace = () => {
    return (
      <View 
        style={{
          height: DEVICE_HEIGHT / 2 + 60,
          alignItems: 'center',
          maxWidth: 230,
          alignSelf: 'center',
        }}
      >
        <Space size={DEVICE_HEIGHT * 0.15}/>
        <Text
          fontSize={14}
          color={'#ffffff'}
          textAlign="center"
        >
          Refresh your feed to see if your startups shared something new!
        </Text>
      </View>
    );
  }

  static GRADIENT_HEIGHT = DEVICE_HEIGHT / 2 + 30;

  render () {
    const { feed: { list, currentPage, pagesTotal }, getNewsfeed, isExpandLoading } = this.props;
    const { GRADIENT_HEIGHT } = this.constructor;

    const filteredList = this.setFirstIteminList(list)
      .map((updateEvent) => {
        const updateEventCardGroup = cardsMap[updateEvent.category];

        if (updateEventCardGroup) {
          const CardComponent = updateEventCardGroup.CardComponent;
          const { CardComponent: CardComponentOrigin, ...cardProps } = updateEventCardGroup;

          if (updateEvent.image) {
            updateEvent['image'] = replaceLocalhostToUrl(updateEvent.image);
          }

          return (
            <CardComponent
              key={updateEvent.id + updateEvent.eventType}
              updateEvent={updateEvent}
              {...cardProps}
            />
          );
        }
      });

    return (
      <ScreenContainer
        contentOffsetTop={0}
        gradientHeight={GRADIENT_HEIGHT}
        reloadHandler={getNewsfeed}
        scrollPosition={this.state.scrollPosition}
        ContainerComponentProps={{
          onScroll: this.handleScreenScroll,
          scrollEventThrottle: 50,
        }}
      >
        <Space size={10}/>
        <Text
          fontSize={36}
          color={'#ffffff'}
          bold
        >
          Updates
        </Text>
        <Space size={20}/>
        { filteredList.length
          ? filteredList
          : this.renderEmptySpace()
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
                onPress={() => this.setState({ scrollPosition: 0 })}
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
      </ScreenContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  feed: getNewsFeedSelector(state),
  isExpandLoading: getLoaderStatusByKey(state)(EXPAND_NEWS_FEED_LOADING_KEY),
});

const mapDispatchToProps = {
  getNewsfeed,
  expandNewsfeed,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withUser,
)(NewsfeedIndex);
