import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

type IUser = {
  id: string;
  name: string;
  email: string;
  photo: string | null;
}

type IAuthContextData = {
  user: IUser | null;
  isLogged: boolean;
  signInWithGoogle(): Promise<void>;
  signOut(): Promise<void>;
};

export const AuthContext = createContext({} as IAuthContextData);

type IAuthProviderProps = {
  children: ReactNode;
}

export function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const isLogged = !!user;

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    if (user) {
      setUser({
        id: user.uid,
        name: user.displayName || 'Não encontrado',
        email: user.email || 'Não encontrado',
        photo: user.photoURL,
      });
    } else {
      setUser(null);
    }
  }

  async function signInWithGoogle() {
    const { idToken } = await GoogleSignin.signIn();
    const credentials = auth.GoogleAuthProvider.credential(idToken);
    const authentication = await auth().signInWithCredential(credentials);

    const { displayName, email, photoURL, uid } = authentication.user;
    
    setUser({
      id: uid,
      name: displayName || 'Não encontrado',
      email: email || 'Não encontrado',
      photo: photoURL,
    });
  }

  async function signOut() {
    await GoogleSignin.signOut();
    await auth().signOut();
  }

  return (
    <AuthContext.Provider value={{ user, isLogged, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}