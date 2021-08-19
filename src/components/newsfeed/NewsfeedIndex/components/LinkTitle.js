import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import SvgUri from 'expo-svg-uri';
import { useNavigation, useRoute } from '@react-navigation/native';

import linkIcon from 'assets/images/link.svg';
import Space from 'components/common/Space';

const LinkTitle = ({ updateEvent, children }) => {

  const TitleComponent = updateEvent.link ? TouchableOpacity : View;
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <TitleComponent
      onPress={updateEvent.link
        ? () => navigation.navigate(
          'WebViewer',
          {
            href: updateEvent.link,
            webViewerPassedProps: {
              goBackUrl: route.name,
              params: { updateEvent },
            },
          },
        )
        : () => {}
      }
      style={{
        flexDirection: 'row',
        alignItems: 'center'
      }}
    >
      {children}
      {
        updateEvent.link ? (
          <React.Fragment>
            <Space size={5} horizontal/>
            <SvgUri
              source={linkIcon}
            />
          </React.Fragment>
        ) : null
      }
    </TitleComponent>
  );
};

export default LinkTitle;