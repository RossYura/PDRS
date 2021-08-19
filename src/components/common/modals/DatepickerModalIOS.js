import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useColorScheme } from 'react-native-appearance';
import moment from 'moment';

import ModalContainer from './containers/ModalContainer';

export const MODAL_NAME = 'datepicker';

const DatepickerModalIOS = ({ ...DatePickerProps }) => {
  const colorScheme = useColorScheme();

  return (
    <ModalContainer
      name={MODAL_NAME}
      cardStyle={{
        bottom: 0,
        padding: 0,
        borderRadius: 0,
        top: null,
        left: 0,
        right: 0,
      }}
    >
      <DateTimePicker
        minimumDate={new Date('1900-01-01')}
        maximumDate={
          moment()
            .subtract(18, 'years')
            .toDate()
        }
        display="default"
        textColor="red"
        style={{
          backgroundColor: colorScheme === 'light' ? 'black' : '#fff'
        }}
        {...DatePickerProps}
      />
    </ModalContainer>
  );
};

export default DatepickerModalIOS;