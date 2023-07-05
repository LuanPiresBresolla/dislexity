import React from 'react';

import { useAuth } from '@context/Auth';
import { AppRoutes } from '@routes/app.routes';
import { AuthRoutes } from '@routes/auth.routes';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      SignIn: undefined;
      Main: undefined;
      Challenge: { collection: string };
    }
  }
}

export function Routes() {
  const { isLogged } = useAuth();

  return isLogged ? <AppRoutes /> : <AuthRoutes />;
}