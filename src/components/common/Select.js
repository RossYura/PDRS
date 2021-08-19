import React from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import SelectArrow from 'assets/images/select_arrow.png';
import colors from 'styles/colors';
import Space from 'components/common/Space';
import Text from 'components/common/Text';

// npm package error fix

RNPickerSelect.prototype.getPlaceholderStyle = function() {
  const { placeholder } = this.props;
  return {
    color: this.state.selectedItem.label === placeholder.label
      ? colors.placeholderGray
      : 'black',
  };
};

const Select = ({
  style,
  label,
  labelColor = '#C3D1DD',
  borderColor = '#C3D1DD',
  ...SelectProps
}) => label
  ? (
    <View>
      <Space size={5}/>
      <View>
        <View
          style={{
            position: 'absolute',
            left: 0,
            height: 16,
            top: 0,
            right: 0,
            paddingHorizontal: 2,
            paddingVertical: 2,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}
        >
          <View
            style={{
              height: 45,
              width: 20,
              borderTopWidth: 1,
              borderLeftWidth: 1,
              borderColor,
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
              position: 'absolute',
              left: 0,
              top: 5,
            }}
          />
          <Space horizontal size={22}/>
          <View
            style={{
              height: 19,
              marginTop: -3
            }}
          >
            <Text
              fontSize={14}
              color={labelColor}
            >
              {label}
            </Text>
          </View>
          <Space horizontal size={3}/>
          <View
            style={{
              marginTop: 38.5,
              marginRight: -2,
              height: 45,
              borderTopWidth: 1,
              borderRightWidth: 1,
              borderColor,
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
              flex: 1,
            }}
          />
        </View>
        <RNPickerSelect
          style={{
            inputIOS: {
              ...styles.input,
              borderColor,
              ...style,
            },
            inputAndroid: {
              ...styles.inputAndroid,
              borderColor,
              ...style,
            },
            iconContainer: styles.iconContainer,
          }}
          useNativeAndroidPickerStyle={false}
          Icon={() => {
            return <Image source={SelectArrow}/>;
          }}
          {...SelectProps}
        />
      </View>
      <Space size={5}/>
    </View>
  )
  : (
    <RNPickerSelect
      style={{
        inputIOS: {
          ...styles.input,
          borderTopWidth: 1
        },
        iconContainer: styles.iconContainer,
      }}
      useNativeAndroidPickerStyle={false}
      Icon={() => {
        return <Image source={SelectArrow}/>;
      }}
      {...SelectProps}
    />
  );

export const styles = StyleSheet.create({
  input: {
    height: 45,
    borderColor: colors.grayBorder,
    borderTopWidth: 0,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 10,
    marginVertical: 5,
    fontSize: 16,
    color: colors.black,
    fontFamily: 'ProximaNova_Regular',
    backgroundColor: 'rgba(101, 110, 120, 0.01)',
  },
  inputAndroid: {
    height: 45,
    borderColor: colors.grayBorder,
    borderTopWidth: 0,
    borderWidth: 1,
    borderRadius: 8,
    padding: 0,
    paddingHorizontal: 12,
    marginVertical: 5,
    fontSize: 16,
    color: colors.black,
    fontFamily: 'ProximaNova_Regular',
    backgroundColor: 'rgba(101, 110, 120, 0.01)',
  },
  iconContainer: {
    top: 25,
    right: 12,
  },
});

export default Select;
