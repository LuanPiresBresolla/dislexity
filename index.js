import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { App } from './App';

GoogleSignin.configure({
  webClientId: '137307556730-dvjos79mjc9vsulj76asks83eqrouf9m.apps.googleusercontent.com',
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
