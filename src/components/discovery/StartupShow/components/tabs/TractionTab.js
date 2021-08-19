import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Text from 'components/common/Text';
import styles from 'components/discovery/StartupShow/styles';
import KPIChart from 'components/common/KPIChart';
import { StartupSelectors } from 'redux/selectors';

class TractionTab extends React.Component {
  render () {
    const {
      selectedMatch: { metrics, metricMonths },
    } = this.props;

    return (
      <View
        onLayout={(event) => this.props.setHeight(1, event.nativeEvent.layout.height + 80)}
      >
        <Text
          style={styles.text_big_header}
        >
          TRACTION
        </Text>
        <KPIChart
          metricsOrigins={metrics}
          metricsValues={metricMonths}
        />
      </View>
    );
  };
};

const mapStateToProps = state => ({
  selectedMatch: StartupSelectors.getStartupSelectedMatch(state),
});

export default connect(
  mapStateToProps,
)(TractionTab);
