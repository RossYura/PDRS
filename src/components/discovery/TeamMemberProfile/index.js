import React from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import HR from 'components/common/HR';
import Link from 'components/common/NavLink';
import styles from './styles';
import MemberAvatar from 'components/common/Avatar';
import ScreenContainer from 'containers/ScreenContainer';
import { DEVICE_HEIGHT } from 'styles/metrics';
import Text from 'components/common/Text';
import Space from 'components/common/Space';

class TeamMemberProfile extends React.Component {

  static GRADIENT_HEIGHT = DEVICE_HEIGHT * 1 / 2 < 400 ? 400 : DEVICE_HEIGHT *
    1 / 2;

  render () {
    const { route: { params } } = this.props;
    const { teamMember, webViewerPassedProps } = params;
    const { GRADIENT_HEIGHT } = this.constructor;
    const { firstName, lastName, profilePicture } = teamMember;

    return (
      <ScreenContainer
        navHeader
        gradientHeight={GRADIENT_HEIGHT}
        contentOffsetTop={GRADIENT_HEIGHT}
        ContainerComponent={ScrollView}
        header={(
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <MemberAvatar
              width={200}
              height={200}
              borderRadius={100}
              firstName={firstName}
              lastName={lastName}
              avatarUri={profilePicture}
            />
            <Space size={20}/>
            <Text
              fontSize={35}
              color="#ffffff"
            >
              {`${teamMember.firstName} ${teamMember.lastName}`}
            </Text>
            <Space size={10}/>
            <Text
              fontSize={14}
              color="#ffffff"
            >
              {`${teamMember.jobTitle} (${teamMember.timeCommitment})`}
            </Text>
          </View>
        )}
      >
        <View>
          <View style={styles.positionContainer}>
            <FontAwesome
              name='briefcase'
              size={18}
              color='#bdc3c7'
              style={styles.icon}
            />
            <View style={styles.positionList}>
              {teamMember.teamMemberPositions.filter(
                tmp => tmp.positionType === 'professional')
                .sort((tmp1, tmp2) => tmp1.startYear < tmp2.startYear)
                .map((tmp, i, arr) =>
                  <View key={i}>
                    <Text style={[styles.body, styles.position]}>
                      {tmp.position} at {tmp.organisation}
                    </Text>
                    <Text style={[
                      styles.body,
                      i !== arr.length - 1 && styles.year,
                    ]}
                    >
                      {tmp.startYear} - {tmp.endYear
                      ? tmp.endYear
                      : 'present'}
                    </Text>
                  </View>,
                )
              }
            </View>
          </View>
          <HR/>
          <View style={styles.positionContainer}>
            <FontAwesome
              name='graduation-cap'
              size={18}
              color='#bdc3c7'
              style={styles.icon}
            />
            <View style={styles.positionList}>
              {teamMember.teamMemberPositions.filter(
                tmp => tmp.positionType === 'education')
                .sort((tmp1, tmp2) => tmp1.startYear < tmp2.startYear)
                .map((tmp, i, arr) =>
                  <View key={i}>
                    <Text style={[styles.body, styles.position]}>
                      {tmp.position} at {tmp.organisation}
                    </Text>
                    <Text style={[
                      styles.body,
                      i !== arr.length - 1 && styles.year,
                    ]}
                    >
                      {tmp.startYear} - {tmp.endYear
                      ? tmp.endYear
                      : 'present'}
                    </Text>
                  </View>,
                )
              }
            </View>
          </View>
          <HR/>
          <View style={styles.positionContainer}>
            <FontAwesome
              name='quote-right'
              size={18}
              color='#bdc3c7'
              style={styles.icon}
            />
            <View style={styles.positionList}>
              <Text style={[styles.body, styles.description]}>
                {teamMember.description}
              </Text>
            </View>
          </View>
          <HR/>
          <View style={styles.positionContainer}>
            <FontAwesome
              name='link'
              size={18}
              color='#bdc3c7'
              style={styles.icon}
            />
            <View
              style={[
                styles.positionList,
                styles.socialContainer,
              ]}
            >
              {!!teamMember.angellistUrl && (
                <Link
                  to="WebViewer"
                  params={{
                    href: teamMember.angellistUrl,
                    webViewerPassedProps,
                  }}
                  style={{
                    marginRight: 10,
                  }}
                >
                  AngelList Profile
                </Link>
              )}
              {!!teamMember.linkedinUrl && (
                <Link
                  style={{
                    marginRight: 10,
                  }}
                  to="WebViewer"
                  params={{
                    href: teamMember.linkedinUrl,
                    webViewerPassedProps,
                  }}
                >
                  LinkedIn Profile
                </Link>
              )}
            </View>
          </View>
          <HR/>
          <View style={styles.expertiseContainer}>
            <FontAwesome
              name='wrench'
              size={18}
              color='#bdc3c7'
              style={styles.icon}
            />
            <View style={styles.expertiseContent}>
              {teamMember.expertises.map(tme =>
                <View key={tme.id} style={styles.expertiseTag}>
                  <Text style={styles.expertiseTagText}>
                    {tme.name}
                  </Text>
                </View>,
              )}
            </View>
          </View>
        </View>
      </ScreenContainer>
    );
  }
}

export default TeamMemberProfile;
