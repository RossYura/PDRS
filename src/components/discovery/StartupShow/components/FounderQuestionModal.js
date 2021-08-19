import React from 'react';
import { View, Modal, TouchableWithoutFeedback, TouchableOpacity, Keyboard, Text, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';

import commonStyles from 'styles';

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    flex: 1,
    marginHorizontal: 32,
    marginTop: 128,
    marginBottom: 32,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
    borderRadius: 15,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#ffffff'
  },
  title: {
    fontSize: 22, 
    fontWeight: '200',
    textAlign: 'center',
    marginBottom: 24
  },
  body: {
    fontSize: 16, 
    fontWeight: '400',
    color: '#4e5961',
    marginBottom: 16
  },
  input: {
    height: 100,
    borderColor: '#E0E0E0',
    color: '#4e5961',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    fontSize: 18,
    marginVertical: 5
  },
  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

class FounderQuestionModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionText: ''
    };
  }

  handleStartupQuestionSubmit = () => {
    let { submit, hide } = this.props;
    hide();
    submit(this.state.questionText);
  }

  render() {
    let { visible, company, hide } = this.props;
    let { questionText } = this.state;

    return (
      <Modal
        animationType="slide"
        onShow={() => this.setState({ questionText: '' })}
        transparent={true}
        visible={visible}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={ styles.content }>
              <Text style={ styles.title }>Ask {company.name} a Question</Text>
              <Text style={styles.body}>
                We will send you a notification when they answer
              </Text>
              <TextInput
                style={ styles.input }
                onChangeText={(questionText) => this.setState({ questionText })}
                value={questionText}
                placeholder="How do you plan to..."
                multiline={true}
                numberOfLines={4}
              />

              {/* button group */}
              <View style={ styles.btnGroup }>
                <TouchableOpacity onPress={hide} style={ commonStyles.buttonRound}>
                  <FontAwesome
                    name={'times'}
                    size={35}
                    color='#e74c3c'
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={questionText.length < 10}
                  style={questionText.length < 10 ? commonStyles.buttonRoundDisabled : commonStyles.buttonRound}
                  onPress={this.handleStartupQuestionSubmit}
                >
                  <FontAwesome
                    name={'check'}
                    size={35}
                    color='#56BA93'
                  />
                </TouchableOpacity>  
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

FounderQuestionModal.propTypes = {
  visible: PropTypes.bool,
  company: PropTypes.object,
  hide: PropTypes.func,
  submit: PropTypes.func
};

export default FounderQuestionModal;