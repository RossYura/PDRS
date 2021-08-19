import React from 'react';
import Swiper from 'react-native-deck-swiper';
import SvgUri from 'expo-svg-uri';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';

import NetworkService from 'services/network';
import upvoteIcon from 'assets/images/upvote.svg';
import downvoteIcon from 'assets/images/downvote.svg';
import Card from 'components/common/Card';
import alertIconBig from 'assets/images/alert_big.svg';
import Space from 'components/common/Space';
import Text from 'components/common/Text';
import {
  getStartupProspectMatches,
} from 'redux/startup/selectors';
import { setProspectMatchesAfterVoting } from 'redux/startup/actions';
import CardItem, { cardHeight } from './CardItem';
import { emptyProspectMatches } from 'redux/startup/actions';
import Button from '../../../../common/Button';

class ProspectDeckSwiper extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      allCardsSwiped: props.prospectMatches.length === 0,
      swipedCards: [],
    };
  }

  renderCard = (item) => {
    if (!item) {
      return;
    }

    return (
      <CardItem
        company={item.company}
        onPressRight={() => this.swiper.swipeRight()}
        onPressLeft={() => this.swiper.swipeLeft()}        
      />
    );
  }

  static getDerivedStateFromProps = (props, state) => {
    if (
      !state.allCardsSwiped && props.prospectMatches && props.prospectMatches.length === 0
    ) {
      return {
        allCardsSwiped: true,
      };
    } else {
      return null;
    }
  };

  swipeCard = (index, voting) => {
    const { prospectMatches } = this.props;

    if (prospectMatches[index]) {
      NetworkService.Startup()
        .setProspectMatch(
          prospectMatches[index].id,
          voting,
        );

      let swipedCards = this.state.swipedCards;
      swipedCards.push(index);
      this.setState({
        swipedCards: swipedCards,
      });
    }    
  }

  componentWillUnmount() {
    this.props.setProspectMatchesAfterVoting(this.props.prospectMatches, this.state.swipedCards);
  }

  render () {
    const { prospectMatches, emptyProspectMatches } = this.props;

    return (
      <View
        style={{
          height: cardHeight,
          width: '100%',
        }}
      >
        <Swiper
          ref={swiper => {
            this.swiper = swiper;
          }}
          cards={prospectMatches}
          renderCard={this.renderCard}
          verticalSwipe={false}
          backgroundColor={'transparent'}
          cardHorizontalMargin={-3}
          cardVerticalMargin={-3}
          stackSize={4} //{prospectMatches.length}
          stackScale={0}
          stackSeparation={0}
          showSecondCard={true}
          useViewOverflow={false}
          onSwipedAll={() => {
            this.setState({
              allCardsSwiped: true,
            });
            emptyProspectMatches();
          }}
          onSwipedLeft={index => this.swipeCard(index, false)}
          onSwipedRight={index => this.swipeCard(index, true)}
          overlayLabels={{
            right: {
              element: (
                <SvgUri
                  source={upvoteIcon}
                  width={100}
                  height={100}
                />
              ),
              style: {
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  marginLeft: -30,
                  height: 600,
                },
              },
            },
            left: {
              element: (
                <SvgUri
                  source={downvoteIcon}
                  width={100}
                  height={100}
                />
              ),
              style: {
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  height: 600,
                },
              },
            },
          }}
        >
          <Card
            height={cardHeight}
            ContainerComponent={View}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SvgUri source={alertIconBig}/>
            <Space size={48}/>
            <Text
              bold
              fontSize={15}
              color="#7B8E9D"
              textAlign="center"
              style={{
                width: 240,
              }}
            >
              You have played out your entire stack!
              {'\n'}{'\n'}
              Luckily we get new startups in our pipeline every single day.
              Stay posted.
            </Text>
            <Space size={40}/>
          </Card>
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  voteTouchable: {
    width: 52,
    height: 52,
    borderRadius: 26,
    shadowColor: 'rgba(0, 0, 0, 0.205611)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    position: 'absolute',
    bottom: 46,
  },
});

const mapStateToProps = (state) => ({
  prospectMatches: getStartupProspectMatches(state),
});

const mapDispatchToProps = {
  emptyProspectMatches,
  setProspectMatchesAfterVoting,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(ProspectDeckSwiper);
