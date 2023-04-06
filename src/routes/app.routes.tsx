import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components';

import { AppTabRoutes } from './app.tab.routes';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  const { colors } = useTheme();

  return (
    <Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
      <Screen name="Main" component={AppTabRoutes} />
    </Navigator>
  );
}