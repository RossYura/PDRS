import React from 'react';
import { View } from 'react-native';
import compose from 'recompose/compose';

import { PortfolioSelectors } from 'redux/selectors';
import { connect } from 'react-redux';
import withUser from 'HOCs/withUser';
import { showModal } from 'redux/common/actions';
import KPIChart from 'components/common/KPIChart';
import { SMALL_DEVICE_ANDROID } from 'styles/metrics';

const viewMarginBottom = SMALL_DEVICE_ANDROID ? 20 : 0;

const MetricsTab = ({ company, setHeight }) => (
  <View
    onLayout={(event) => setHeight(0, event.nativeEvent.layout.height + 50 + viewMarginBottom)}
    style={{
      paddingHorizontal: 16,
    }}
  >
    <KPIChart
      metricsOrigins={company.investorUpdates
        .reduce((composedCompanyMetrics, { companyMetrics }) => {
          return [
            ...composedCompanyMetrics,
            ...companyMetrics.filter(({id}) => !composedCompanyMetrics.find(metric => metric.id === id))
          ];
        }, [])
      }
      metricsValues={
        company.investorUpdates
          .reduce((metrics, { companyMetricMonths }) => [
            ...metrics,
            ...companyMetricMonths,
          ], [])
      }
    />
  </View>
);

const mapStateToProps = state => ({
  portfolio: PortfolioSelectors.getCompanyUpdateLogsWithSortedUpdates(state),
});

const mapDispatchToProps = {
  showModal,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withUser,
)(MetricsTab);
