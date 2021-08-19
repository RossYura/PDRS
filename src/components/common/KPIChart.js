import React from 'react';
import { View, StyleSheet } from 'react-native';
import moment from 'moment';
import { Stop, G, Defs, LinearGradient } from 'react-native-svg';
import {
  VictoryAxis,
  VictoryBar, VictoryChart,
  VictoryLabel,
  VictoryLine,
} from 'victory-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { DEVICE_WIDTH } from 'styles/metrics';
import colors from 'styles/colors';
import Text from 'components/common/Text';

const categoriesSortShape = [
  'funnel_start',
  'funnel_end',
  'retention',
  'revenue',
];

export default class KPIChart extends React.Component {

  state = {
    activeSlide: 0,
  };

  getPagination = (data) => {
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

  _renderItem = ({ item: { name, chartData, yMax } }) => (
    <View pointerEvents="none">
      <Text>{name}</Text>
      <VictoryChart
        width={DEVICE_WIDTH - 50}
        padding={{ top: 20, bottom: 50, left: 20, right: 20 }}
      >
        <G>
          <Defs>
            <LinearGradient
              id="gradientStroke1"
              x1="0" x2="0" y0="0" y1="100%"
            >
              <Stop
                offset="1.51%"
                stopColor="#0082AB"
                stopOpacity="0.7"
              />
              <Stop
                offset="100%"
                stopColor="#2A306D"
                stopOpacity="0.7"
              />
            </LinearGradient>
          </Defs>
        </G>
        <VictoryAxis
          domainPadding={{ x: [40, 40] }}
          style={{
            axis: {
              stroke: '#E0E0E0',
            },
            tickLabels: styles.axisLabel,
          }}
        />
        <VictoryAxis
          style={{
            axis: {
              stroke: '#E0E0E0',
            },
            tickLabels: styles.axisLabel,
          }}
          dependentAxis
          tickLabelComponent={(
            <VictoryLabel
              angle={90}
              dx={-2}
              dy={-2}
            />
          )}
          domain={{
            y: [0, yMax === 0 ? 30 : yMax + (yMax * .1)],
          }}
        />
        <VictoryBar
          labels={(d) => d._y}
          labelComponent={(
            <VictoryLabel
              style={styles.label}
            />
          )}
          name="barChart"
          style={{
            data: {
              fill: 'url(#gradientStroke1)',
            },
          }}
          data={chartData}
          barWidth={32}
          x="month"
          y="value"
        />
        <VictoryLine
          y={() => yMax === 0 ? 30 : yMax}
          style={{
            data: {
              stroke: 'rgba(255, 255, 255, 0.6)',
              strokeWidth: 1,
            },
          }}
        />
      </VictoryChart>
    </View>
  );

  render () {
    const {
      metricsOrigins,
      metricsValues,
    } = this.props;

    const data = categoriesSortShape
      .reduce((sortedUpdates, category) => {
        const updateMetrics = metricsOrigins.filter((metric) => category === metric.category);

        if (updateMetrics.length > 0) {
          return [
            ...sortedUpdates,
            ...updateMetrics,
          ];
        } else {
          return sortedUpdates;
        }
      }, [])
      .map(({ name, id }) => {
        const chartData = metricsValues
          .filter(({ metricId }) => metricId === id)
          .sort((a, b) => new Date(a.month) - new Date(b.month))
          .map(metric => ({
            month: moment(metric.month)
              .format('MMM'),
            value: metric.value || 0,
          }))
          .reduce((metrics, metric) => {
            const sameMonthMetricIndex = metrics
              .findIndex(entry => entry.month === metric.month);
            if (sameMonthMetricIndex !== -1) {
              metrics[sameMonthMetricIndex].value = metrics[sameMonthMetricIndex].value + metric.value;
              return metrics;
            } else {
              return [
                ...metrics,
                metric,
              ];
            }
          }, []);

        const chartDataSliced = chartData.slice(-8);

        const yMax = Math.max.apply(
          null,
          chartDataSliced.map(({ value }) => value),
        );

        return {
          chartData,
          yMax,
          name,
        };
      })
      .filter(({ chartData }) => chartData.length > 0);

    return (
      <View>
        <Carousel
          ref={(c) => { this.carouselRef = c; }}
          data={data}
          renderItem={this._renderItem}
          onSnapToItem={(index) => this.setState({ activeSlide: index })}
          sliderWidth={DEVICE_WIDTH}
          itemWidth={DEVICE_WIDTH}
        />
        {this.getPagination(data)}
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  paginationContainerStyle: {
    backgroundColor: '#ffffff',
    paddingVertical: 0,
    justifyContent: 'flex-end',
  },
  paginationDotStyle: {
    width: 12,
    height: 6,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: colors._darkblue,
  },
  paginationDotInactiveStyle: {
    backgroundColor: '#E6E6E6',
    width: 6,
  },
  axisLabel: {
    fontSize: 12,
    color: colors.black09,
    opacity: .3,
  },
  label: {
    fontSize: 12,
    color: colors.black,
  },
});
