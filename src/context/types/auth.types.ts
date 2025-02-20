export interface UserData {
  id: string;
  name: string;
  email: string;
  role: "agent" | "customer";
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserData | null;
  loading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  isAgent: () => boolean;
  isCustomer: () => boolean;
}
