import React from 'react';
import {
  StyleSheet,
  ScrollView, 
  SafeAreaView,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as Amplitude from 'expo-analytics-amplitude';

import SegmentedControls, { styles as segmentedControlsStyles } from 'components/common/SegmentedControls';
import { submitQuiz } from 'redux/profile/actions';
import { UserSelectors } from 'redux/selectors';
import { enableLoader, disableLoader } from 'redux/common/actions';
import ScreenContainer from 'containers/ScreenContainer';
import Space from 'components/common/Space';
import WizardSteps from '../common/WizardSteps';
import Text from 'components/common/Text';
import FormHeaderDivider from './components/FormHeaderDivider';
import Button from 'components/common/Button';
import withUser from 'HOCs/withUser';
import { navigate } from 'services/navigation/actions';
import { AMP_USER_SIGN_UP_QUIZ_PAGE } from 'static/constants/amplitudeEventTypes';

const quizOptions1 = [
  {
    label: 'a. No one will be liable to pay me back the amount I invested, and my investment will be lost.',
    value: '1',
  },
  {
    label: 'b. The entrepreneurs who founded the business will be personally liable to pay me back the amount I invested.',
    value: '2',
  },
  {
    label: 'c. The broker or finder who arranged the transaction will be liable to pay me back the amount I invested.',
    value: '3',
  },
];

const quizOptions2 = [
  {
    label: 'a. I will be able to surrender my shares to the company, and it will give me my money back.',
    value: '1',
  },
  {
    label: 'b. I will be able to sell my shares on a stock exchange at any time.',
    value: '2',
  },
  {
    label: 'c. I may not be able to sell my shares unless the business is bought by another company or floats on a stock exchange, and even if the businesses is bought or floats, a sale is not guaranteed.',
    value: '3',
  },
];

const quizOptions3 = [
  {
    label: 'a. Do not pay dividends to their investors.',
    value: '1',
  },
  {
    label: 'b. Begin paying dividends to their investors within a year after the investment is made.',
    value: '2',
  },
  {
    label: 'c. Begin paying dividends to their investors immediately after the investment is made.',
    value: '3',
  },
];

class ProfileForm2 extends React.Component {
  constructor (props) {
    super(props);

    const { user } = this.props;
    this.state = user.investorQuizComplete
      ? {
        quiz1: '1',
        quiz2: '3',
        quiz3: '1',
      }
      : {
        quiz1: '0',
        quiz2: '0',
        quiz3: '0',
      };
  }

  componentDidMount () {
    //analytics
    Amplitude.logEvent(AMP_USER_SIGN_UP_QUIZ_PAGE);
  }

  handleSubmit = async () => {
    const { submitQuiz } = this.props;

    if (Object.values(this.state)
      .join('') !== '131') {
      showMessage({
        message: 'Check your answers',
        description: 'Remember to read the questions carefully',
        type: 'warning',
        floating: true,
        duration: 3000,
      });
    } else {
      submitQuiz();
    }
  };

  formFilled = () => Object.values(this.state)
    .every(value => +value);

  onInputChange = (field, extractor) => value => this.setState({
    [field]: extractor ? extractor(value) : value,
  });

  render () {
    const {
      quiz1,
      quiz2,
      quiz3,
    } = this.state;

    return (
      <ScreenContainer
        navHeader
        navHeaderBackHandler={() => navigate('ProfileForm1')}
        gradientHeight={240}
        contentOffsetTop={220}
        header={(
          <React.Fragment>
            <Text
              fontSize={36}
              color="#ffffff"
              textAlign="center"
            >
              Investment Quiz
            </Text>
            <Space size={30}/>
            <WizardSteps step={1}/>
          </React.Fragment>
        )}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <FormHeaderDivider
              fontSize={15}
              HRbottom={false}
              HRtop={false}
            >
              1. If I invest in the equity of an early-stage or growth-focussed
              business, and the business fails:
            </FormHeaderDivider>
            <SegmentedControls
              direction="column"
              options={quizOptions1}
              onSelection={this.onInputChange('quiz1', data => data.value)}
              selectedOption={quiz1}
              optionContainerStyle={[
                segmentedControlsStyles.segmentedControlOptionContainer,
                styles.optionContainer,
              ]}
              containerStyle={[
                segmentedControlsStyles.segmentedControlContainer,
                styles.segmentedControl,
              ]}
            />
            <FormHeaderDivider
              fontSize={15}
              HRbottom={false}
              HRtop={false}
            >
              2. If I invest in the equity of an early-stage or growth-focussed
              business, and I decide I want my money back:
            </FormHeaderDivider>
            <SegmentedControls
              direction="column"
              options={quizOptions2}
              onSelection={this.onInputChange('quiz2', data => data.value)}
              selectedOption={quiz2}
              optionContainerStyle={[
                segmentedControlsStyles.segmentedControlOptionContainer,
                styles.optionContainer,
                {
                  height: 150,
                },
              ]}
              containerStyle={[
                segmentedControlsStyles.segmentedControlContainer,
                styles.segmentedControl,
              ]}
            />
            <FormHeaderDivider
              fontSize={15}
              HRbottom={false}
              HRtop={false}
            >
              3. Early-stage and growth-focussed businesses generally:
            </FormHeaderDivider>
            <SegmentedControls
              direction="column"
              options={quizOptions3}
              onSelection={this.onInputChange('quiz3', data => data.value)}
              selectedOption={quiz3}
              optionContainerStyle={[
                segmentedControlsStyles.segmentedControlOptionContainer,
                styles.optionContainer,
              ]}
            />
            <Space size={32}/>
            <Button
              text="Continue"
              loaderKey="authSubmitting"
              onPress={this.handleSubmit}
              disabled={!this.formFilled()}
              style={{
                elevation: 2,
                borderColor: 'transparent',
              }}
            />
            <Space size={30}/>
          </ScrollView>
        </SafeAreaView>
      </ScreenContainer>
    );
  }
}

export const styles = StyleSheet.create({
  segmentedControl: {
    marginBottom: 30,
  },
  optionContainer: {
    alignItems: 'flex-start',
    height: 100,
    paddingVertical: 20,
  },
});

const mapDispatchToProps = {
  enableLoader,
  disableLoader,
  submitQuiz,
};

const mapStateToProps = state => ({
  loading: UserSelectors.loading(state),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withUser,
)(ProfileForm2);
