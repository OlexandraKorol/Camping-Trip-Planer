import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { User } from "firebase/auth";

interface AuthContextType {
  currentUser: User | undefined;
  isUserLoggedIn: boolean;
  isLoading: boolean;
  setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
}


const AuthContext = createContext<AuthContextType>({
  currentUser: undefined,
  isUserLoggedIn: false,
  isLoading: true,
  setIsUserLoggedIn: () => { },
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<undefined | User>(undefined);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)


  const initializeUser = (user: User | null) => {
    if (user) {
      setCurrentUser(user);
      setIsUserLoggedIn(true);
    } else {
      setCurrentUser(undefined);
      setIsUserLoggedIn(false);
    }
    setIsLoading(false);
  };

  useEffect(
    () => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        console.log("User state changed:", user);
        initializeUser(user);
        if (user) {
          setCurrentUser(user);
          setIsUserLoggedIn(true);
        } else {
          setCurrentUser(undefined);
          setIsUserLoggedIn(false);
        }
        setIsLoading(false);
      });
      return () => unsubscribe()
    },
    []
  )

  const value = {
    currentUser,
    isUserLoggedIn,
    isLoading,
    setIsUserLoggedIn
  }

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  )

};

export const useAuth = () => useContext(AuthContext);

