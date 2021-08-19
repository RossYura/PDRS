import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import compose from 'recompose/compose';
import { useNavigation } from '@react-navigation/native';

import Avatar from 'components/common/Avatar';
import Text from 'components/common/Text';
import withTheme from 'HOCs/withTheme';

const TeamMembers = ({ teamMembers, webViewerPassedProps, textStyles = {} }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {teamMembers.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.founder}
          onPress={() => navigation.navigate(
            'TeamMemberProfile',
            { teamMember: item, webViewerPassedProps },
          )}
        >
          <Avatar
            firstName={item.firstName}
            lastName={item.lastName}
            avatarUri={item.profilePicture}
          />
          <View style={styles.info}>
            <Text
              style={[
                styles.name,
                textStyles.name,
              ]}
            >
              {`${item.firstName} ${item.lastName}`}
            </Text>
            <Text
              style={[
                styles.job,
                textStyles.job,
              ]}
            >
              {item.jobTitle}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  founder: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 14,
    color: '#393C3F',
  },
  job: {
    marginTop: 5,
    fontSize: 10,
    color: 'rgba(57, 60, 63, 0.5)',
  },
});

export default compose(
  withTheme.describe({
    light: ({ textStyles = {} }) => ({
      textStyles: {
        name: {
          color: '#ACBCC9',
          ...textStyles.name,
        },
        job: {
          color: '#ffffff',
          ...textStyles.job,
        },
      },
    }),
  }),
)(TeamMembers);
