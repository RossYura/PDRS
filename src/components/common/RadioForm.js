import React from 'react';
import RadioFormOrigin, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import { View } from 'react-native';
import colors from 'styles/colors';

const RadioForm = ({ scheme, onPress, value }) => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center'
    }}
  >
    <RadioFormOrigin>
      {scheme.map((obj, i) => (
        <RadioButton
          labelHorizontal={true}
          key={i}
          style={{marginBottom: 10}}
        >
          <RadioButtonInput
            obj={obj}
            index={i}
            isSelected={obj.value === value}
            onPress={onPress}
            borderWidth={1}
            buttonInnerColor={colors._darkblue}
            buttonOuterColor='#C3D1DD'
            buttonSize={14}
            buttonOuterSize={24}
          />
          <RadioButtonLabel
            obj={obj}
            index={i}
            labelHorizontal={true}
            onPress={onPress}
            labelStyle={{
              fontSize: 15,
              color: colors._gray,
              fontFamily: 'ProximaNova_Regular',
            }}
          />
        </RadioButton>
      ))}
    </RadioFormOrigin>
  </View>
);

export default RadioForm;