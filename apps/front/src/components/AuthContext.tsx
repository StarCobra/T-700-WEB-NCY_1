import React, { createContext, useState, useContext, ReactNode } from 'react';
import api from '../services/api'

type User = {
  email: string;
  password: string;
  // Autres champs d'utilisateur ici si nécessaire
};

type AuthContextType = {
  user: User | null;
  logIn: (userData: User) => Promise<any>;
  logOut: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
  
    const logIn = async (userData: User) => {
      setLoading(true);
      try {
        const loggedInUser = await api.logIn(userData); // Appel à api.logIn
        setUser(loggedInUser);
        return loggedInUser;
      } catch (error) {
        console.error('Erreur de connexion :', error);
        throw error;
      } finally {
        setLoading(false);
      }
    };

  const logOut = async () => {
    // api.logout à ajouter
    setUser(null);
  };

  const authContextValue: AuthContextType = {
    user,
    logIn,
    logOut,
    loading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;