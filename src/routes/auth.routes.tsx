import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn } from '@screens/SignIn';
import { useTheme } from 'styled-components';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  const { colors } = useTheme();

  return (
    <Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
      <Screen name="SignIn" component={SignIn} />
    </Navigator>
  );
}