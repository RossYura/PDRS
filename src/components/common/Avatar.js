import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

import Text from 'components/common/Text';
import colors from 'styles/colors';

const Avatar = ({
  firstName,
  lastName,
  avatarUri,
  width = 40,
  height = 40,
  borderRadius = 20,
  style: customStyle
}) =>
  avatarUri
    ? (
      <Image
        style={[
          styles.profilePic,
          {
            width,
            height,
            borderRadius,
          },
          customStyle,
        ]}
        source={{ uri: avatarUri }}
        resizeMode='cover'
      />
    ) : (
      <View
        style={[
          styles.profilePic,
          {
            justifyContent: 'center',
            alignItems: 'center',
            width,
            height,
            borderRadius,
          },
          customStyle,
        ]}
      >
        { firstName && lastName &&
          <Text
            style={[
              styles.iniText,
              {
                fontSize: height / 4,
              },
            ]}
          >
            {
              `${firstName.substring(
                0,
                1,
              )} ${lastName.substring(0, 1)}`
            }
          </Text>
        }
      </View>
    );

const styles = StyleSheet.create({
  iniText: {
    color: '#ffffff',
  },
  profilePic: {
    backgroundColor: colors.placeholderGray,
  },
});

export default Avatar;