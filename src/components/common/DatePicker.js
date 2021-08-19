import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
  Platform,
} from 'react-native';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Appearance } from 'react-native-appearance';

import datePickerIcon from 'assets/images/datepicker_icon.png';
import TextInput from 'components/common/TextInput';
import { showModal } from 'redux/common/actions';
import { getModalParamsByName } from 'redux/common/selectors';
import { MODAL_NAME as DATEPICKER_MODAL_NAME } from 'components/common/modals/DatepickerModalIOS';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DatePicker = ({ value, ...DatePickerProps }) => {
  const dispatch = useDispatch();
  const { visible } = useSelector(state => getModalParamsByName(state)(DATEPICKER_MODAL_NAME));

  return (
    <View>
      <TouchableWithoutFeedback
        onPress={() => dispatch(showModal(DATEPICKER_MODAL_NAME))}
      >
        <View>
          <TextInput
            editable={false}
            pointerEvents="none"
            value={moment(value)
              .format('YYYY-MM-DD')}
            label="Birthday"
          />
          <Image
            source={datePickerIcon}
            style={styles.datePickerIcon}
          />
        </View>
      </TouchableWithoutFeedback>
      {
        Platform.OS === 'ios'
          ? (
            <DateTimePickerModal
              display="spinner"
              date={value}
              isVisible={visible}
              mode="date"
              isDarkModeEnabled={Appearance && Appearance.getColorScheme() === 'dark'}
              {...DatePickerProps}
            />
          ) : visible && (
            <DateTimePickerModal
              minimumDate={new Date('1900-01-01')}
              maximumDate={
                moment()
                  .subtract(18, 'years')
                  .toDate()
              }
              display="default"
              value={value}
              {...DatePickerProps}
            />
          )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  datePickerIcon: {
    position: 'absolute',
    top: 18,
    right: 12,
    overflow: 'visible',
  },
});

export default DatePicker;
