import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import SvgUri from 'expo-svg-uri';

import Text from 'components/common/Text';
import colors from 'styles/colors';
import cameraIcon from 'assets/images/camera.svg';

class Avatar extends React.Component {

  static defaultProps = {
    width: 40,
    height: 40,
    borderRadius: 20,
  };

  constructor (props) {
    super(props);

    this.state = {
      avatarUri: props.source,
    };
  }

  _pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      await this.props.onSubmit(result);
      this.setState({ avatarUri: result.uri });
    }
  };

  handleEdit = async () => {
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== 'granted') {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (newPermission.status === 'granted') {
        this._pickImage();
      } else {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    } else {
      this._pickImage();
    }
  };

  render () {
    const {
      firstName,
      lastName,
      width = 40,
      height = 40,
      borderRadius = 20,
      style: customStyle,
    } = this.props;

    const { avatarUri } = this.state;

    return (
      <TouchableOpacity
        onPress={this.handleEdit}
        style={{ overflow: 'visible' }}
      >
        {
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
                {
                  (firstName && lastName)
                    ? (
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
                    )
                    : null
                }
              </View>
            )
        }
        <View onLayout={(event) => this.setState({
          borderRadius: event.nativeEvent.layout.height / 2,
        })}
        style={{
          position: 'absolute',
          right: -8.5,
          top: height / 2 - 9,
          borderWidth: 1,
          borderColor: '#ffffff',
          borderRadius: Platform.OS === 'ios'
            ? '50%'
            : this.state.borderRadius ? this.state.borderRadius : 11,
          overflow: 'visible',
          padding: 4,
          backgroundColor: '#898888',
        }}
        >
          <SvgUri
            source={cameraIcon}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  iniText: {
    color: '#ffffff',
  },
  profilePic: {
    backgroundColor: colors.placeholderGray,
    borderWidth: 1,
    borderColor: '#ffffff',
  },
});

export default Avatar;