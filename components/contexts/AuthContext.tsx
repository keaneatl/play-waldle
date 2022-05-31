import { onAuthStateChanged } from "firebase/auth";
import { useState, useContext, createContext, useEffect } from "react";
import { ReactNode } from "react";
import { authentication } from "../../firebase/app";

type Props = {
  children: ReactNode;
};

interface user {
  uid: string;
  displayName?: string | null;
  email: string | null;
  photoURL?: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
}

const authContext = createContext<user | null>({
  uid: "",
  email: "",
  isAnonymous: true,
  emailVerified: false,
});

const useAuthContext = () => useContext(authContext);

const AuthProvider = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useState<user | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication, (user) => {
      if (user) {
        const {
          uid,
          displayName,
          photoURL,
          emailVerified,
          isAnonymous,
          email,
        } = user;
        setUser({
          uid,
          email,
          displayName,
          photoURL,
          emailVerified,
          isAnonymous,
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return <authContext.Provider value={user}>{children}</authContext.Provider>;
};
export { useAuthContext, AuthProvider };
export { type user };
