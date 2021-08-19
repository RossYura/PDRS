import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg from 'expo-svg-uri';

import Text from 'components/common/Text';
import listItemMarkIcon from 'assets/images/list_item_mark.svg';

const ListItem = ({ text }) => (
  <View
    style={styles.listItemContainer}
  >
    <View
      style={styles.listItemSVGContainer}
    >
      <Svg
        width="5"
        height="5"
        source={listItemMarkIcon}
      />
    </View>
    <Text>
      {text}
    </Text>
  </View>
);

const PushNotificationsPermissionTipPartial = (
  <View>
    <Text>
      We would like to send you relevant push notifications to keep
      you
      up to date with your investments
    </Text>
    <View style={{ height: 25 }}/>
    <ListItem
      text="When new rounds are open"
    />
    <ListItem
      text="When a round you invested in is completed"
    />
    <ListItem
      text="When your portfolio companies issue Investor Updates"
    />
  </View>
);



const styles = StyleSheet.create({
  listItemContainer: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  listItemSVGContainer: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    marginRight: 20
  },
});

export default PushNotificationsPermissionTipPartial;