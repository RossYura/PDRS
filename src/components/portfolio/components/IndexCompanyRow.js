import React from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

import Text from 'components/common/Text';
import colors from 'styles/colors';
import DeltaLabel from 'components/common/DeltaLabel';

const IndexCompanyRow = ({
  company,
  invested,
  estReturn,
  onStartupShowNavigate,
}) => {
  const { companyLogo, name, keywords } = company;

  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={onStartupShowNavigate}
    >
      <Image
        source={{ uri: companyLogo }}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={{ width: 8 }}/>
      <View>
        <Text
          fontSize={17}
          color={colors._darkblue}
          style={{
            marginBottom: 2,
          }}
        >
          {name}
        </Text>
        <Text
          fontSize={12}
        >
          {
            keywords
              .map(item => item.name)
              .join(', ')
          }
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Text
          fontSize={17}
          color={colors._darkblue}
          style={{
            marginBottom: 2,
            textAlign: 'right',
          }}
        >
          {`€${estReturn}`}
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            flexDirection: 'row'
          }}
        >
          <DeltaLabel
            comparable={parseFloat(estReturn)*100/parseFloat(invested)}
            style={{
              alignItems: 'flex-start'
            }}
          />
          <Text
            fontSize={12}
            style={{
              width: 80,
              textAlign: 'right'
            }}
          >
            {`€${invested}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    flex: 1,
    height: 50
  },
  logo: {
    width: 40,
    height: 40,
  },
});

export default IndexCompanyRow;