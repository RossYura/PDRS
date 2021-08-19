import moment from 'moment';

import { conditionalSwitch } from 'utils/common';
import { pipe } from 'utils/fp';
import { countries } from 'static/constants/nationalities';
import ObjectBuilder from 'lib/Object';

const birthdayInitial = moment()
  .subtract(18, 'years')
  .toDate();

export const initialState = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  territory: '',
  birthdate: birthdayInitial,
  nationality: '',
  addressCountryOfResidence: '',
  addressState: '',
  addressPostCode: '',
  addressCity: '',
  addressStreetAddress: '',
  legalEntity: {
    name: '',
    nameRegistered: '',
    number: '',
    legalForm: '',
    addressCountryOfResidence: '',
    addressState: '',
    addressPostCode: '',
    addressCity: '',
    addressStreetAddress: '',
  },
  investorType: 'natural_person',
  legalAddressIsTheSame: false,
};

export const userToState = apiUser => {
  const {
    firstName,
    lastName,
    phoneNumber,
    territory,
    birthdate,
    nationality,
    addressCountryOfResidence,
    addressState,
    addressPostCode,
    addressCity,
    addressStreetAddress,
    idFront,
    idBack,
    identityDocumentType,
  } = apiUser;

  const legalEntity = apiUser.investmentEntities
    ?.find(({ entityType }) => entityType === 'legal_entity');

  const normalEntity = apiUser.investmentEntities
    ?.find(({ entityType }) => entityType === 'natural_person');

  return {
    firstName,
    lastName,
    phoneNumber,
    territory,
    nationality,
    addressCountryOfResidence,
    addressState,
    addressPostCode,
    addressCity,
    addressStreetAddress,
    birthdate: birthdate ? new Date(birthdate) : birthdayInitial,
    legalEntity: legalEntity
      ? {
        name: legalEntity.name,
        nameRegistered: legalEntity.legalName,
        number: legalEntity.legalNumber,
        legalForm: legalEntity.legalStructure,
        addressCountryOfResidence,
        addressState,
        addressPostCode,
        addressCity,
        addressStreetAddress,
      }
      : initialState.legalEntity,
    investorType: conditionalSwitch(
      {
        condition: normalEntity && legalEntity,
        result: 'both',
      },
      {
        condition: conditionalSwitch.CONDITIONS.DEFAULT,
        result: 'natural_person',
      },
    ),
    identityDocumentType,
    uriIdFront: idFront,
    uriIdBack: idBack,
    legalAddressIsTheSame: false,
  };
};

export const stateToUser = state => {
  const {
    legalEntity,
    legalAddressIsTheSame,
    investorType,
    identityDocumentType,
    base64IdFront,
    base64IdBack,
    uriIdFront,
    uriIdBack,
    birthdate,
    ...formState
  } = state;

  const country = pipe(
    countries.find(({ value }) => value ===
      formState.addressCountryOfResidence),
    country => country ? country.label : '',
  );

  const countryLegal = pipe(
    countries.find(({ value }) => value ===
      legalEntity.addressCountryOfResidence),
    country => country ? country.label : '',
  );

  const useProfilePartial = ObjectBuilder({
    ...formState,
    identityDocumentType,
    addressCountryOfResidence: country,
    birthdate: moment(birthdate).format('YYYY-MM-DD')
  })
    .setPropertyIf(
      'idFrontBase64',
      base64IdFront,
      base64IdFront,
    )
    .setPropertyIf(
      'idBackBase64',
      base64IdBack,
      base64IdBack,
    )
    .get();

  switch (investorType) {
  case 'natural_person': {
    return {
      profile: useProfilePartial,
      investmentEntities: [
        {
          entityType: 'natural_person',
          name: `${formState.firstName} ${formState.lastName}`,
          addressCountry: country,
          addressState: formState.addressState,
          addressPostCode: formState.addressPostCode,
          addressCity: formState.addressCity,
          addressStreetAddress: formState.addressStreetAddress,
        },
      ],
    };
  }
  case 'both': {
    return {
      profile: useProfilePartial,
      investmentEntities: [
        {
          entityType: 'natural_person',
          name: `${formState.firstName} ${formState.lastName}`,
          addressCountry: country,
          addressState: formState.addressState,
          addressPostCode: formState.addressPostCode,
          addressCity: formState.addressCity,
          addressStreetAddress: formState.addressStreetAddress,
        },
        {
          entityType: 'legal_entity',
          name: legalEntity.name,
          legalName: legalEntity.nameRegistered,
          legalNumber: legalEntity.number,
          legalStructure: legalEntity.legalForm,
          ...legalAddressIsTheSame
            ? {
              addressCountry: country,
              addressState: formState.addressState,
              addressPostCode: formState.addressPostCode,
              addressCity: formState.addressCity,
              addressStreetAddress: formState.addressStreetAddress,
            }
            : {
              addressCountry: countryLegal,
              addressState: legalEntity.addressState,
              addressPostCode: legalEntity.addressPostCode,
              addressCity: legalEntity.addressCity,
              addressStreetAddress: legalEntity.addressStreetAddress,
            },
        },
      ],
    };
  }
  }
};