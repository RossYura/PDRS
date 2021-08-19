import Reactotron from 'reactotron-react-native';
import { NativeModules } from 'react-native';
import url from 'url';

const { hostname } = url.parse(NativeModules.SourceCode.scriptURL);

Reactotron.configure({ host: hostname }).useReactNative().connect();
