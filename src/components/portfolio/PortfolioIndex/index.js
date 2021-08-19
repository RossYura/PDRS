import React, { useState, useCallback } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SvgUri from 'expo-svg-uri';

import { getPortfolio } from 'redux/portfolio/actions';
import { showModal, hideModal } from 'redux/common/actions';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from 'styles/metrics';
import HR from 'components/common/HR';
import IndexCompanyRow from '../components/IndexCompanyRow';
import ChipInDialog from 'components/common/modals/ChipIn/ChipInSuccessDialog';
import colors from 'styles/colors';
import ScreenContainer from 'containers/ScreenContainer';
import portfolioHeaderIcon from 'assets/images/portfolio_header.png';
import Text from 'components/common/Text';
import {
  formatWithCommaSeparators,
  arraySum,
} from 'utils/number';
import Space from 'components/common/Space';
import DeltaLabel from 'components/common/DeltaLabel';
import {
  PAYMENT_COMPLETED,
  ROUND_COMPLETED,
} from 'static/constants/notificationsKeys';
import Button from 'components/common/Button';
import PaymentModal from 'components/common/modals/ChipIn/Payment';
import ListDot from '../components/ListDot';
import alertIconBig from 'assets/images/alert_big.svg';
import useUser from 'hooks/useUser';
import useDispatchWrap from 'hooks/useDispatchWrap';
import { getPortfolioSelector } from 'redux/portfolio/selectors';

const investmentTypes = [
  {
    label: 'Private',
    value: 'private',
  },
  {
    label: 'PD Fund',
    value: 'pdfund',
  },
];

const getTitleHintContent = dispatch => (
  <View
    style={{
      justifyContent: 'space-between',
      flex: 1,
    }}
  >
    <Text
      color={colors._darkblue}
      fontSize={15}
      fontWeight="bold"
    >
      This portfolio score is built from the following
      information points:
    </Text>
    {
      [
        'Monthly traction updates',
        'Monthly team and operation updates',
        'Industry development',
        '(Online) reach of customers',
        'Probability of success over time',
        'Estimated conversion date',
      ].map(txt => (
        <View
          key={txt}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <ListDot/>
          <Space size={5} horizontal/>
          <Text
            color={colors._darkblue}
            fontSize={15}
          >
            {txt}
          </Text>
        </View>
      ))
    }
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <Button
        width={130}
        height={31}
        gradient
        text="Got it!"
        onPress={() => dispatch(hideModal('tipModal'))}
      />
    </View>
  </View>
);

const noInvestmentsPlaceholder = (
  <View
    style={{
      alignItems: 'center',
    }}
  >
    <SvgUri source={alertIconBig}/>
    <Space size={30}/>
    <Text
      bold
      fontSize={15}
      color="#104E72"
      style={{
        width: 240,
      }}
    >
      Looks like your portfolio is currently empty. That's ok, you're only few
      taps away
      from your first investment!
      {'\n'}{'\n'}
      Try tapping on the Magnifying Glass below...
    </Text>
    <Space size={40}/>
  </View>
);

const GRADIENT_HEIGHT = DEVICE_HEIGHT / 2 < 400 ? 400 : DEVICE_HEIGHT / 2;

const PortfolioIndex = ({ navigation }) => {
  const portfolio = useSelector(getPortfolioSelector);
  const { pendingInvestments } = portfolio;
  const [investmentsFilter, setInvestmentsFilter] = useState('private');
  const [getPortfolioDispatchWrapped] = useDispatchWrap(getPortfolio);
  const user = useUser();
  const { userId } = user;
  const dispatch = useDispatch();

  const onStartupShowNavigate = useCallback(
    (company) => () => {
      navigation.navigate(
        'PortfolioShow',
        {
          companyId: company.id,
          refCode: getRefCode(company),
        },
      );
    }, [navigation]);

  const onStartupShowFundNavigate = useCallback(
    (company) => () => {
      navigation.navigate(
        'PortfolioShow',
        {
          companyId: company.id,
          isPdFund: true,
        },
      );
    }, [navigation]);

  const getRefCode = useCallback(company => {
    const userRelatedInvestments = company.userInvestments.filter((investment) => investment.userId === +userId);
    const lowestId = Math.min.apply(
      null,
      userRelatedInvestments.map(({ id }) => id),
    );

    const lowestIdInvestment = pendingInvestments.find(({ id }) => id === lowestId);

    return lowestIdInvestment ? lowestIdInvestment.uid : null;
  }, [userId, pendingInvestments]);

  const getHeader = useCallback(() => {
    const {
      portfolioDeltaScore,
      investments,
      fundCompanies,
      fundPortfolioDeltaScoreChange
    } = portfolio;

    const investmentsValues = investments.filter(({ userId }) => userId === +user.userId).map(investment => investment.amount);

    const estInvestmentsValues =
      investmentsFilter === 'pdfund'
        ? (fundCompanies ? fundCompanies.map(({ company: {investedAmount} }) => investedAmount * fundPortfolioDeltaScoreChange/100) : [])
        : investmentsValues.map(value => value * portfolioDeltaScore.valued_return);

    return (
      <React.Fragment>
        <View
          style={{
            zIndex: 2,
          }}
        >
          <Text
            fontSize={36}
            color="#ffffff"
            bold
          >
            Portfolio
          </Text>
          <Space size={20}/>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingHorizontal: 40,
            }}
          >
            {
              investmentTypes.map(({ label, value }) => (
                <TouchableOpacity
                  key={value}
                  onPress={() => setInvestmentsFilter(value)}
                  style={{
                    borderRadius: 15,
                    borderColor: '#ffffff',
                    borderWidth: 1,
                    backgroundColor: investmentsFilter === value ? '#ffffff' : '#0065A1',
                    width: 76,
                    height: 23,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    fontSize={12}
                    color={investmentsFilter === value ? '#0065A1' : '#ffffff'}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              ))
            }
          </View>
          <Space size={20}/>
          <Text
            fontSize={12}
          >
            PITCHDRIVE VALUE SCORE
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 17,
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <Text style={{ fontSize: 50, color: '#ffffff' }}>
                {`€${formatWithCommaSeparators(arraySum(estInvestmentsValues))}`}
              </Text>
              <TouchableOpacity
                onPress={() => dispatch(showModal('tipModal', {
                  height: 300,
                  content: getTitleHintContent(dispatch),
                }))}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 7,
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                }}
              >
                <Text fontSize={10} color="#ffffff">i</Text>
              </TouchableOpacity>
            </View>
            <DeltaLabel
              comparable={investmentsFilter === 'private'
                ? portfolio.portfolioDeltaScoreMonthlyChange
                : portfolio.fundPortfolioDeltaScoreChange}
              textStyle={{
                fontSize: 17,
                color: '#ffffff',
              }}
            />
          </View>
        </View>
        <View
          style={{
            height: 160,
            width: '100%',
          }}
        >
          <Image
            style={{
              height: 150,
              left: -16,
              right: -16,
              top: -50,
              width: DEVICE_WIDTH,
            }}
            source={portfolioHeaderIcon}
          />
        </View>
      </React.Fragment>
    );
  }, [portfolio, user, investmentsFilter]);

  const {
    investments,
    companies,
    fundCompanies,
  } = portfolio;

  return (
    <ScreenContainer
      gradientHeight={GRADIENT_HEIGHT}
      reloadHandler={getPortfolioDispatchWrapped}
      reloadWatchers={{
        navigationInReload: true,
        pushNotificationsReload: {
          key: [
            ROUND_COMPLETED,
            PAYMENT_COMPLETED,
          ],
        },
      }}
      contentOffsetTop={0}
    >
      <Space size={10}/>
      {getHeader()}
      <ChipInDialog/>
      <PaymentModal/>
      <Space size={40}/>
      <View>
        <Text
          bold
          fontSize={12}
        >
          {`INVESTED - ${investmentTypes.find(({ value }) => value === investmentsFilter).label.toUpperCase()} PORTFOLIO`}
        </Text>
        <HR/>
        <Space size={12}/>
        {
          investmentsFilter === 'pdfund' && (!fundCompanies || fundCompanies?.length === 0)
            ? noInvestmentsPlaceholder
            : null
        }
        {
          investmentsFilter === 'private' && (!investments || investments?.length === 0)
            ? noInvestmentsPlaceholder
            : null
        }
        {
          (investmentsFilter === 'pdfund' && fundCompanies?.length > 0)
            ? (
              fundCompanies.map(({ company }) => (
                <IndexCompanyRow
                  key={company.id}
                  company={company}
                  invested={
                    formatWithCommaSeparators(company.investedAmount)
                  }
                  estReturn={
                    formatWithCommaSeparators(
                      company.companyDeltaScore
                        ? company.investedAmount * +company.companyDeltaScore.valuedReturn
                        : company.investedAmount,
                    )
                  }
                  onStartupShowNavigate={onStartupShowFundNavigate(company)}
                />
              ))
            )
            : null
        }
        {
          (investmentsFilter === 'private' && investments.length > 0)
            ? (
              Array.from(new Set(investments.map(({ companyId }) => companyId)))
                .map(companyId => companies.find(({ id }) => id === companyId))
                .map((company) => {
                  const invested = arraySum(
                    company.userInvestments
                      .filter(({ userId }) => userId === +user.userId)
                      .map(investment => investment.amount),
                  );

                  const estReturn = company.companyDeltaScore
                    ? invested * +company.companyDeltaScore.valuedReturn
                    : invested;

                  return (
                    <IndexCompanyRow
                      key={company.id}
                      company={company}
                      invested={
                        formatWithCommaSeparators(invested)
                      }
                      estReturn={
                        formatWithCommaSeparators(estReturn)
                      }
                      onStartupShowNavigate={onStartupShowNavigate(company)}
                    />
                  );
                })
            )
            : null
        }
      </View>
    </ScreenContainer>
  );
};

export default PortfolioIndex;
