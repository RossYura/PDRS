import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView, 
  Text,
} from 'react-native';

import globalStyles from 'styles';
import Button from 'components/common/Button';
import WizardSteps from 'components/common/WizardSteps';

export default class ProfileScreenContainer extends React.Component {

  static ScreenContainerHeader = ({ title, subtitle, step }) => (
    <React.Fragment>
      <View style={{ height: 8 }}/>
      <Text style={globalStyles.headerText}>
        {title}
      </Text>
      <View style={{ height: 10 }}/>
      <WizardSteps step={step}/>
      <View style={{ height: 15 }}/>
      {
        typeof subtitle === 'string'
          ?
          (
            <Text style={globalStyles.bodyText}>
              {subtitle}
            </Text>
          )
          : subtitle
      }
      <View style={{ height: 12 }}/>
    </React.Fragment>
  );

  state = {
    keyboardVisible: false,
  };

  async componentDidMount() {
    // eslint-disable-next-line no-undef

    this.constructor.keyboardWillShowSub = Keyboard.addListener(
      'keyboardWillShow', this.onKeyboardShow);
    this.constructor.keyboardWillHideSub = Keyboard.addListener(
      'keyboardWillHide', this.onKeyboardHide);
  }

  onKeyboardShow = () => {
    this.setState({
      keyboardVisible: true,
    });
  };

  onKeyboardHide = () => {
    this.setState({
      keyboardVisible: false,
    });
  };

  componentWillUnmount() {
    this.constructor.keyboardWillShowSub.remove();
    this.constructor.keyboardWillHideSub.remove();
  }

  render() {
    const {
      zIndexOrigin = 0,
      transparentFooter = true,
      submitText,
      loaderKey,
      onSubmit,
      disabled,
      children,
      header,
      scrollView = true,
    } = this.props;

    const BodyWrapper = scrollView ? ScrollView : View;
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={[
          {
            zIndex: zIndexOrigin + 1,
            flex: 1
          },
        ]}
      >
        {
          header && (
            <View
              style={[
                styles.header,
                {
                  zIndex: zIndexOrigin + 3,
                },
              ]}
            >
              {header}
            </View>
          )
        }
        <BodyWrapper
          style={[
            styles.bodyWrapperScroll,
            {
              zIndex: zIndexOrigin + 1,
            },
          ]}
        >
          {children}
        </BodyWrapper>
        <View
          style={{
            height: this.state.keyboardVisible
              ? 0
              : 100,
          }}
        />
        <View
          style={[
            this.state.keyboardVisible
              ? styles.footerButtonContainerStatic
              : styles.footerButtonContainerAbsolute,
            {
              zIndex: disabled && transparentFooter
                ? zIndexOrigin
                : zIndexOrigin + 2,
            },
          ]}
        >
          <Button
            loaderKey={loaderKey}
            text={submitText}
            onPress={onSubmit}
            disabled={disabled}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export const styles = StyleSheet.create({
  header: {
    overflow: 'hidden',
    backgroundColor: '#FBFBFB',
  },
  bodyWrapperScroll: {
    overflow: 'visible',
  },
  footerButtonContainerAbsolute: {
    backgroundColor: 'transparent',
    paddingBottom: 35,
    position: 'absolute',
    bottom: 0,
    right: 25,
    left: 25,
  },
  footerButtonContainerStatic: {
    paddingVertical: 10,
    backgroundColor: 'transparent',
    position: 'relative',
  },
});

