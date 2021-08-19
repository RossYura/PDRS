import React from 'react';
import {
  Image,
  View,
} from 'react-native';
import SvgUri from 'expo-svg-uri';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Text from 'components/common/Text';
import colors from 'styles/colors';
import Space from 'components/common/Space';
import {
  formatWithDotSeparators,
  formatWithNumericalAbbreviationThousands,
  arraySum,
} from 'utils/number';
import Duration from 'components/common/Duration';
import { conditionalSwitch } from 'utils/common';
import { isPaymentWaitingForConfirmation } from 'components/portfolio/PortfolioIndex/utils';
import statusIcon from 'assets/images/status.svg';
import { pipe } from 'utils/fp';
import Button from 'components/common/Button';
import Carousel from 'components/common/Carousel';
import { showModal } from 'redux/common/actions';
import { getCompaniesWithPendingInvestmentsCollectionState } from 'redux/companies/selectors';
import withUser from 'HOCs/withUser';
import { getRefCode } from 'components/discovery/StartupIndex';

const StartupPendingCard = ({ company, pendingCompanies, showModal, user, reloadHandler }) => {

  return (
    <React.Fragment>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {
          conditionalSwitch(
            {
              condition: isPaymentWaitingForConfirmation(company),
              result: (
                <React.Fragment>
                  <SvgUri
                    source={statusIcon}
                    fill={colors._gray}
                  />
                  <Space size={10} horizontal/>
                  <Text
                    fontSize={15}
                  >
                    Waiting for payment confirmation
                  </Text>
                </React.Fragment>
              ),
            },
            {
              condition: conditionalSwitch.CONDITIONS.DEFAULT,
              result: null,
            },
          )
        }
      </View>
      <Space size={12}/>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
        }}
      >
        <Image
          source={{ uri: company.companyLogo }}
          style={{
            width: 40,
            height: 40,
          }}
        />
        <Space horizontal size={8}/>
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
            }}
          >
            <View>
              <Text
                fontSize={17}
                color={colors._darkblue}
                style={{
                  marginBottom: 2,
                }}
              >
                {company.name}
              </Text>
              <Text
                fontSize={12}
              >
                {
                  company.keywords
                    .map(item => item.name)
                    .join(', ')
                }
              </Text>
            </View>
            <View>
              <Text
                fontSize={12}
                style={{
                  marginTop: 2,
                  marginBottom: 4,
                  textAlign: 'right',
                }}
              >
                Committed
              </Text>
              <Text
                fontSize={17}
                color={colors._deepblue}
                style={{
                  textAlign: 'right',
                }}
              >
                {
                  `€${pipe(
                    arraySum(company.userInvestments.map(({ amount }) => amount)),
                    sum => formatWithDotSeparators(sum),
                  )}`
                }
              </Text>
            </View>
          </View>
          <Space size={11}/>
          <Space size={4}/>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'flex-end',
          flex: 1,
        }}
      >
        {
          !isPaymentWaitingForConfirmation(company) && (
            <Button
              width={126}
              height={27}
              onPress={() => showModal('payment', {
                company,
                amount: arraySum(company.userInvestments.map(({ amount }) => amount)),
                investingAs: user.investmentEntities
                  .find(({ id }) => company.userInvestments[0].investmentEntityId ===
                    id)
                  .name,
                refCode: getRefCode(company),
                reloadHandler,
              })}
              text="Go to payment"
              customTextStyles={{
                fontSize: 10,
              }}
              style={{
                position: 'absolute',
                bottom: -5,
                right: Carousel.getCardWidth(pendingCompanies) / 2 - 63 -
                  16,
              }}
            />
          )
        }
        <Duration
          endDate={company.endDate}
        />
        <Text
          fontSize={12}
        >
          {`€${formatWithNumericalAbbreviationThousands(company.requiredFundingAmount)}`}
        </Text>
      </View>
    </React.Fragment>
  );
};

const mapDispatchToProps = {
  showModal,
};

const mapStateToProps = (state) => ({
  pendingCompanies: getCompaniesWithPendingInvestmentsCollectionState(state),
});

export default compose(
  withUser,
  connect(mapStateToProps, mapDispatchToProps),
)(StartupPendingCard);
