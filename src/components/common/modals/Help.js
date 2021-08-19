import React, { useState } from 'react';
import SvgUri from 'expo-svg-uri';
import {
  TextInput as TextInputOrigin,
  TouchableOpacity,
  View,
} from 'react-native';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import dialogIcon from 'assets/images/dialog.svg';
import {
  showModal,
  hideModal,
} from 'redux/common/actions';
import Text from 'components/common/Text';
import colors from 'styles/colors';
import NetworkService from 'services/network';
import sendIcon from 'assets/images/send.svg';
import withUser from 'HOCs/withUser';
import Space from 'components/common/Space';
import Button from 'components/common/Button';

const HelpPopUpContent = compose(
  connect(
    null,
    {
      showModal,
      hideModal,
    },
  ),
  withUser,
)(({ showModal, hideModal, user, buttonsPopUpTitle, buttons }) => {
  const [helpText, setHelpText] = useState('');
  const [buttonsModalContent, setButtonsModalContent] = useState(buttonsPopUpTitle);

  if (buttonsModalContent) {
    return (
      <React.Fragment>
        <Text
          bold
          color={colors._darkblue_v2}
          textAlign="center"
        >
          {buttonsPopUpTitle}
        </Text>
        <Space size={20}/>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          {
            buttons.map((button, index) =>
              <View
                key={index}
              >
                {button}
              </View>,
            )
          }
          <Button
            onPress={() => setButtonsModalContent(null)}
            customTextStyles={{
              fontSize: 13,
            }}
            style={[
              {
                width: 120,
                height: 33,
                backgroundColor: colors._gray,
              },
            ]}
          >
            I have a question
          </Button>
        </View>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Text
        fontWeight="bold"
        color={colors._darkblue_v2}
        textAlign="center"
      >
        Send your message to Pitchdrive
      </Text>
      <Space size={20}/>
      <TextInputOrigin
        multiline
        value={helpText}
        underlineColorAndroid={'transparent'}
        onChangeText={text => setHelpText(text)}
        style={{
          padding: 5,
          backgroundColor: '#F7F7F9',
          borderWidth: 1,
          borderColor: colors._lightgray,
          minHeight: 200,
          textAlignVertical: 'top',
        }}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 36,
          right: 40,
        }}
        onPress={async () => {
          await NetworkService.User()
            .helpRequest(user.id, {
              text: helpText,
            });

          hideModal('tipModal');
          showModal('fab', { content: 'Message send' });
        }}
      >
        <SvgUri source={sendIcon}/>
      </TouchableOpacity>
    </React.Fragment>
  );
});

const Help = ({ showModal, style, buttonsPopUpTitle, buttons }) => {
  return (
    <TouchableOpacity
      style={[
        {
          position: 'absolute',
          top: -25,
          right: 8,
          borderColor: '#ffffff',
          backgroundColor: 'transparent',
          borderRadius: 10,
          width: 58,
          height: 28,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        style,
      ]}
      onPress={() => showModal('tipModal', {
        content: <HelpPopUpContent
          buttonsPopUpTitle={buttonsPopUpTitle}
          buttons={buttons}
        />,
      })}
    >
      <SvgUri source={dialogIcon}/>
      <Text
        color="#ffffff"
        fontSize={12}
      >
        Help
      </Text>
    </TouchableOpacity>
  );
};

export default compose(
  connect(
    null,
    {
      showModal,
    },
  ),
)(Help);