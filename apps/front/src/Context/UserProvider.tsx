import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Loader from "../components/Loader";

type User = {
  email: string;
  password: string;
};

type UserProfile = {
  first_name: string;
  last_name: string;
  email: string;
  birth_date: string;
  roles: string;
};

type AuthContextType = {
  user: UserProfile | null;
  userToken: string | null;
  logIn: (userData: User) => Promise<any>;
  logOut: () => Promise<void>;
  loading: boolean;
  updateUserProfile: (profile: UserProfile) => void;
};

const UserProvider = createContext<AuthContextType | undefined>(undefined);

const useAuth = (): AuthContextType => {
  const context = useContext(UserProvider);
  if (!context) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider",
    );
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const persistedUser = localStorage.getItem("user");
    const persistedToken = localStorage.getItem("userToken");

    if (persistedUser && persistedToken) {
      setUser(JSON.parse(persistedUser));
      setUserToken(JSON.parse(persistedToken));
    }

    setLoading(false);
  }, []);

  const updateUserProfile = (profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem("user", JSON.stringify(profile));
  };

  const logIn = async (userData: User) => {
    setLoading(true);
    try {
      const loggedInUser = await api.logIn(userData);
      const userProfile = await api.getProfile(loggedInUser.token);
      setUserToken(loggedInUser.token);
      updateUserProfile(userProfile.user);
      localStorage.setItem("userToken", JSON.stringify(loggedInUser.token));

      navigate("/");
      return loggedInUser;
    } catch (error) {
      console.error("Erreur de connexion :", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setUser(null);
    setUserToken(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");

    navigate("/");
  };

  const authContextValue: AuthContextType = {
    user,
    userToken,
    logIn,
    logOut,
    loading,
    updateUserProfile,
  };

  return (
    <UserProvider.Provider value={authContextValue}>
      {loading ? <Loader /> : children}
    </UserProvider.Provider>
  );
};

export default useAuth;
