import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { 
  View,
  TextInput,
  TouchableOpacity,
  Text as NativeText,
  Platform,
} from 'react-native';
import Svg from 'expo-svg-uri';
import * as LocalAuthentication from 'expo-local-authentication';
import Constants from 'expo-constants';
import { showMessage } from 'react-native-flash-message';
import SvgUri from 'expo-svg-uri';

import Text from 'components/common/Text';
import styles from './styles';
import ScreenContainer from 'containers/ScreenContainer';
import Button from 'components/common/Button';
import Link from 'components/common/NavLink';
import { 
  showModal, 
  hideModal,
} from 'redux/common/actions';
import {
  INTERFACE_TYPE as INTERACTIVE_INTERFACE_TYPE,
} from 'components/common/modals/PDFViewer/containers/InteractiveInterface';
import NetworkService from 'services/network';
import StorageService from 'services/storage';
import checkIcon from 'assets/images/check.svg';
import headerLogoIcon from 'assets/images/header_logo.svg';
import Space from 'components/common/Space';
import PentagonalButton from 'components/common/PentagonalButton';
import {
  DEVICE_HEIGHT,
  SMALL_DEVICE_ANDROID,
} from 'styles/metrics';
import colors from 'styles/colors';
import { deviceHasBiometrics as  determineDeviceHasBiometrics} from 'utils/device';
import { confirmPassword } from 'utils/security';
import HelpButton from 'components/common/modals/Help';

const entityTypesMap = [
  {
    value: 'natural_person',
    label: 'Natural Person',
  },
  {
    value: 'legal_entity',
    label: 'Legal Entity',
  },
];

class ESignScreen extends React.Component {

  state = {
    contracts: [],
    thermsAccepted: [],
    activeContractIndex: 0,
    password: '',
  };

  async componentDidMount () {
    const { userId } = await StorageService.User.get();
    NetworkService.User()
      .code200(({ data }) => {
        const contracts = data.user.investment_entities.map(({ investment_contract, investment_contract_preview, entity_type }) => ({
          pdf: investment_contract,
          html: investment_contract_preview,
          label: entityTypesMap.find(({ value }) => value === entity_type).label,
        }));
        this.setState({
          contracts,
          thermsAccepted: contracts.map(() => false),
        });
      })
      .getInvestmentContracts(userId);
  }

  handleAccept = (itemIndex) => {
    this.setState(prevState => ({
      thermsAccepted: prevState.thermsAccepted.map((
        isAccepted,
        index,
      ) => itemIndex === index
        ? true
        : isAccepted,
      ),
    }), () => {
      this.props.hideModal('pdfViewer');
    });
  };

  onItemAccept = async (itemIndex) => {
    const deviceHasBiometrics = await determineDeviceHasBiometrics();

    //temporarily all signing for android will be via password

    if (Constants.isDevice && deviceHasBiometrics && Platform.OS === 'ios') {
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
          this.handleAccept(itemIndex);
          this.setState({activeContractIndex: itemIndex + 1});
        }
      } else {
        showMessage({
          message: 'Biometrics error',
          description: 'Please ensure you have set up biometrics in your OS settings.',
          type: 'warning',
          floating: true,
          duration: 3000,
        });
      }
    } else {
      this.handleWithoutBiometrics(itemIndex);
    }
  };

  handleWithoutBiometrics = (itemIndex) => {
    this.props.hideModal('pdfViewer');
    setTimeout(() => {
      this.props.showModal('tipModal', {
        content: (
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            <NativeText
              style={{
                fontSize: 17,
                textAlign: 'center',
                color: colors._darkblue,
              }}
            >
              Enter password
            </NativeText>
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
              onPress={() => this.handleAcceptPassword(itemIndex)}
              loaderKey="chipInSubmitting"
            />
            <Space size={40}/>
            <TouchableOpacity
              onPress={this.forgotPassword}
            >
              <NativeText
                style={{
                  color: colors._darkviolet,
                  fontSize: 15,
                  textAlign: 'center',
                }}
              >
                Forgot Password?
              </NativeText>
            </TouchableOpacity>
          </View>
        ),
      });
    }, 300);
  }

  forgotPassword = () => {
    this.props.hideModal('tipModal');
    this.props.navigation.navigate('ForgotPassword');
  }

  handleAcceptPassword = async (itemIndex) => {
    const { email } = await StorageService.User.get();
    const { password } = this.state;

    const passwordAccepted = await confirmPassword({ email, password });

    if (passwordAccepted) {
      this.props.hideModal('tipModal');
      this.handleAccept(itemIndex);
      this.setState({activeContractIndex: itemIndex + 1});
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

  onItemReject = (itemIndex) => {
    const { navigation, hideModal } = this.props;

    this.setState(prevState => ({
      thermsAccepted: prevState.thermsAccepted.map((
        isAccepted,
        index,
      ) => itemIndex === index
        ? false
        : isAccepted,
      ),
    }), () => {
      hideModal('pdfViewer');
      setTimeout(() => {
        navigation.navigate('ESignReject');
      }, 500);
    });
  };

  handleSubmit = () => {
    const { navigation } = this.props;

    navigation.navigate('ESignConfirm');
  };

  esignInvalid = () => {
    const { thermsAccepted } = this.state;

    return !thermsAccepted.every((isAccepted) => isAccepted);
  }

  sendContractsByEmail = async () => {
    const { email } = await StorageService.User.get();

    this.props.hideModal('tipModal');
    NetworkService.User()
      .code200(() => {
        showMessage({
          message: 'We have sent you an email with instructions and contracts',
          type: 'success',
          floating: true,
          duration: 3000,
        });
      })
      .invalidCredentials401(() => {
        showMessage({
          message: 'Oops, something went wrong!',
          description: 'We have been notified, please try again',
          type: 'warning',
          floating: true,
          duration: 3000,
        });
      })
      .sendContracts(email);
  }

  static GRADIENT_HEIGHT = DEVICE_HEIGHT * 2/5 < 280 ? 280 : DEVICE_HEIGHT * 2/5;

  render () {
    const { showModal } = this.props;
    const { thermsAccepted, contracts } = this.state;
    const { GRADIENT_HEIGHT } = this.constructor;

    const spaceSize = SMALL_DEVICE_ANDROID ? 15 : 30;

    return (
      <ScreenContainer
        navHeader
        navHeaderContent={(
          <HelpButton
            style={{
              top: 3,
              borderWidth: 1,
              padding: 5,
              width: 68,
            }}
            buttons={[
              <Button
                onPress={() => this.sendContractsByEmail()}
                customTextStyles={{
                  fontSize: 13,
                }}
                style={[
                  {
                    width: 150,
                    height: 33,
                  }
                ]}
              >
                Email me the contract
              </Button>
            ]}
            buttonsPopUpTitle="Contracts Help"
          />
        )}
        align="center"
        justify="space-between"
        gradientHeight={GRADIENT_HEIGHT}
        contentOffsetTop={GRADIENT_HEIGHT}
        header={
          <View style={{ alignItems: 'center' }}>
            <SvgUri source={headerLogoIcon}/>
            <Space size={50}/>
            <Text
              fontSize={42}
              color="#ffffff"
            >
              Sign
            </Text>
          </View>
        }
      >
        <View>
          <Text
            textAlign="center"
          >
            We’d like to have you join our Pitchdrive investor community! Sign
            below, receive a confirmation email and you’re all set.
          </Text>
          <Space size={spaceSize}/>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              paddingHorizontal: 30,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'space-around',
              }}
            >
              {
                contracts.map(({ html, pdf, label }, index) => {
                  const allContractsUnsigned = thermsAccepted.every(el => el === false) && !index;
                  const contractLoading = !thermsAccepted[index] && !index; //for pdf modal there is setTimeout
                  const contractCancelled = !thermsAccepted[index] &&
                    this.state.activeContractIndex === thermsAccepted.length;

                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            color: '#000000',
                          }}
                        >
                          {label}
                        </Text>
                        <Link
                          style={styles.thermsLink}
                          onPress={() => showModal(
                            'pdfViewer',
                            {
                              local: false,
                              html,
                              pdf,
                              containerInterface: INTERACTIVE_INTERFACE_TYPE,
                              onConfirm: () => this.onItemAccept(index),
                              onReject: () => this.onItemReject(index),
                            },
                          )
                          }
                        >
                          Pitchdrive agreement
                        </Link>
                      </View>
                      <View>
                        {
                          thermsAccepted[index] &&
                            (
                              <Svg
                                key={index}
                                width="21"
                                height="16"
                                source={checkIcon}
                                style={{
                                  marginBottom: 5,
                                }}
                              />
                            )
                        }
                        {
                          (allContractsUnsigned || contractLoading || contractCancelled) && (
                            <PentagonalButton
                              onPress={() => showModal(
                                'pdfViewer',
                                {
                                  local: false,
                                  html,
                                  pdf,
                                  containerInterface: INTERACTIVE_INTERFACE_TYPE,
                                  onConfirm: () => this.onItemAccept(index),
                                  onReject: () => this.onItemReject(index),
                                },
                              )}
                              label="Sign here"
                            />
                          )
                        }
                      </View>
                    </View>
                  );
                })
              }
            </View>
            <Space size={spaceSize}/>
            <View
              style={{
                alignItems: 'center',
              }}
            >
              <Button
                text="Next"
                onPress={this.handleSubmit}
                disabled={this.esignInvalid()}
                width={212}
                height={56}
                loaderColor={colors._darkviolet}
                style={{
                  marginBottom: 20,
                }}
              />
            </View>
          </View>
        </View>
      </ScreenContainer>
    );
  }
}

export default compose(
  connect(
    null,
    {
      showModal,
      hideModal,
    }
  ),
)(ESignScreen);