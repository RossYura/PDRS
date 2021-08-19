import React from 'react';
import {
  SafeAreaView,
  View,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';

import generalStyles from 'styles';
import ArrowBack from 'containers/RootNavigator/components/ArrowBack';
import Space from 'components/common/Space';
import Text from 'components/common/Text';
import { ensureProtocolProvided } from 'utils/string';

export default class WebViewer extends React.Component {

  state = {
    key: 1,
    isWebViewUrlChanged: false,
  };

  render () {
    const { navigation, route: { params: routeParams } } = this.props;
    const { href, webViewerPassedProps: { goBackUrl, params } }  = routeParams;

    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.container}>
          <View
            style={[
              {
                flexDirection: 'row',
                alignItems: 'center',
              },
              Platform.OS === 'android' && { paddingTop: 30 },
            ]}
          >
            <ArrowBack
              onPress={() => navigation.navigate(goBackUrl, params)}
              style={{
                marginLeft: 16,
              }}
            />
            <Space size={10} horizontal/>
            <Text>
              back to Pitchdrive
            </Text>
          </View>
          <Space size={20}/>
          <WebView
            key={this.state.key}
            source={{ uri: ensureProtocolProvided(href) }}
            ref={(ref) => { this.webview = ref; }}
            renderLoading={() =>
              <View style={[generalStyles.container, styles.loading]}>
                <ActivityIndicator/>
              </View>
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  loading: {
    paddingTop: 128,
  },
  container: {
    flex: 1,
    paddingTop: 15, /* Padding to push below the navigation bar */
    backgroundColor: '#F5FCFF',
  },
});