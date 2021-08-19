import React from 'react';
import {
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import * as Localization from 'expo-localization';
import PhoneInput from 'react-native-phone-input';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Amplitude from 'expo-analytics-amplitude';

import WizardSteps from 'components/common/WizardSteps';
import DatePicker from 'components/common/DatePicker';
import { submitGeneralProfile } from 'redux/profile/actions';
import { UserSelectors } from 'redux/selectors';
import Select from 'components/common/Select';
import SegmentedControls from 'components/common/SegmentedControls';
import TextInput from 'components/common/TextInput';
import Document from '../Document';
import { countries, nationalities } from 'static/constants/nationalities';
import typesOfDocument from 'static/constants/userDocuments';
import globalStyles from 'styles';
import { disableLoader, enableLoader } from 'redux/common/actions';
import colors from 'styles/colors';
import ScreenContainer from 'containers/ScreenContainer';
import FormHeaderDivider from '../components/FormHeaderDivider';
import identityOptions from 'static/constants/userIdentities';
import Text from 'components/common/Text';
import Space from 'components/common/Space';
import Button from 'components/common/Button';
import SwitchWithText from 'components/common/SwitchInput';
import withUser from 'HOCs/withUser';
import ensurePreload from 'HOCs/ensureProps';
import { pipe } from 'utils/fp';
import { userToState, initialState, stateToUser } from './normalizers';
import { conditionalSwitch } from 'utils/common';
import { hideModal } from 'redux/common/actions';
import { MODAL_NAME as DATEPICKER_MODAL_NAME } from 'components/common/modals/DatepickerModalIOS';
import { AMP_USER_SIGN_UP_MAIN_INFORMATION_PAGE } from 'static/constants/amplitudeEventTypes';

class ProfileForm1 extends React.Component {
  constructor (props) {
    super(props);

    const { user } = props;
    this.state = user
      ? userToState(user)
      : initialState;
  }

  getRegion = async () => {
    let region = 'US';

    if (Platform.OS === 'ios' && Localization.region) {
      region = Localization.region;
    } else if (Platform.OS === 'android') {
      const androidRegion = await Localization.getLocalizationAsync();
      if (androidRegion) {
        region = androidRegion.locale.split('-')[1];
      }
    }

    return region;
  };

  static getDerivedStateFromProps = (props, state) => {

    return conditionalSwitch(
      {
        condition: props.user.idFront !== state.uriIdFront && props.user.idBack !== state.uriIdBack,
        result: {
          ...state,
          uriIdFront: props.user.idFront,
          uriIdBack: props.user.idBack,
        },
      },
      {
        condition: props.user.idFront !== state.uriIdFront,
        result: {
          ...state,
          uriIdFront: props.user.idFront,
        },
      },
      {
        condition: props.user.idBack !== state.uriIdBack,
        result: {
          ...state,
          uriIdBack: props.user.idBack,
        },
      },
      {
        condition: conditionalSwitch.CONDITIONS.DEFAULT,
        result: null,
      },
    );
  };

  async componentDidMount () {
    //analytics
    Amplitude.logEvent(AMP_USER_SIGN_UP_MAIN_INFORMATION_PAGE);

    const { user } = this.props;
    const initialCountryAlpha2Code = await this.getRegion();
    const territory = initialCountryAlpha2Code;

    this.phoneInput.selectCountry(initialCountryAlpha2Code.toLowerCase());

    const addressCountryOfResidence = user.addressCountryOfResidence
      ? pipe(
        countries.find(({ label }) => label === user.addressCountryOfResidence),
        country => country.value,
      )
      : initialCountryAlpha2Code;

    this.setState(prevState => ({
      territory: user.territory || territory,
      nationality: user.nationality || initialCountryAlpha2Code,
      addressCountryOfResidence,
      legalEntity: {
        ...prevState.legalEntity,
        addressCountryOfResidence,
      }}),
    );
  }

  handleSubmit = async () => {
    const { submitGeneralProfile } = this.props;

    await submitGeneralProfile(stateToUser(this.state));
  };

  isFormFilled = () => {
    const formState = stateToUser(this.state);

    return Object.values(formState.profile).every(value => value)
      && formState.investmentEntities
        .every(entry => Object.values(entry)
          .every(value => value))
      && formState.profile.identityDocumentType
      && (formState.profile.idFrontBase64 || this.state.uriIdFront)
      && (formState.profile.idBackBase64 || this.state.uriIdBack);
  };

  isPhoneNumberValid = () => this.state.phoneNumber.length >= 6;

  onInputChange = (field, extractor) => value => this.setState({
    [field]: extractor ? extractor(value) : value,
  });

  onDateChange = (date) => {
    this.props.hideModal(DATEPICKER_MODAL_NAME);
    if (date) {
      this.setState({
        birthdate: date,
      });
    }
  };

  onLegalEntityInputChange = (field, extractor) => value => this.setState(
    prevState => ({
      legalEntity: {
        ...prevState.legalEntity,
        [field]: extractor ? extractor(value) : value,
      },
    }));

  render () {
    const {
      firstName,
      lastName,
      nationality,
      phoneNumber,
      investorType,
      birthdate,
      addressCountryOfResidence,
      addressState,
      addressPostCode,
      addressCity,
      addressStreetAddress,
      legalEntity,
      legalAddressIsTheSame,
      identityDocumentType,
      uriIdFront,
      uriIdBack,
    } = this.state;

    return (
      <ScreenContainer
        gradientHeight={240}
        contentOffsetTop={220}
        ContainerComponent={KeyboardAwareScrollView}
        header={(
          <React.Fragment>
            <Text
              fontSize={36}
              color="#ffffff"
              textAlign="center"
            >
              All About You
            </Text>
            <Space size={30}/>
            <WizardSteps step={0}/>
          </React.Fragment>
        )}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <Space size={16}/>
            <Text
              fontSize={12}
              color={colors._gray}
            >
              HOW WOULD YOU LIKE TO INVEST?
            </Text>
            <Space size={16}/>
            <SegmentedControls
              options={identityOptions}
              onSelection={this.onInputChange(
                'investorType',
                data => data.value,
              )}
              selectedOption={investorType}
              backTint="rgba(101, 110, 120, 0.01)"
            />
            <Space size={25}/>
            {
              investorType === 'both' && (
                <>
                  <Text
                    fontSize={12}
                    color={colors._gray}
                  >
                    Registering with your legal entity also allows you to invest as a natural person
                  </Text>
                  <Space size={14}/>
                </>
              )
            }
            <Text
              fontSize={12}
              color={colors._gray}
            >
              YOUR DETAILS
            </Text>
            <Space size={20}/>
            <TextInput
              onChangeText={this.onInputChange('firstName')}
              value={firstName}
              label="First Name"
            />
            <Space size={10}/>
            <TextInput
              onChangeText={this.onInputChange('lastName')}
              value={lastName}
              label="Last Name"
            />
            <Space size={10}/>
            <PhoneInput
              ref={(ref) => { this.phoneInput = ref; }}
              style={globalStyles.input}
              textStyle={{
                color: '#4e5961',
                fontSize: 18,
              }}
              returnKeyType="next"
              onChangePhoneNumber={this.onInputChange('phoneNumber')}
              value={phoneNumber}
              placeholder="Phone Number (inc country code)"
            />
            <Space size={10}/>
            <DatePicker
              value={birthdate}
              onConfirm={this.onDateChange}
              onCancel={() => this.props.hideModal(DATEPICKER_MODAL_NAME)}
            />
            <Space size={10}/>
            <Select
              label="Nationality"
              placeholder={{
                label: 'Select Nationality',
                value: null,
              }}
              items={nationalities}
              onValueChange={nationality => this.setState({
                nationality,
              })}
              value={nationality}
            />
            <FormHeaderDivider
              HRtop={false}
            >
              PERSONAL DETAILS
            </FormHeaderDivider>
            <Select
              label="Country"
              placeholder={{
                label: 'Select Country of Residence',
                value: null,
              }}
              items={countries}
              onValueChange={addressCountryOfResidence => this.setState({
                addressCountryOfResidence,
              })}
              value={addressCountryOfResidence}
            />
            <Space size={10}/>
            <TextInput
              onChangeText={this.onInputChange('addressState')}
              value={addressState}
              label="State/Province"
            />
            <Space size={10}/>
            <TextInput
              onChangeText={this.onInputChange('addressPostCode')}
              value={addressPostCode}
              label="Zip/Post code"
            />
            <Space size={10}/>
            <TextInput
              onChangeText={this.onInputChange('addressCity')}
              value={addressCity}
              label="City"
            />
            <Space size={10}/>
            <TextInput
              onChangeText={this.onInputChange('addressStreetAddress')}
              value={addressStreetAddress}
              label="Street Address"
            />
            {
              investorType !== 'natural_person' && (
                <React.Fragment>
                  <FormHeaderDivider
                    HRtop={false}
                  >
                    COMPANY INFO
                  </FormHeaderDivider>
                  <TextInput
                    onChangeText={this.onLegalEntityInputChange(
                      'name')}
                    value={legalEntity.name}
                    label="Company Name"
                  />
                  <Space size={10}/>
                  <TextInput
                    onChangeText={this.onLegalEntityInputChange(
                      'nameRegistered')}
                    value={legalEntity.nameRegistered}
                    label="Registered Company Name"
                  />
                  <Space size={10}/>
                  <TextInput
                    onChangeText={this.onLegalEntityInputChange(
                      'legalForm')}
                    value={legalEntity.legalForm}
                    label="Company Legal Structure"
                  />
                  <Space size={10}/>
                  <TextInput
                    onChangeText={this.onLegalEntityInputChange(
                      'number')}
                    value={legalEntity.number}
                    label="Company Number"
                  />
                  <Space size={20}/>
                  <SwitchWithText
                    SwitchProps={{
                      style: {
                        zIndex: 0,
                      },
                    }}
                    onValueChange={this.onInputChange('legalAddressIsTheSame')}
                    value={legalAddressIsTheSame}
                    text={(
                      <Text
                        style={{
                          paddingLeft: 10,
                          paddingRight: 40,
                        }}
                      >
                        Same as personal address
                      </Text>
                    )}
                  />
                  <Space size={20}/>
                  {
                    !legalAddressIsTheSame && (
                      <React.Fragment>
                        <Select
                          label="Company country"
                          placeholder={{
                            label: 'Company Country of Residence',
                            value: null,
                          }}
                          items={countries}
                          onValueChange={this.onLegalEntityInputChange(
                            'addressCountryOfResidence')}
                          value={legalEntity.addressCountryOfResidence}
                        />
                        <Space size={10}/>
                        <TextInput
                          onChangeText={this.onLegalEntityInputChange(
                            'addressState')}
                          value={legalEntity.addressState}
                          label="Company State/Province"
                        />
                        <Space size={10}/>
                        <TextInput
                          onChangeText={this.onLegalEntityInputChange(
                            'addressPostCode')}
                          value={legalEntity.addressPostCode}
                          label="Company Zip/Post code"
                        />
                        <Space size={10}/>
                        <TextInput
                          onChangeText={this.onLegalEntityInputChange(
                            'addressCity')}
                          value={legalEntity.addressCity}
                          label="Company City"
                        />
                        <Space size={10}/>
                        <TextInput
                          onChangeText={this.onLegalEntityInputChange(
                            'addressStreetAddress')}
                          value={legalEntity.addressStreetAddress}
                          label="Company Street Address"
                        />
                      </React.Fragment>
                    )
                  }
                </React.Fragment>
              )
            }

            <Space size={investorType === 'natural_person' ? 10 : 0}/>

            <FormHeaderDivider
              HRbottom={false}
            >
              IDENTIFICATION UPLOAD
            </FormHeaderDivider>
            <Select
              label="Type of Document"
              placeholder={{
                label: 'Select type of document',
                value: null,
              }}
              items={typesOfDocument}
              onValueChange={this.onInputChange('identityDocumentType')}
              value={identityDocumentType}
            />
            <Space size={10}/>
            <Document
              onPress={this.onInputChange('base64IdFront')}
              label="Front of ID"
              uri={uriIdFront}
            />
            <Space size={10}/>
            <Document
              onPress={this.onInputChange('base64IdBack')}
              label="Back of ID"
              uri={uriIdBack}
            />

            <Space size={30}/>

            <Button
              loaderKey="authSubmitting"
              onPress={this.handleSubmit}
              disabled={!(this.isFormFilled() && this.isPhoneNumberValid())}
              text="Continue"
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

const mapDispatchToProps = {
  submitGeneralProfile,
  enableLoader,
  disableLoader,
  hideModal,
};

const mapStateToProps = state => ({
  loading: UserSelectors.loading(state),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withUser,
  ensurePreload({
    requiredProps: ['user'],
  }),
)(ProfileForm1);
