import React from 'react';
import { View } from 'react-native';
import moment from 'moment';
import { G, Stop, LinearGradient, Defs } from 'react-native-svg';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryScatter,
  VictoryLegend,
} from 'victory-native';

import colors from 'styles/colors';
import { DEVICE_WIDTH } from 'styles/metrics';
import { styles as chartStyles } from 'components/common/KPIChart';

const getBurnRate = (update, investorUpdates) => {
  const chartData = investorUpdates
    .sort((a, b) => new Date(a.month) - new Date(b.month))
    .map((update) => ({
      update,
      month: moment(update.month)
        .format('MMM'),
      monthlyBurnRate: update.monthlyBurnRate,
      cashInBank: update.cashInBank,
    }));

  const yMax = Math.max.apply(null, [
    Math.max.apply(
      null,
      chartData.map(({ cashInBank }) => cashInBank),
    ),
    Math.max.apply(
      null,
      chartData.map(({ monthlyBurnRate }) => monthlyBurnRate),
    ),
  ]);

  return (
    <View pointerEvents="none">
      <VictoryChart
        width={DEVICE_WIDTH - 50}
        height={350}
        padding={{ top: 20, bottom: 100, left: 20, right: 20 }}
      >
        <G>
          <Defs>
            <LinearGradient
              id="gradientStroke"
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
            tickLabels: chartStyles.axisLabel,
          }}
        />
        <VictoryAxis
          style={{
            axis: {
              stroke: '#E0E0E0',
            },
            tickLabels: chartStyles.axisLabel,
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
            y: [
              0, yMax + (yMax * .1)],
          }}
          tickFormat={(t) => `${Math.round(t) / 1000}k`}
        />
        <VictoryScatter
          data={chartData}
          size={3}
          style={{ data: { fill: 'black' } }}
          labels={(d) => d._y}
          labelComponent={(
            <VictoryLabel
              style={chartStyles.label}
            />
          )}
          x="month"
          y="monthlyBurnRate"
        />
        <VictoryBar
          name="barChart"
          style={{
            data: {
              fill: 'url(#gradientStroke)',
            },
          }}
          labels={(d) => d._y}
          labelComponent={(
            <VictoryLabel
              style={chartStyles.label}
            />
          )}
          data={chartData}
          barWidth={32}
          x="month"
          y="cashInBank"
        />
        <VictoryLine
          y={() => yMax}
          style={{
            data: {
              stroke: 'rgba(255, 255, 255, 0.6)',
              strokeWidth: 1,
            },
          }}
        />
        <VictoryLegend
          x={100}
          y={280}
          gutter={20}
          style={{
            labels: { fill: colors.black },
          }}
          data={[
            {
              name: 'Cash in the Bank',
              symbol: {
                fill: 'url(#gradientStroke)',
                type: 'square',
              },
            },
            {
              name: 'Monthly Burn Rate',
              symbol: { fill: 'black' },
            },
          ]}
        />
      </VictoryChart>
    </View>
  );
};

export default getBurnRate;
