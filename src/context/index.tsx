import { ReactNode } from "react"

import { AuthProvider } from "./Auth";

type IProps = {
  children: ReactNode;
}

export function AppProvider({ children }: IProps) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}