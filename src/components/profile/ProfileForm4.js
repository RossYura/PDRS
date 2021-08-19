import React from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import * as Amplitude from 'expo-analytics-amplitude';

import { submitInvestorStatementProfile } from 'redux/profile/actions';
import { disableLoader, enableLoader, showModal } from 'redux/common/actions';
import SwitchWithText from 'components/common/SwitchInput';
import Link from 'components/common/NavLink';
import StorageService from 'services/storage';
import ScreenContainer from 'containers/ScreenContainer';
import WizardSteps from 'components/common/WizardSteps';
import Text from 'components/common/Text';
import Space from 'components/common/Space';
import Button from 'components/common/Button';
import colors from 'styles/colors';
import withUser from 'HOCs/withUser';
import { navigate } from 'services/navigation/actions';
import { AMP_USER_SIGN_UP_STATEMENT_PAGE } from 'static/constants/amplitudeEventTypes';

class ProfileForm4 extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      acceptRetailStatement: false,
      acceptRiskWarnings: false,
      acceptDataChecksStatement: false,
      firstName: '',
      lastName: '',
    };
  }

  async componentDidMount () {
    //analytics
    Amplitude.logEvent(AMP_USER_SIGN_UP_STATEMENT_PAGE);

    const { firstName, lastName } = await StorageService.User.get();
    
    this.setState({
      firstName,
      lastName,
    });
  }

  formattedDate = () => {
    let d = new Date();
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'];
    return `${months[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}`;
  };

  formInvalid = () => {
    let { acceptRetailStatement, acceptRiskWarnings, acceptDataChecksStatement } = this.state;
    return (
      !acceptRetailStatement || !acceptRiskWarnings || !acceptDataChecksStatement
    );
  };

  handleSubmit = async () => {
    const { submitInvestorStatementProfile } = this.props;

    submitInvestorStatementProfile(this.state);
  };

  render () {
    const { acceptRetailStatement, acceptRiskWarnings, acceptDataChecksStatement } = this.state;
    const { showModal } = this.props;

    return (
      <ScreenContainer
        navHeader
        navHeaderBackHandler={() => navigate('ProfileForm3')}
        gradientHeight={240}
        contentOffsetTop={220}
        header={(
          <React.Fragment>
            <Text
              fontSize={36}
              color="#ffffff"
              textAlign="center"
            >
              Retail Investor Statement
            </Text>
            <Space size={5}/>
            <WizardSteps step={3}/>
          </React.Fragment>
        )}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <Space size={15}/>
            <Text
              fontSize={15}
              color={colors._darkblue}
            >
              I make this investment so that I can receive promotional
              communications relating to nonreadily realisible securities as a
              retail investor.
            </Text>

            <Space size={25}/>

            <SwitchWithText
              onValueChange={value => this.setState(
                { acceptRetailStatement: value })}
              value={acceptRetailStatement}
              text={(
                <View
                >
                  <Text
                    fontSize={14}
                    color={colors._darkblue}
                  >
                    {'I accept that the investments to which the promotions will relate may expose me to a significant risk of losing all of the money or other property invested. '}
                  </Text>
                  <Text
                    fontSize={14}
                    color={colors._gray}
                    style={{
                      marginTop: 30,
                    }}
                  >
                    {'I accept that the investments to which the promotions will relate may expose me to a significant risk of losing all of the money or other property invested. ' +
                    'I am aware that it is open to me to seek advice from an authorised person who specialises in advising on non-readily realisable securities and ' +
                    'non-mainstream pooled investments.'}
                  </Text>
                </View>
              )}
            />

            <Space size={25}/>

            <SwitchWithText
              onValueChange={value => this.setState(
                { acceptRiskWarnings: value })}
              value={acceptRiskWarnings}
              text={(
                <Text
                  fontSize={14}
                  color={colors._darkblue}
                >
                  I understand and accept the
                  {' '}
                  <Link
                    simpleText
                    onPress={() => showModal(
                      'pdfViewer',
                      {
                        local: true,
                        html: require('assets/contracts/risk_warnings.html'),
                        pdf: require('assets/contracts/risk_warnings.pdf'),
                      },
                    )
                    }
                  >
                    Risk Warnings
                  </Link>
                </Text>
              )}
            />

            <Space size={25}/>

            <SwitchWithText
              onValueChange={value => this.setState(
                { acceptDataChecksStatement: value })}
              value={acceptDataChecksStatement}
              text={(
                <Text
                  fontSize={14}
                  color={colors._darkblue}
                >
                  <Text
                    fontSize={14}
                    color={colors._darkblue}
                  >
                    {'I agree that my data will be used to make the necessary checks regarding Know your customer and Anti-money laundering regulation, in doing so the data may' +
                    'leave the European Union in order to be processed by a GDPR-compliant third party to make the necessary checks based on external databases'}
                  </Text>
                </Text>
              )}
            />

            <Space size={25}/>

            <Text
              fontSize={14}
              color={colors._darkblue}
            >
              {`${this.state.firstName} ${this.state.lastName}, ${this.formattedDate()}`}
            </Text>
            <Space size={35}/>
            <Button
              text="Confirm & Begin!"
              loaderKey="authSubmitting"
              onPress={this.handleSubmit}
              disabled={this.formInvalid()}
            />
            <Space size={30}/>
          </ScrollView>
        </SafeAreaView>
      </ScreenContainer>
    );
  }
}

const mapDispatchToProps = {
  showModal,
  enableLoader,
  disableLoader,
  submitInvestorStatementProfile
};

export default compose(
  connect(null, mapDispatchToProps),
  withUser,
)(ProfileForm4);
