import { onAuthStateChanged } from "firebase/auth";
import { useState, useContext, createContext, useEffect } from "react";
import { ReactNode } from "react";
import { authentication } from "../../firebase/app";

type Props = {
  children: ReactNode;
};

interface user {
  uid: string;
  isAnonymous: boolean;
}

const authContext = createContext<user | null>({
  uid: "",
  isAnonymous: true,
});

const useAuthContext = () => useContext(authContext);

const AuthProvider = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useState<user | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          isAnonymous: user.isAnonymous,
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
