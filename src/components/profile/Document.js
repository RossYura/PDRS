import React from 'react';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import UploadImage from 'components/common/UploadImage';

class Document extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      uri: props.uri,
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
      this.props.onPress(result.base64);
      this.setState({
        uri: result.uri,
      });
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
    const { label } = this.props;
    const { uri } = this.state;

    return (
      <UploadImage
        onPress={this.handleEdit}
        label={label}
        uri={uri}
      />
    );
  }
}

export default Document;