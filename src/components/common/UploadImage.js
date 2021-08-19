import React from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Svg from 'expo-svg-uri';

import Text from 'components/common/Text';
import withInputLabelContainer from 'containers/InputLabelContainer';
import uploadIcon from 'assets/images/upload.png';
import checkIcon from 'assets/images/check.svg';

const UploadImage = ({
  style,
  borderColor = '#C3D1DD',
  placeholder = 'Upload an Image',
  uri,
  ...TouchableOpacityProps
}) => (
  <TouchableOpacity
    style={[
      styles.container,
      style,
      {
        borderColor: borderColor,
        height: uri ? 130 : 40
      },
    ]}
    {...TouchableOpacityProps}
  >
    {
      uri
        ? (
          <Image
            source={{ uri }}
            style={{
              width: 120,
              height: 120
            }}
          />
        )
        : (
          <Text
            style={[
              style,
            ]}
            color='#C3D1DD'
            fontSize={12}
          >
            {placeholder}
          </Text>
        )
    }
    {
      uri
        ? (
          <Svg
            width="21"
            height="16"
            source={checkIcon}
            style={{
              position: 'absolute',
              right: 12,
            }}
          />
        )
        : (
          <Image
            style={{
              width: 30,
              height: 30,
              position: 'absolute',
              right: 12,
            }}
            source={uploadIcon}
          />
        )
    }
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 0,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 12,
    borderWidth: 1,
    paddingBottom: 10,
    backgroundColor: 'transparent',
    overflow: 'visible',
  },
});

export default withInputLabelContainer(UploadImage);
