import React from 'react';
import {
  View,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FontAwesome } from '@expo/vector-icons';
import SvgUri from 'expo-svg-uri';
import Pulse from 'react-native-pulse';

import styles from './styles';
import { StartupActions } from 'redux/actions';
import { UserSelectors } from 'redux/selectors';
import DiscoveryLoading from 'assets/images/discovery_no_data.png';
import ScreenContainer from 'containers/ScreenContainer';
import PushNotificationsPermissionTipPartial
  from './components/PushPermissionsTipPartial';
import {
  NEW_MATCH,
} from 'static/constants/notificationsKeys';
import Text from 'components/common/Text';
import {
  arraySum,
} from 'utils/number';
import Space from 'components/common/Space';
import Carousel from 'components/common/Carousel';
import { getCompaniesWithPendingInvestments } from 'redux/companies/actions';
import {
  getProspectMatches,
  setProspectSwitch,
  toggleProspectSwitch,
} from 'redux/startup/actions';
import { getCompaniesWithPendingInvestmentsCollectionState } from 'redux/companies/selectors';
import {
  getStartupMatches,
  getStartupProspectMatches,
} from 'redux/startup/selectors';
import withUser from 'HOCs/withUser';
import ChipInDialog from 'components/common/modals/ChipIn/ChipInSuccessDialog';
import PaymentModal from 'components/common/modals/ChipIn/Payment';
import { DEVICE_HEIGHT } from 'styles/metrics';
import { showModal } from 'redux/common/actions';
import ensureAndroidCloseButton from 'HOCs/ensureAndroidCloseButton';
import StartupCard from './components/StartupCard';
import StartupPendingCard from './components/StartupPendingCard';
import SwitchCustom from 'components/common/SwitchCustom';
import favoriteIcon from 'assets/images/favorite.svg';
import magnifyingGlassIcon from 'assets/images/magifying_glass.svg';
import colors from 'styles/colors';
import { getProspectSwitchStatus } from 'redux/startup/selectors';

export const getRefCode = company => {
  const lowestId = Math.min.apply(
    null,
    company.userInvestments.map(({ id }) => id),
  );

  const lowestIdInvestment = company.userPendingInvestments.find(({ id }) => id ===
    lowestId);

  return lowestIdInvestment ? lowestIdInvestment.uid : null;
};

class StartupIndex extends React.Component {

  componentDidMount () {
    this.props.setProspectSwitch(false);
  }

  onStartupShowNavigate = (company, diff, diffDeltaIcon) => () => {
    const { navigation } = this.props;

    navigation.navigate(
      'PortfolioShow',
      {
        companyId: company.id,
        diff,
        diffDeltaIcon,
        refCode: getRefCode(company),
      },
    );
  };

  getUserInvestedAmount = (match) => {
    const { userInvestments, userId } = match;
    const userRelatedInvestments = userInvestments
      .filter((investment) => investment.userId === +userId);

    return arraySum(userRelatedInvestments.map(({ amount }) => amount));
  };

  renderNoMatchesPlaceholder = () => {
    const { pendingCompanies } = this.props;
    return (
      <View
        style={[
          styles.content,
          {
            alignItems: 'center',
          },
        ]}
      >
        <Space size={40}/>
        <Text style={styles.description_nodata}>
          {
            pendingCompanies.length > 0
              ? 'You have pending investments!'
              : 'We’re currently hunting unicorns.\nPlease check again shortly'
          }
        </Text>
        <Text style={styles.description_nodata}>
          Swipe down to refresh
        </Text>
        <FontAwesome
          name="angle-double-down"
          size={30}
          style={{ color: '#ffffff' }}
        />
        <Space size={DEVICE_HEIGHT * 0.07}/>
        <Image
          source={DiscoveryLoading}
          style={styles.loading_nodata}
          resizeMode='contain'
        />
      </View>
    );
  };

  reload = async () => Promise.all([
    this.props.getStartupMatches(),
    this.props.getCompaniesWithPendingInvestments(),
    this.props.getProspectMatches(),
  ]);

  render () {
    const { matches, pendingCompanies, navigation, toggleProspectSwitch, prospectSwitchStatus, prospectMatches } = this.props;

    const notInvestedMatches = matches.filter(
      match => !this.getUserInvestedAmount(match),
    );

    const investedMatches = matches.filter(
      match => this.getUserInvestedAmount(match),
    );

    return (
      <ScreenContainer
        contentOffsetTop={0}
        gradientHeight={matches.length !== 0
          ? DEVICE_HEIGHT * 2 / 5 + 100
          : DEVICE_HEIGHT * 3 / 4 + 100
        }
        reloadHandler={this.reload}
        reloadWatchers={{
          pushTokenRefresh: true,
          pushNotificationsReload: {
            key: NEW_MATCH,
          },
          pushNotificationsPermissionsAsk: {
            tip: PushNotificationsPermissionTipPartial,
          },
        }}
      >
        <ChipInDialog/>
        <PaymentModal/>
        <Space size={10}/>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text
            bold
            style={styles.title}
          >
            Discover
          </Text>
          <SwitchCustom
            onSwitch={() => {
              navigation.navigate('ProspectCards');
              toggleProspectSwitch();
            }}
            value={prospectSwitchStatus}
            iconActive={toggled => ({
              source: toggled ? favoriteIcon : magnifyingGlassIcon,
              props: {
                fill: toggled ? '#FC95A7' : colors._darkblue,
              },
            })}
            IconInactive={() => (
              <View
                style={{
                  top: 0,
                  position: 'absolute',
                  right: 8,
                  width: 20,
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  overflow: 'visible',
                }}
              >
                <SvgUri
                  source={favoriteIcon}
                  fill="#ffffff"
                />
                {
                  prospectMatches.length > 0 && (
                    <Pulse
                      color='white'
                      numPulses={1}
                      diameter={30}
                      speed={50}
                      duration={2000}
                      style={{
                        position: 'absolute',
                        right: -6,
                        top: -4,
                      }}
                    />
                  )
                }
              </View>
            )}
          />
        </View>
        <Space size={20}/>
        {
          pendingCompanies.length > 0 && (
            <Carousel
              pagination={false}
              data={pendingCompanies
                .filter(({ match }) => match.status !== 'declined')
                .filter((company) => company.investmentStatus ===
                  'complete_successful')
              }
              getCardContent={company => (
                <StartupPendingCard
                  company={company}
                  reloadHandler={this.reload}
                />
              )}
              onCardPress={this.onStartupShowNavigate}
            />
          )
        }
        {
          matches.length !== 0
            ? [
              ...notInvestedMatches,
              ...investedMatches,
            ]
              .map(item => (
                <StartupCard
                  key={item.id}
                  match={item}
                />
              ))
            : this.renderNoMatchesPlaceholder()
        }
        <Space size={20}/>
      </ScreenContainer>
    );
  }
}

const mapDispatchToProps = {
  ...StartupActions,
  getCompaniesWithPendingInvestments,
  showModal,
  getProspectMatches,
  toggleProspectSwitch,
  setProspectSwitch,
};

const mapStateToProps = (state) => ({
  matches: getStartupMatches(state),
  loading: UserSelectors.loading(state),
  pendingCompanies: getCompaniesWithPendingInvestmentsCollectionState(state),
  prospectSwitchStatus: getProspectSwitchStatus(state),
  prospectMatches: getStartupProspectMatches(state),
});

export default compose(
  withUser,
  ensureAndroidCloseButton,
  connect(mapStateToProps, mapDispatchToProps),
)(StartupIndex);
