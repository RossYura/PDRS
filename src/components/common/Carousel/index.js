import React from 'react';
import CarouselOrigin, { Pagination } from 'react-native-snap-carousel';
import { StyleSheet, View } from 'react-native';

import { DEVICE_WIDTH } from 'styles/metrics';
import Card from 'components/common/Card';
import CardDarkblue from 'components/common/Card/variations/darkblue';
import CardGrey from 'components/common/Card/variations/grey';

import colors from 'styles/colors';
import withTheme from 'HOCs/withTheme';

class Carousel extends React.Component {

  static defaultProps = {
    CardComponent: Card,
  };

  constructor (props) {
    super(props);
    this.state = {
      activeSlide: props.activeSlide || 0,
    };
  }

  _renderItem = ({ item, index }) => {
    const {
      getCardContent,
      onCardPress = () => () => {},
      CardProps,
      CardComponent,
    } = this.props;

    return (
      <CardComponent
        width={this.constructor.getCardWidth(this.props.data)}
        height={134}
        onPress={onCardPress(item, index)}
        style={{
          padding: 16,
        }}
        {...CardProps}
      >
        {getCardContent(item, index)}
      </CardComponent>
    );
  };

  _renderPagination = (data) => {
    const { activeSlide } = this.state;
    return (
      <Pagination
        carouselRef={this.carouselRef}
        tappableDots
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainerStyle}
        dotStyle={styles.paginationDotStyle}
        inactiveDotStyle={styles.paginationDotInactiveStyle}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    );
  };

  static getCardWidth = (data) => data.length === 1
    ? DEVICE_WIDTH - 32
    : DEVICE_WIDTH - 60;

  render () {
    const { data, pagination = true, CarouselProps } = this.props;
    const { activeSlide } = this.state;

    return (
      <View>
        <CarouselOrigin
          ref={(c) => { this.carouselRef = c; }}
          data={data}
          renderItem={this._renderItem}
          onSnapToItem={(index) => this.setState({ activeSlide: index })}
          sliderWidth={DEVICE_WIDTH}
          itemWidth={this.constructor.getCardWidth(data)}
          activeSlideAlignment={
            (activeSlide === data.length - 1) && data.length !== 1
              ? 'center'
              : 'start'
          }
          firstItem={activeSlide}
          containerCustomStyle={{
            overflow: 'visible',
          }}
          contentContainerCustomStyle={{
            overflow: 'visible',
          }}
          {...CarouselProps}
        />
        {pagination && this._renderPagination(data)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  paginationContainerStyle: {
    backgroundColor: '#ffffff',
    paddingVertical: 0,
    justifyContent: 'center',
  },
  paginationDotStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
    backgroundColor: colors._darkblue,
  },
  paginationDotInactiveStyle: {
    backgroundColor: '#9FB9C7',
  },
});

export default withTheme.describe({
  darkblue: () => ({
    CardComponent: CardDarkblue,
  }),
  grey: () => ({
    CardComponent: CardGrey,
  }),
})(Carousel);
