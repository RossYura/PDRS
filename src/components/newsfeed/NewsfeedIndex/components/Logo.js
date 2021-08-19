import React from 'react';
import { Image } from 'react-native';
import SvgUri from 'expo-svg-uri';
import { replaceLocalhostToUrl } from 'utils/string';

import logoSmall from 'assets/images/logo_s.svg';
import logoMedium from 'assets/images/logo_m.svg';

const Logo = ({ updateEvent, big }) => updateEvent.company
  ? (
    <Image
      source={{ uri: replaceLocalhostToUrl(updateEvent.company.companyLogo) }}
      style={ big ? { 
        width: 50, 
        height: 50 
      } : { 
        width: 11, 
        height: 11 
      }}
    />
  ) : (
    <SvgUri source={big ? logoMedium : logoSmall}/>
  );

export default Logo;
