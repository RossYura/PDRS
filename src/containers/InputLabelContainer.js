import React from 'react';
import {
  View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

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

const InputLabelContainer = Input => props => {
  const {
    style = {},
    label,
    labelColor = '#C3D1DD',
    borderColor = '#C3D1DD',
  } = props;

  const height = style.height || 40;

  return label
    ? (
      <View>
        <Space size={5}/>
        <View>
          <View
            style={{
              position: 'absolute',
              left: 0,
              height: 16,
              top: -6,
              right: 0,
              paddingHorizontal: 2,
              paddingVertical: 2,
              flexDirection: 'row',
              backgroundColor: 'transparent',
              justifyContent: 'space-between'
            }}
          >
            <View
              style={{
                height,
                width: 20,
                borderTopWidth: 1,
                borderLeftWidth: 1,
                borderColor,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
                position: 'absolute',
                left: 0,
                top: 7,
              }}
            />
            <Space horizontal size={22}/>
            <Text
              fontSize={14}
              color={labelColor}
              style={{
                marginTop: -4
              }}
            >
              {label}
            </Text>
            <Space horizontal size={3}/>
            <View
              style={{
                marginRight: -2,
                marginLeft: 10,
                marginTop: 4,
                height: height + 1,
                flex: 1,
                borderTopWidth: 1,
                borderRightWidth: 1,
                borderColor,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
              }}
            />
          </View>
          <Input
            style={{
              ...style,
              borderTopWidth: label ? 0 : 1
            }}
            borderColor={borderColor}
            {...props}
          />
        </View>
        <Space size={5}/>
      </View>
    )
    : <Input borderColor={borderColor} {...props}/>;
};

export default InputLabelContainer;
