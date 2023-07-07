import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore';
import { useAuth } from "@context/Auth";

interface IXP {
  id: string;
  xp: number;
  level: number;
}

type IAuthContextData = {
  experience: IXP | null;
  percentToNextLevel: number;
  experienceToNextLevel: number;
  currentExperience: number;
  handleUpdateXP: (xp: number) => void;
};

export const ExperienceBarContext = createContext({} as IAuthContextData);

type IAuthProviderProps = {
  children: ReactNode;
}

export function ExperienceBarProvider({ children }: IAuthProviderProps) {
  const { user } = useAuth();

  const [experience, setExperience] = useState<IXP | null>(null);

  const level = (experience?.level || 1);
  const currentExperience = (experience?.xp || 0);
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  const percentToNextLevel = (Math.round(currentExperience * 100)) / experienceToNextLevel;

  useEffect(() => {
    let subscribe: () => void = () => {};

    if (user?.id) {
      subscribe = firestore()
        .collection('users_xp')
        .where('user_id', '==', user?.id)
        .onSnapshot(querySnapshot => {
          if (querySnapshot.size > 0) {
            const data = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            })) as IXP[];
            setExperience(data[0]);
          } else {
            firestore()
            .collection('users_xp')
            .add({
              level: 1,
              xp: 0,
              user_id: user?.id,
            });
          }
        });
    }

    return () => subscribe();
  }, [user?.id]);

  function handleUpdateXP(xp: number) {
    if (experience) {
      let newLevel = level;
      const newExperience = xp + experience?.xp;

      if (newExperience >= experienceToNextLevel) {
        newLevel++;
      }

      firestore()
        .collection('users_xp')
        .doc(experience?.id)
        .update({
          xp: newExperience,
          level: newLevel,
        });
    }
  }

  return (
    <ExperienceBarContext.Provider value={{ experience, experienceToNextLevel, percentToNextLevel, currentExperience, handleUpdateXP }}>
      {children}
    </ExperienceBarContext.Provider>
  );
}

export function useExperienceBar() {
  const context = useContext(ExperienceBarContext);
  return context;
}