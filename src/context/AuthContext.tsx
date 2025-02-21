import { createContext, useContext, useState, ReactNode } from 'react';
import { AuthContextType, AuthState, UserData } from './types/auth.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>(initialState);
  const login = async (credentials: { email: string; password: string }) => {
    try {
      setState({ ...state, loading: true, error: null });
      const mockUser: UserData = {
        id: '1',
        name: 'Karen',
        email: credentials.email,
        role: credentials.email.includes('agent') ? 'agent' : 'customer',
      };

      setState({
        isAuthenticated: true,
        user: mockUser,
        loading: false,
        error: null,
      });
      return mockUser;
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: 'Authentication Failed',
      });
    }
  };
  const logout = () => {
    setState(initialState);
  };
  const isAgent = () => state.user?.role === 'agent';
  const isCustomer = () => state.user?.role == 'customer';

  const value = {
    ...state,
    login,
    logout,
    isAgent,
    isCustomer,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within and AuthProvider');
  }
  return context;
};
