import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Text from 'components/common/Text';
import TeamMembers from 'components/common/TeamMembers';
import AboutContainer from '../AboutContainer';
import HR from 'components/common/HR';
import CardOrigin from 'components/common/Card';
import { StartupSelectors } from 'redux/selectors';
import withProps from 'recompose/withProps';
import compose from 'recompose/compose';
import withUser from 'HOCs/withUser';
import colors from 'styles/colors';
import contractIco from 'assets/images/contract_min.png';
import { showModal } from 'redux/common/actions';
import { DEVICE_WIDTH } from 'styles/metrics';

const InfoTabCard = withProps(props => ({
  selfOffsetTop: 5,
  height: 'auto',
  ...props,
}))(CardOrigin);

const CompanyTab = ({
  selectedMatch: { teamMembers, company },
  showModal,
  setHeight,
  webViewerPassedProps
}) => (
  <View
    onLayout={(event) => setHeight(0, event.nativeEvent.layout.height + 50)}
  >
    <Text
      fontSize={12}
      color={colors._gray}
      style={{ 
        marginBottom: 14,
      }}
    >
      FOUNDERS
    </Text>
    {
      teamMembers && (
        <TeamMembers
          teamMembers={teamMembers}
          webViewerPassedProps={webViewerPassedProps}
        />
      )
    }
    <HR/>
    <AboutContainer
      company={company}
    />
    {
      company.companyConvertibleLoanAgreement && (
        <InfoTabCard
          height={64}
          style={styles.button}
          onPress={() => showModal(
            'pdfViewer',
            {
              local: false,
              uri: company.companyConvertibleLoanAgreement,
            },
          )}
        >
          <Image
            source={contractIco}
            style={styles.icon}
            resizeMode='contain'
          />
          <View style={styles.textContainer}>
            <Text
              fontSize={17}
              color={colors._darkviolet}
              fontWeight={'500'}
            >
              Convertible Loan Preview.PDF
            </Text>
          </View>
        </InfoTabCard>
      )
    }
  </View>
);

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 13,
    width: DEVICE_WIDTH - 40,
    borderRadius: 28,
    elevation: 2,
    borderColor: 'transparent',
  },
  icon: {
    marginRight: 26,
    height: 32,
    width: 28,
  },
  textContainer: {
    borderBottomWidth: 2,
    borderBottomColor: colors._darkviolet,
    paddingBottom: 1,
  },
});

const mapStateToProps = state => ({
  selectedMatch: StartupSelectors.getStartupSelectedMatch(state),
});

const mapDispatchToProps = {
  showModal,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withUser,
)(CompanyTab);
