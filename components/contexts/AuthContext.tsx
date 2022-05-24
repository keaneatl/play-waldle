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

const userContext = createContext<user | null>({
  uid: "",
  isAnonymous: true,
});

const useUserContext = () => useContext(userContext);

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

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
};
export { useUserContext, AuthProvider };
