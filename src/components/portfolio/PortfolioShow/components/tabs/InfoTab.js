import React from 'react';
import { View } from 'react-native';
import SvgUri from 'expo-svg-uri';
import withProps from 'recompose/withProps';

import { useSelector } from 'react-redux';
import Text from 'components/common/Text';
import Space from 'components/common/Space';
import CardOrigin from 'components/common/Card';
import TeamMembers from 'components/common/TeamMembers';
import pinIcon from 'assets/images/pin.svg';
import globeIco from 'assets/images/globe.svg';
import { showModal as showModalActionCreator } from 'redux/common/actions';
import contractIco from 'assets/images/contract.svg';
import colors from 'styles/colors';
import AnchorInner from 'components/common/AnchorInner';
import Anchor from 'components/common/Anchor';
import { getCompanyUpdateLogsWithSortedUpdates } from 'redux/portfolio/selectors';
import useDispatchWrap from 'hooks/useDispatchWrap';

const InfoTabCard = withProps(props => ({
  selfOffsetTop: 5,
  style: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    ...props.style,
  },
  ...props,
}))(CardOrigin);

const InfoTab = ({
  webViewerPassedProps,
  setHeight,
}) => {
  const { company } = useSelector(getCompanyUpdateLogsWithSortedUpdates);
  const [showModal] = useDispatchWrap(showModalActionCreator);

  return (
    <View
      style={{
        alignItems: 'center',
      }}
      onLayout={(event) => setHeight(2, event.nativeEvent.layout.height + 50)}
    >
      <InfoTabCard
        ContainerComponent={View}
      >
        <Text
          fontSize={12}
          color={colors._darkblue}
          fontWeight={600}
        >
          VALUE PROPOSITION
        </Text>
        <Space size={3}/>
        <Text
          fontSize={15}
          color={colors._darkviolet}
        >
          {company.summary}
        </Text>
      </InfoTabCard>
      <InfoTabCard>
        <Text
          fontSize={12}
          fontWeight={600}
        >
          FOUNDERS
        </Text>
        <Space size={19}/>
        <TeamMembers
          teamMembers={company.teamMembers}
          webViewerPassedProps={webViewerPassedProps}
        />
      </InfoTabCard>
      <Space size={10}/>
      <InfoTabCard
        ContainerComponent={View}
      >
        <Text
          fontSize={12}
          fontWeight={600}
        >
          CONTACT
        </Text>
        <Space size={10}/>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <SvgUri source={globeIco} fill={colors._darkblue}/>
          <Space horizontal size={10}/>
          <AnchorInner
            href={company.websiteUrl}
            fontSize={15}
            color={colors._darkviolet}
            returnRoute={webViewerPassedProps.goBackUrl}
            returnRouteParams={webViewerPassedProps.params}
          >
            {company.websiteUrl}
          </AnchorInner>
        </View>
        <Space size={22}/>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <SvgUri source={pinIcon} style={{ marginLeft: 3, marginRight: 3 }} fill={colors._darkblue}/>
          <Space horizontal size={10}/>
          <Anchor
            href={`https://www.google.com/maps/search/?api=1&query=${company.addressStreetAddress}+${company.addressCity}+${company.addressCountry}`}
            fontSize={15}
            color={colors._darkviolet}
          >
            {`${company.addressStreetAddress}, ${company.addressCity}, ${company.addressCountry}`}
          </Anchor>
        </View>
      </InfoTabCard>
      <Space size={10}/>
      <InfoTabCard
        height={103}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 2,
          borderColor: 'transparent',
        }}
        onPress={() => showModal(
          'pdfViewer',
          {
            local: false,
            pdf: company.companyConvertibleLoanAgreement,
          },
        )}
      >
        <SvgUri
          fill={colors._darkblue}
          source={contractIco}
          style={{
            marginRight: 20,
            position: 'absolute',
            left: 16,
            top: 16,
            bottom: 16,
          }}
        />
        <Text
          fontSize={15}
          color={colors._darkviolet}
        >
          Convertible Loan.PDF
        </Text>
      </InfoTabCard>
    </View>
  );
};

export default InfoTab;