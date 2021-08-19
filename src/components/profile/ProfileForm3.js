import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as Amplitude from 'expo-analytics-amplitude';

import { submitExpertiseProfile, getKeywords } from 'redux/profile/actions';
import { ProfileSelectors } from 'redux/selectors';
import SegmentedControls, { styles as segmentedControlStyles } from 'components/common/SegmentedControls';
import { isEven } from 'utils/number';
import colors from 'styles/colors';
import { enableLoader, disableLoader } from 'redux/common/actions';
import ScreenContainer from 'containers/ScreenContainer';
import Space from 'components/common/Space';
import WizardSteps from 'components/common/WizardSteps';
import Button from 'components/common/Button';
import Text from 'components/common/Text';
import { styleNames } from 'utils/ui';
import { navigate } from 'services/navigation/actions';
import withUser from 'HOCs/withUser';
import { AMP_USER_SIGN_UP_KEYWORDS_PAGE } from 'static/constants/amplitudeEventTypes';

class ProfileForm3 extends React.Component {
  constructor (props) {
    super(props);

    const { user } = props;
    this.state = {
      selectedKeywords: user.keywords?.length > 0
        ? user.keywords.map(({ id }) => id)
        : [],
    };
  }

  async componentDidMount () {
    //analytics
    Amplitude.logEvent(AMP_USER_SIGN_UP_KEYWORDS_PAGE);

    const { getKeywords } = this.props;

    getKeywords();
  }

  formInvalid = () => {
    return (
      this.state.selectedKeywords.length < 3
    );
  };

  handleSubmit = async () => {
    const { submitExpertiseProfile } = this.props;

    submitExpertiseProfile({
      keywords: this.state.selectedKeywords,
    });
  };

  render () {
    const { selectedKeywords } = this.state;
    const { keywords } = this.props;

    const keywordItems = keywords.map((x) => {
      return {
        id: x.id,
        selected: selectedKeywords.includes(x.id),
        title: x.name,
      };
    });

    return (
      <ScreenContainer
        navHeader
        navHeaderBackHandler={() => navigate('ProfileForm2')}
        gradientHeight={240}
        contentOffsetTop={220}
        header={(
          <React.Fragment>
            <Text
              fontSize={36}
              color="#ffffff"
              textAlign="center"
            >
              Your Expertise
            </Text>
            <Space size={30}/>
            <WizardSteps step={2}/>
          </React.Fragment>
        )}
      >

        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <Text
              fontSize={12}
            >
              AREA OF INTERESTS
            </Text>
            <Space size={10}/>
            <Text
              fontSize={15}
              color={colors._darkblue}
            >
              Tell us what describes you best (Pick at least 3)
            </Text>
            <Space size={30}/>
            <SegmentedControls
              direction="row"
              renderOption={(option, selected) => {
                const index = keywordItems.findIndex(
                  ({ id }) => id === option.id);
                return (
                  <View
                    style={[
                      styles.multiSegmentedControlsOptionSubView,
                      {
                        borderLeftWidth: isEven(index) ? 1 : 0,
                        borderTopWidth: (index === 0 || index === 1) ? 1 : 0,
                        borderTopRightRadius: index === 1 ? 10 : 0,
                        borderTopLeftRadius: index === 0 ? 10 : 0,
                        borderBottomRightRadius: index === keywordItems.length -
                        1
                          ? 10
                          : 0,
                        borderBottomLeftRadius:
                          (index === keywordItems.length - 2 && isEven(index))
                          ||
                          (index === keywordItems.length - 1 && isEven(index))
                            ? 10
                            : 0,
                      },
                    ]}
                  >
                    <Text
                      textAlign="center"
                      color={'#00B9D1'}
                      style={styleNames({
                        style: {
                          color: '#ffffff',
                        },
                        condition: selected,
                      })}
                    >
                      {option.title}
                    </Text>
                  </View>
                );
              }}
              testOptionEqual={(
                selectedValue,
                option,
              ) => selectedValue.includes(
                option.id)}
              extractText={option => option.title}
              options={keywordItems}
              onSelection={({ id }) => this.setState({
                selectedKeywords: selectedKeywords.includes(id)
                  ? selectedKeywords.filter(value => value !== id)
                  : Array.from(new Set(selectedKeywords.concat(id))),
              })}
              selectedOption={selectedKeywords}
              containerStyle={[
                segmentedControlStyles.segmentedControlContainer,
                styles.multiSegmentedControlsContainer,
              ]}
              optionContainerStyle={[
                segmentedControlStyles.segmentedControlOptionContainer,
                styles.multiSegmentedControlsOptionsContainer,
              ]}
              selectedBackgroundColor={'#00B9D1'}
            />
            <Space size={32}/>
            <Button
              text="Continue"
              loaderKey="authSubmitting"
              onPress={this.handleSubmit}
              disabled={this.formInvalid()}
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

const styles = StyleSheet.create({
  multiSegmentedControlsOptionsContainer: {
    minWidth: 160,
    height: 60,
    borderWidth: 0,
    paddingHorizontal: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  multiSegmentedControlsContainer: {
    borderRadius: 10,
    flexWrap: 'wrap',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderWidth: 0,
  },
  multiSegmentedControlsOptionSubView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    borderColor: colors._blue,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
});

const mapDispatchToProps = {
  enableLoader,
  disableLoader,
  getKeywords,
  submitExpertiseProfile,
};

const mapStateToProps = state => ({
  keywords: ProfileSelectors.keywords(state),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withUser,
)(ProfileForm3);
