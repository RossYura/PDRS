import React from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Platform,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Svg from 'expo-svg-uri';
import { connect } from 'react-redux';

import Text from 'components/common/Text';
import styles from 'components/discovery/StartupShow/styles';
import Space from 'components/common/Space';
import FounderQAContainer from '../FounderQAContainer';
import sendIco from 'assets/images/send.svg';
import StorageService from 'services/storage';
import { StartupSelectors } from 'redux/selectors';
import { submitStartupQuestion } from 'redux/startup/actions';

class QATab extends React.Component {
  state = {
    showFounderQuestionModal: false,
    question: '',
    androidKeyboardMargin: 0,
  };

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  _keyboardDidShow = (e) => {
    if (Platform.OS === 'android') {
      const paddingForKeyboard = 1000;
      this.setState({androidKeyboardMargin: e.endCoordinates.height + paddingForKeyboard});
    }
  }

  _keyboardDidHide = () => {
    this.setState({androidKeyboardMargin: 0});
  }

  handleFounderQuestionSubmit = async () => {
    const { selectedMatch, submitStartupQuestion, navigation } = this.props;
    const {
      company,
    } = selectedMatch;
    const { question: questionText } = this.state;

    if (questionText) {
      try {
        await submitStartupQuestion(company.id, {
          question: questionText,
        });
        showMessage({
          message: 'Question Submitted!',
          description: 'The answer will be listed here when the founders respond',
          type: 'success',
          floating: true,
          duration: 4500,
        });
        this.setState({
          question: '',
        });
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            showMessage({
              message: 'Couldn\'t Authenticate You',
              description: 'Please sign in again',
              type: 'warning',
              floating: true,
              duration: 3000,
            });
            await StorageService.User.remove();
            navigation.navigate('AuthLoading');
          } else {
            showMessage({
              message: 'Question Couldn\'t be Submitted',
              description: 'We have been notified, please try again',
              type: 'warning',
              floating: true,
              duration: 3000,
            });
          }
        }
      }
    }
  };

  render () {
    const { selectedMatch } = this.props;
    const {
      company,
      teamMembers,
      investorQuestions,
    } = selectedMatch;

    let { _textInputRef } = this.props;

    return (
      <View
        onLayout={(event) => this.props.setHeight(2, event.nativeEvent.layout.height + 80)}
        style={{
          paddingBottom: this.state.androidKeyboardMargin
        }}
      >
        <Text
          style={styles.text_big_header}
        >
          FOUNDER Q&A
        </Text>
        {
          teamMembers && (
            <FounderQAContainer
              company={company}
              teamMembers={teamMembers}
              investorQuestions={investorQuestions}
              showModal={() => this.setState({ showFounderQuestionModal: true })}
            />
          )
        }
        <Space size={20}/>
        <TextInput
          onChangeText={i => this.setState({
            question: i,
          })}
          style={styles.askUsInput}
          placeholder='Do you have a question? Ask away'
          value={this.state.question}
          ref={(r) => { _textInputRef.ref = r; }}
        />
        <View
          style={{ flex: 1 }}
        >
          <TouchableOpacity
            onPress={this.handleFounderQuestionSubmit}
            style={{
              width: 24,
              height: 24,
              position: 'absolute',
              right: 16,
              top: -37,
            }}
          >
            <Svg
              source={sendIco}
              width={24}
              height={24}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = {
  submitStartupQuestion,
};
const mapStateToProps = state => ({
  selectedMatch: StartupSelectors.getStartupSelectedMatch(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QATab);
