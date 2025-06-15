import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type AuthContextType = {
isAuthenticated: boolean;
role: string | null;
  login: (role: string) => void;
  logout: () => void;
  };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

    export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
    // Saat pertama kali load, ambil data dari localStorage
    const token = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    if (token) {
      setIsAuthenticated(true);
      setRole(savedRole);
      }
      }, []);

        const login = (role: string) => {
        setIsAuthenticated(true);
        setRole(role);
        localStorage.setItem("role", role);
        };

        const logout = () => {
        setIsAuthenticated(false);
        setRole(null);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        };

          return (
          <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
          {children}
          </AuthContext.Provider>
          );
          }

  export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
  };