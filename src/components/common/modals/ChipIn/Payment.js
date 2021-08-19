import React from 'react';
import {
  View,
  Modal,
  Image,
  Clipboard,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Svg from 'expo-svg-uri';

import {
  showModal,
  switchModal,
  hideModal,
  enableLoader,
  disableLoader,
} from 'redux/common/actions';
import Button from 'components/common/Button';
import HR from 'components/common/HR';
import { DEVICE_HEIGHT, DEVICE_WIDTH, DEVICE_HEIGHT_NO_STATUS_BAR } from 'styles/metrics';
import investingIco from 'assets/images/investing.svg';
import moneyBagIco from 'assets/images/money_bag.svg';
import styles from './styles';
import Space from 'components/common/Space';
import ScreenContainer from 'containers/ScreenContainer';
import {
  formatWithCommaSeparators,
} from 'utils/number';
import Text from 'components/common/Text';
import colors from 'styles/colors';
import Help from 'components/common/elements/Help';
import TipModal from 'components/common/modals/TipModal';
import NetworkService from 'services/network';
import { getModalParamsByName } from 'redux/common/selectors';
import FAB from 'components/common/modals/FAB';

export const PAYMENT_LOADER_KEY = 'paymentSubmitting';

class Payment extends React.Component {

  handleSubmit = async () => {
    const {
      modalParams: {
        company,
        reloadHandler,
      },
      hideModal,
    } = this.props;

    return NetworkService.Portfolio()
      .withLoaderKey(PAYMENT_LOADER_KEY)
      .code200(() => {
        hideModal('payment');
        reloadHandler();
      })
      .markPaymentSend(company.userInvestments[0].matchId);
  };

  onCancel = async () => {
    const {
      hideModal,
    } = this.props;

    hideModal('payment');
  };

  _renderRow = (title, content) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
      }}
    >
      <Text
        fontSize={11}
        color={colors._darkblue}
        textAlign="left"
        style={{
          width: (DEVICE_WIDTH - 32 - 64) / 2 - 30,
        }}
      >
        {title}
      </Text>
      <Space size={10} horizontal/>
      <TouchableOpacity
        onPress={() => {
          Clipboard.setString(content);
          this.props.showModal('fab', { content: 'Copied' });
        }}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 12,
          borderRadius: 20,
          borderWidth: 0.5,
          borderColor: '#D8D8D8',
          width: (DEVICE_WIDTH - 32 - 64) / 2 + 30,
        }}
      >
        <Text
          fontSize={13}
          color={colors._darkblue}
          textAlign="center"
          style={{
            fontFamily: 'ProximaNova_Bold',
          }}
        >
          {content}
        </Text>
      </TouchableOpacity>
    </View>
  );

  getPaymentTipModalContent = () => {
    const {
      hideModal,
    } = this.props;

    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: 1,
        }}
      >
        <Text
          fontSize={17}
          textAlign="center"
          color={colors._darkblue}
          fontFamily="ProximaNova_Bold"
        >
          Information about payment
        </Text>
        <Space size={20}/>
        <Text
          color={colors._darkblue}
          fontSize={17}
        >
          This payment can done by through a regular banktransfer. We will
          provide you with the required payment information including a unique
          reference code. Please include this in the description of the payment.
          Only click on the ‘I have paid’ button when you have received a
          confirmation of payment. The startup will only appear in your
          portfolio when we have confirmation of payment from both sides.
        </Text>
        <Space size={30}/>
        <Button
          width={165}
          height={64}
          onPress={() => {
            hideModal('tipModal');
          }}
        >
          I understand
        </Button>
      </View>
    );
  };

  static GRADIENT_HEIGHT = DEVICE_HEIGHT / 2;

  render () {
    const {
      modalParams: {
        visible,
        company = {},
        amount = 0,
        investingAs,
        refCode,
      },
      onHide,
      showModal,
    } = this.props;

    const { GRADIENT_HEIGHT } = this.constructor;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onHide}
      >
        <TipModal/>
        <ScreenContainer
          navHeader
          navHeaderBackHandler={this.onCancel}
          gradientHeight={GRADIENT_HEIGHT}
          contentOffsetTop={0}
        >
          <Text style={styles.head}>
            Payment details
          </Text>
          <Space size={30}/>
          <View
            style={[
              styles.mainCard,
              {
                height: DEVICE_HEIGHT_NO_STATUS_BAR - 220,
                justifyContent: 'flex-start',
              },
            ]}
          >
            <Space size={15}/>
            <Help
              style={{
                position: 'absolute',
                top: 12,
                right: 9,
              }}
              onPress={() => {
                showModal('tipModal', {
                  content: this.getPaymentTipModalContent(),
                  height: 537,
                });
              }}
            />
            <Text
              fontSize={8}
              color="#979797"
              style={{
                position: 'absolute',
                bottom: 10,
                right: 11,
              }}
            >
              * tap cards to copy
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={{
                  uri: company.companyLogo,
                }}
                style={{
                  height: 40,
                  width: 40,
                  marginRight: 10,
                }}
                resizeMode='contain'
              />
              <Text
                style={{ fontSize: 17, textAlign: 'center', marginLeft: 10 }}>
                {company.name}
              </Text>
            </View>
            <Space size={15}/>
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
                  source={moneyBagIco}
                />
                <View style={{ width: 10 }}/>
                <Text style={styles.labelText}>
                  Amount:
                </Text>
                <Text style={styles.mainText}>
                  {`€${formatWithCommaSeparators(amount)}`}
                </Text>
              </View>
              <Space size={10}/>
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
                  {investingAs}
                </Text>
              </View>
            </View>
            <HR/>
            {
              this._renderRow(
                ' Bank account number:',
                company.bankAccountNumber,
              )
            }
            {
              this._renderRow(
                'Routing number/BIC:',
                company.bankRoutingNumber,
              )
            }
            {
              this._renderRow(
                'Addressed to:',
                company.legalName,
              )
            }
            {
              this._renderRow(
                'Reference code:',
                refCode,
              )
            }
            <FAB/>
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              flex: 1,
            }}
          >

            <Button
              text="I have completed the payment"
              onPress={this.handleSubmit}
              loaderKey={PAYMENT_LOADER_KEY}
            />
            <Space size={20}/>
          </View>
        </ScreenContainer>
      </Modal>
    );
  }
}

export default compose(
  connect(
    state => (
      {
        modalParams: getModalParamsByName(state)('payment'),
      }
    ),
    {
      showModal,
      switchModal,
      hideModal,
      enableLoader,
      disableLoader,
    },
  ),
)(Payment);