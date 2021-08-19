import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Svg from 'expo-svg-uri';

import colors from 'styles/colors';
import {
  showModal,
  hideModal,
  enableLoader,
  disableLoader,
  switchModal,
} from 'redux/common/actions';
import Button from 'components/common/Button';
import { StartupActions } from 'redux/actions';
import Close from 'components/common/elements/Close';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from 'styles/metrics';
import {
  formatWithNumericalAbbreviationThousands,
  formatWithCommaSeparators,
} from 'utils/number';
import Text from 'components/common/Text';
import FractionsProgressBar
  from 'components/common/progressBars/FractionsProgressBar';
import withUser from 'HOCs/withUser';
import HR from 'components/common/HR';
import plusIco from 'assets/images/plus.svg';
import minusIco from 'assets/images/minus.svg';
import RadioForm from 'components/common/RadioForm';
import userIdentities from 'static/constants/userIdentities';
import styles from './styles';
import Duration from 'components/common/Duration';
import Space from 'components/common/Space';
import ScreenContainer from 'containers/ScreenContainer';
import { arraySum } from 'utils/number';
import generalStyles from 'styles/index';
import NetworkService from 'services/network';
import ensureAndroidCloseButton from 'HOCs/ensureAndroidCloseButton';

class ChipInAmountDialog extends React.Component {

  state = {
    chipAmount: 0,
    investmentTypeId: 0,
    investmentNameHumanized: '',
    startUpDismissReason: '',
  };

  getInvestmentTypeTranslation = (entityType) => {
    const {
      user,
    } = this.props;

    if (user.investmentEntities) {
      switch (entityType) {
      case 'natural_person':
        return `${user.investmentEntities.find(({ entityType: type }) => type ===
          entityType).name}`;

      case 'legal_entity':
        return user.investmentEntities.find(({ entityType: type }) => type ===
          entityType).legalName;
      default:
        return '';
      }
    }
  };

  handleSubmit = async () => {
    const {
      navigation,
      route: { params },
    } = this.props;

    const {
      company,
      match,
    } = params;


    navigation.navigate(
      'ChipInConfirm',
      {
        company,
        match,
        ...this.state,
      },
    );
  };

  componentDidMount () {
    const {
      route: { params },
    } = this.props;

    if(params) {
      this.initializeModal();
    }
  }

  initializeModal = () => {
    const {
      user,
      route: { params },
    } = this.props;
    const {
      match,
      chipAmount,
      investmentNameHumanized,
      userInvestments,
    } = params;

    const userInvestedAmount = userInvestments &&
      arraySum(userInvestments.map(({ amount }) => amount));

    const naturalPersonInvestment = user.investmentEntities
      .find(({ entityType }) => entityType === userIdentities[0].value);

    const legalPersonInvestment = user.investmentEntities
      .find(({ entityType }) => entityType === userIdentities[1].value);

    const relatedInvestment = naturalPersonInvestment || legalPersonInvestment;

    this.setState({
      chipAmount: userInvestedAmount >= match.minimumChipAmount
        ? (chipAmount || match.chipAmount)
        : match.minimumChipAmount - userInvestedAmount,
      investmentTypeId: user.defaultInvestmentEntity,
      investmentNameHumanized: investmentNameHumanized ||
        this.getInvestmentTypeTranslation(relatedInvestment.entityType),
    });
  };

  getIncrementTipFailureContent = () => {
    const {
      hideModal,
    } = this.props;

    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <Text
          textAlign="center"
          color={colors._darkblue}
          fontSize={20}
        >
          You’re filling up the round!
        </Text>
        <Space size={30}/>
        <Button
          width={212}
          height={56}
          onPress={() => {
            hideModal('tipModal');
          }}
        >
          Got it!
        </Button>
      </View>
    );
  };

  incrementChipAmount = () => {
    const {
      showModal,
      route: { params },
    } = this.props;
    const {
      company,
      investments,
      match,
    } = params;

    if (this.state.chipAmount +
      investments.reduce((total, { amount }) => total + amount, 0) <
      company.requiredFundingAmount) {
      this.setState(prevState => ({
        chipAmount: prevState.chipAmount + match.chipAmount,
      }));
    } else {
      showModal(
        'tipModal',
        {
          content: this.getIncrementTipFailureContent(),
        },
      );
    }
  };

  getDecrementTipFailureContent = () => {
    const {
      hideModal,
      route: { params },
    } = this.props;

    const {
      match,
    } = params;

    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <Text
          textAlign="center"
          color={colors._darkblue}
          fontSize={20}
        >
          {` The minimum investment of this round is €${formatWithCommaSeparators(
            match.chipAmount)}`}
        </Text>
        <Space size={30}/>
        <Button
          width={212}
          height={56}
          onPress={() => {
            hideModal('tipModal');
          }}
        >
          Got it!
        </Button>
      </View>
    );
  };

  decrementChipAmount = () => {
    const {
      showModal,
      route: { params },
    } = this.props;
    const {
      match,
    } = params;

    if (this.state.chipAmount > match.chipAmount) {
      this.setState(prevState => ({
        chipAmount: prevState.chipAmount - match.chipAmount,
      }));
    } else {
      showModal(
        'tipModal',
        {
          content: this.getDecrementTipFailureContent(),
        },
      );
    }
  };

  setDefaultInvestmentType = (value) => {
    const {
      user,
    } = this.props;

    const relatedInvestment = user.investmentEntities
      .find(({ id }) => value === id);

    this.setState({
      investmentTypeId: value,
      investmentNameHumanized: this.getInvestmentTypeTranslation(
        relatedInvestment.entityType),
    });
  };

  getDismissStartupModalContent = () => {
    const {
      hideModal,
      navigation,
      route: { params },
    } = this.props;
    const {
      match = {},
    } = params;

    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: 1,
          paddingBottom: 10,
        }}
      >
        <Text
          fontStyle="italic"
          fontSize={15}
          color={colors._darkblue}
        >
          Are you sure you{' '}
          <Text
            color={colors._darkblue}
            style={{
              textDecorationLine: 'underline',
            }}
          >
            don't
          </Text>
          {' '}want to invest in this startup?
        </Text>
        <Space size={30}/>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
          }}
        >
          <TextInput
            onChangeText={text => this.setState({
              startUpDismissReason: text,
            })}
            style={{
              backgroundColor: '#ffffff',
              color: colors._gray,
              fontSize: 12,
              fontFamily: 'ProximaNova_Regular',
              borderRadius: 15,
              borderWidth: 1,
              borderColor: colors._lightgray,
              paddingLeft: 10,
              paddingRight: 20,
              paddingTop: 10,
              paddingBottom: 10,
              flex: 1,
            }}
            placeholder="Can we ask you why you decided not to invest?"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            marginTop: 10,
          }}
        >
          <Button
            width={131}
            height={31}
            customTextStyles={{
              fontSize: 10,
              fontStyle: 'italic',
            }}
            onPress={async () => {
              hideModal('tipModal');
            }}
          >
            I changed my mind
          </Button>
          <Button
            onPress={async () => {
              NetworkService.Startup()
                .code200(() => {
                  hideModal('tipModal');
                  setTimeout(() => {
                    navigation.navigate('StartupIndex', { forceReload: true });
                  }, 500);
                })
                .disableMatch(match.id, this.state.startUpDismissReason);
            }}
            type="secondary"
            width={131}
            height={31}
            customTextStyles={{
              fontSize: 10,
              fontStyle: 'italic',
            }}
          >
            Don't invest
          </Button>
        </View>
      </View>
    );
  };

  static GRADIENT_HEIGHT = DEVICE_HEIGHT / 2;

  render () {
    const {
      user,
      navigation,
      route: { params },
    } = this.props;

    if (!params) {
      return null;
    }

    const {
      company = {},
      investments = [],
      userInvestments,
      match = {},
    } = params;

    const { chipAmount } = this.state;
    const { GRADIENT_HEIGHT } = this.constructor;

    const userInvestedAmount = userInvestments &&
      arraySum(userInvestments.map(({ amount }) => amount));

    const roundIsFull = investments &&
      arraySum(investments.map(({ amount }) => amount)) >=
      company.requiredFundingAmount;

    return (
      <ScreenContainer
        navHeader
        NavHeaderBackComponent={Close}
        navHeaderBackHandler={() => {
          navigation.goBack(null);
        }}
        gradientHeight={GRADIENT_HEIGHT}
        contentOffsetTop={0}
      >
        <Text style={styles.head}>
          Time to chip in
        </Text>
        <Text style={styles.subHead}>
          How much would you like to commit?
        </Text>
        <View
          style={styles.mainInnerContainer}
        >
          <View
            style={[
              styles.mainCard,
              {
                justifyContent: 'space-between',
              },
            ]}
          >
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
            <View style={{ height: 10 }}/>

            <Text style={{ fontSize: 17 }}>
              {company.name}
            </Text>
            <View style={{ height: 10 }}/>
            <View
              style={styles.investedTodayContainer}
            >
              <View
                style={[
                  styles.investedTodayItem,
                ]}
              >
                <Text
                  fontSize={12}
                  color={colors._gray}
                >
                  Valuation
                </Text>
                <Text
                  fontSize={12}
                  color={colors._darkblue}
                >
                  {company.valuation &&
                  `€${formatWithCommaSeparators(company.valuation)}`}
                </Text>
              </View>
              <View
                style={[
                  styles.investedTodayItem,
                  {
                    alignItems: 'flex-end',
                  },
                ]}
              >
                <Text
                  fontSize={12}
                  color={colors._gray}
                >
                  Committed amount
                </Text>
                <Text
                  fontSize={12}
                  color={colors._darkblue}
                >
                  {
                    userInvestedAmount > 0 &&
                    `€${formatWithNumericalAbbreviationThousands(
                      userInvestedAmount)}`
                  }
                  {
                    !roundIsFull &&
                    `+ €${formatWithNumericalAbbreviationThousands(chipAmount)}`
                  }
                </Text>
              </View>
            </View>
            <Space size={20}/>
            <FractionsProgressBar
              width={DEVICE_WIDTH - 32 - 66}
              progress1={
                arraySum(investments.map(({ amount }) => amount))
              }
              progress2={
                arraySum(investments.map(({ amount }) => amount)) + chipAmount
              }
              total={company.requiredFundingAmount}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Duration
                endDate={match.endDate}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: colors._gray,
                }}
              >
                {
                  company && `€${formatWithNumericalAbbreviationThousands(company.requiredFundingAmount)}`
                }
              </Text>
            </View>
            <HR/>
            {
              !roundIsFull && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    height={30}
                    width={30}
                    borderRadius={15}
                    onPress={this.decrementChipAmount}
                    disabled={userInvestedAmount + chipAmount <=
                    match.minimumChipAmount || chipAmount <= match.chipAmount}
                    style={[
                      styles.amountChangeButton,
                      {
                        marginRight: 14,
                        opacity: userInvestedAmount + chipAmount <=
                        match.minimumChipAmount || chipAmount <=
                        match.chipAmount ? 0 : 1,
                      },
                    ]}
                    content={(
                      <Svg
                        width="27"
                        height="27"
                        source={minusIco}
                      />
                    )}
                  />
                  <Text
                    style={styles.amountText}
                  >
                    {`€${formatWithCommaSeparators(chipAmount)}`}
                  </Text>
                  <Button
                    onPress={this.incrementChipAmount}
                    height={40}
                    width={40}
                    style={[
                      styles.amountChangeButton,
                      {
                        marginLeft: 14,
                      },
                    ]}
                    content={(
                      <Svg
                        width="27"
                        height="27"
                        source={plusIco}
                      />
                    )}
                  />
                </View>
              )
            }
            <Space size={10}/>
            <TouchableOpacity
              onPress={() => {
                this.props.showModal('tipModal', {
                  content: this.getDismissStartupModalContent(),
                });
              }}
            >
              <Text
                style={generalStyles.link}
              >
                I do not want to invest in this startup
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 20 }}/>
          <View
            style={[
              styles.radioContainer,
              {
                justifyContent: user.investmentEntities.length > 1
                  ? 'space-between'
                  : 'flex-end',
              },
            ]}
          >
            {
              user.investmentEntities.length > 1 && !roundIsFull && (
                <RadioForm
                  value={this.state.investmentTypeId}
                  onPress={this.setDefaultInvestmentType}
                  scheme={
                    user.investmentEntities.map(({ id, entityType }) => ({
                      value: id,
                      label: `I want to invest as ${this.getInvestmentTypeTranslation(
                        entityType)}`,
                    }))
                  }
                />
              )
            }
            {
              roundIsFull && (
                <React.Fragment>
                  <Text
                    fontSize={17}
                    textAlign="center"
                  >
                    This round is all filled up. Stay put because they might
                    choose to raise more!
                  </Text>
                  <Space size={30}/>
                </React.Fragment>
              )
            }
            {
              !roundIsFull && (
                <Button
                  text="Continue"
                  onPress={this.handleSubmit}
                  loaderKey="chipInSubmitting"
                  style={{ elevation: 2, borderColor: 'transparent' }}
                />
              )
            }
            <Space size={20}/>
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
      switchModal,
      hideModal,
      enableLoader,
      disableLoader,
      ...StartupActions,
    },
  ),
  withUser,
  ensureAndroidCloseButton,
)(ChipInAmountDialog);