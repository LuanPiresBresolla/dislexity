import { ReactNode } from "react"

import { AuthProvider } from "./Auth";
import { ExperienceBarProvider } from "./ExperienceBar";

type IProps = {
  children: ReactNode;
}

export function AppProvider({ children }: IProps) {
  return (
    <AuthProvider>
      <ExperienceBarProvider>
        {children}
      </ExperienceBarProvider>
    </AuthProvider>
  );
}