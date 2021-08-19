import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import * as LocalAuthentication from 'expo-local-authentication';
import Constants from 'expo-constants';
import { showMessage } from 'react-native-flash-message';
import { compose } from 'redux';
import Svg from 'expo-svg-uri';
import * as Amplitude from 'expo-analytics-amplitude';

import {
  showModal,
  switchModal,
  hideModal,
  enableLoader,
  disableLoader,
} from 'redux/common/actions';
import SwitchWithText from 'components/common/SwitchInput';
import Button from 'components/common/Button';
import Link from 'components/common/NavLink';
import { StartupActions } from 'redux/actions';
import HR from 'components/common/HR';
import { DEVICE_HEIGHT } from 'styles/metrics';
import suitcaseIco from 'assets/images/suitcase.svg';
import investingIco from 'assets/images/investing.svg';
import moneyBagIco from 'assets/images/money_bag.svg';
import styles from './styles';
import Space from 'components/common/Space';
import ScreenContainer from 'containers/ScreenContainer';
import { formatWithCommaSeparators } from 'utils/number';
import { AMP_USER_CHIPPED_IN } from 'static/constants/amplitudeEventTypes';
import { deviceHasBiometrics } from 'utils/device';
import colors from 'styles/colors';
import StorageService from 'services/storage';
import { confirmPassword } from 'utils/security';

class ChipInConfirmDialog extends React.Component {

  static risk_warnings_pdf = {
    html: require('assets/contracts/risk_warnings.html'),
    pdf: require('assets/contracts/risk_warnings.pdf'),
  };
  static privacy_policy_pdf = {
    html: require('assets/contracts/privacy_policy.html'),
    pdf: require('assets/contracts/privacy_policy.pdf'),
  };
  static terms_of_use_pdf = {
    html: require('assets/contracts/terms_of_use.html'),
    pdf: require('assets/contracts/terms_of_use.pdf'),
  };

  constructor (props) {
    super(props);
    const {
      // statement1Agreed,
      statement2Agreed,
    } = props.route.params;

    this.state = {
      // statement1Agreed,
      statement2Agreed,
      password: '',
    };
  }

  onInputChange = (field, extractor) => value => this.setState({
    [field]: extractor ? extractor(value) : value,
  });

  formInvalid = () => ![
    // this.state.statement1Agreed,
    this.state.statement2Agreed,
  ].every(condition => condition);

  onViewerShow = (params, local = true) => {
    const {
      showModal,
    } = this.props;

    showModal(
      'pdfViewer',
      {
        local,
        ...params,
      },
    );
  };

  handleSubmit = async () => {
    const deviceHasBiometricsBool = await deviceHasBiometrics();

    if (Constants.isDevice && deviceHasBiometricsBool && Platform.OS === 'ios') {
      const [
        isDeviceHaveLocalAuth,
        isDeviceRegisteredLocalAuth,
      ] = await Promise.all([
        LocalAuthentication.hasHardwareAsync(),
        LocalAuthentication.isEnrolledAsync(),
      ]);
      if (isDeviceHaveLocalAuth && isDeviceRegisteredLocalAuth) {
        const { success } = await LocalAuthentication.authenticateAsync(
          'Use TouchID to confirm this');
        if (success) {
          this.handleChipIn();
        }
      } else {
        this.props.hideModal('chipInConfirm');
        showMessage({
          message: 'Biometrics error',
          description: 'Please ensure you have set up biometrics in your OS settings.',
          type: 'warning',
          floating: true,
          duration: 3000,
        });
      }
    } else {
      this.handleWithoutBiometrics();
    }
  };

  handleWithoutBiometrics = () => {
    this.props.showModal('tipModal', {
      content: (
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 17,
              textAlign: 'center',
              color: colors._darkblue,
            }}
          >
            Enter password
          </Text>
          <Space size={20}/>
          <TextInput
            onChangeText={text => this.setState({ password: text })}
            secureTextEntry
            autoCapitalize='none'
            placeholder='Password'
            style={{
              borderWidth: 1,
              borderColor: colors._blue,
              borderRadius: 10,
              padding: 5,
            }}
          />
          <Space size={20}/>
          <Button
            text="Confirm"
            onPress={this.handleSubmitPassword}
            loaderKey="chipInSubmitting"
          />
          <Space size={40}/>
          <TouchableOpacity
            onPress={this.forgotPassword}
          >
            <Text
              style={{
                color: colors._darkviolet,
                fontSize: 15,
                textAlign: 'center',
              }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }

  handleSubmitPassword = async () => {
    const { email } = await StorageService.User.get();
    const { password } = this.state;

    const passwordAccepted = await confirmPassword({ email, password });

    if (passwordAccepted) {
      this.props.hideModal('tipModal');
      this.handleChipIn();
    } else {
      this.props.hideModal('tipModal');
      showMessage({
        message: 'Password incorrect',
        description: 'Incorrect password - please try again',
        type: 'warning',
        floating: true,
        duration: 3000,
      });
    }
  }

  forgotPassword = () => {
    this.props.hideModal('tipModal');
    this.props.navigation.navigate('ForgotPassword');
  }

  handleChipIn = async () => {
    const {
      investStartup,
      showModal,
      route: { params },
      navigation
    } = this.props;
    const {
      match,
      chipAmount,
      investmentTypeId,
      refreshHandler,
      company,
    } = params;

    try {
      this.props.enableLoader('chipInSubmitting');
      await investStartup({
        selectedMatchId: match.id,
        count: chipAmount / match.chipAmount,
        investment_entity_id: investmentTypeId,
        refreshHandler,
      });

      navigation.navigate('Startups');
      //analytics
      Amplitude.logEvent(
        AMP_USER_CHIPPED_IN,
      );
      //analytics
      setTimeout(() => showModal(
        'chipInSuccess',
        {
          company,
        },
      ), 1000);
      this.props.disableLoader('chipInSubmitting');
    } catch (error) {
      this.props.disableLoader('chipInSubmitting');
    }
  };

  componentDidMount () {
    const {
      company,
    } = this.props.route.params;

    this.constructor.loanAgreementUrl = company.unsignedConvertibleLoanAgreement;
    this.constructor.loanAgreementUrlPreview = company.unsignedConvertibleLoanAgreementPreview;
    this.constructor.shortInformationNoteUrl = company.companyShortInformationNote;
  }

  onCancel = async () => {
    const {
      navigation,
    } = this.props;

    navigation.goBack();
  };

  static GRADIENT_HEIGHT = DEVICE_HEIGHT / 2;

  render () {
    const {
      chipAmount,
      investmentNameHumanized,
      company = {},
    } = this.props.route.params;

    const { statement1Agreed, statement2Agreed } = this.state;
    const { GRADIENT_HEIGHT } = this.constructor;

    return (
      <ScreenContainer
        navHeader
        navHeaderBackHandler={this.onCancel}
        gradientHeight={GRADIENT_HEIGHT}
        contentOffsetTop={0}
      >
        <Text style={styles.head}>
          Confirmation
        </Text>
        <Space size={70}/>
        <ScrollView
          style={styles.mainInnerContainer}
          contentContainerStyle={{ flex: 1 }}
        >
          <View style={styles.mainCard}>
            <Image
              source={{
                uri: company.companyLogo,
              }}
              style={{
                height: 40,
                width: 40,
              }}
              resizeMode='contain'
            />
            <Text
              style={{
                fontSize: 17,
                textAlign: 'center',
              }}
            >
              This is to confirm you will be making following chip:
            </Text>
            <View style={{ width: '100%' }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Svg
                  width="24"
                  height="24"
                  source={suitcaseIco}
                />
                <View style={{ width: 10 }}/>
                <Text style={styles.labelText}>
                  The Company:
                </Text>
                <Text style={styles.mainText}>
                  {company.name}
                </Text>
              </View>

              <HR/>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Svg
                  width="24"
                  height="24"
                  source={moneyBagIco}
                />
                <View style={{ width: 10 }}/>
                <Text style={styles.labelText}>
                  Chip amount:
                </Text>
                <Text style={styles.mainText}>
                  {`€${chipAmount && formatWithCommaSeparators(chipAmount)}`}
                </Text>
              </View>
              <HR/>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Svg
                  width="24"
                  height="24"
                  source={investingIco}
                />
                <View style={{ width: 10 }}/>
                <Text style={styles.labelText}>
                  Investing as:
                </Text>
                <Text style={styles.mainText}>
                  {investmentNameHumanized}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              justifyContent: 'space-between',
              flex: 1,
              paddingTop: 10,
            }}
          >
            {/*<SwitchWithText*/}
            {/*  onValueChange={this.onInputChange('statement1Agreed')}*/}
            {/*  value={statement1Agreed}*/}
            {/*  text={(*/}
            {/*    <Text style={styles.licenseText}>*/}
            {/*      I agree to the*/}
            {/*      {' '}*/}
            {/*      <Link*/}
            {/*        simpleText*/}
            {/*        onPress={() => this.onViewerShow(*/}
            {/*          {*/}
            {/*            pdf: this.constructor.loanAgreementUrl,*/}
            {/*            html: this.constructor.loanAgreementUrlPreview,*/}
            {/*          },*/}
            {/*          false,*/}
            {/*        )}*/}
            {/*      >*/}
            {/*        Convertible Loan Agreement*/}
            {/*      </Link>*/}
            {/*      {' '}*/}
            {/*      and approve the*/}
            {/*      {' '}*/}
            {/*      <Link*/}
            {/*        simpleText*/}
            {/*        onPress={() => this.onViewerShow(*/}
            {/*          {*/}
            {/*            pdf: this.constructor.shortInformationNoteUrl*/}
            {/*          },*/}
            {/*          false,*/}
            {/*        )}*/}
            {/*      >*/}
            {/*        Information Note*/}
            {/*      </Link>*/}
            {/*      .*/}
            {/*    </Text>*/}
            {/*  )}*/}
            {/*/>*/}
            <SwitchWithText
              onValueChange={this.onInputChange('statement2Agreed')}
              value={statement2Agreed}
              text={(
                <Text
                  style={styles.licenseText}
                >
                  <Text>
                    I accept the
                    {' '}
                    <Link
                      simpleText
                      onPress={() => this.onViewerShow(this.constructor.terms_of_use_pdf)}
                    >
                      Pitchdrive Terms of Use
                    </Link>
                    {' '}
                    ,
                    {' '}
                    <Link
                      simpleText
                      onPress={() => this.onViewerShow(this.constructor.risk_warnings_pdf)}
                    >
                      Risk Warnings
                    </Link>
                    {' '}
                    and
                    {' '}
                    <Link
                      simpleText
                      onPress={() => this.onViewerShow(this.constructor.privacy_policy_pdf)}
                    >
                      Privacy Policy
                    </Link>
                    .
                  </Text>
                </Text>
              )}
            />
            <Button
              text="Confirm"
              onPress={this.handleSubmit}
              loaderKey="chipInSubmitting"
              disabled={this.formInvalid()}
            />
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }
}

export default compose(
  connect(
    null,
    {
      showModal,
      switchModal,
      hideModal,
      enableLoader,
      disableLoader,
      ...StartupActions,
    },
  ),
)(ChipInConfirmDialog);