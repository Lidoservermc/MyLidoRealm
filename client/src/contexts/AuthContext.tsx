import React, { createContext, useState, useContext, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@shared/schema";

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (username: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  checkAuth: async () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if the user is logged in on initial load
    checkAuth().then(() => {
      setIsLoading(false);
    });
  }, []);

  const checkAuth = async (): Promise<boolean> => {
    try {
      const response = await fetch('/api/users/current', {
        credentials: 'include',
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        return true;
      } else {
        setUser(null);
        return false;
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
      return false;
    }
  };

  const login = async (username: string, email: string): Promise<void> => {
    try {
      // Check if user exists, register if not
      const loginResponse = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
        credentials: 'include',
      });
      
      if (loginResponse.ok) {
        // User exists, update the user state
        const userData = await loginResponse.json();
        setUser(userData.user);
      } else if (loginResponse.status === 404) {
        // User doesn't exist, register
        const registerResponse = await apiRequest('POST', '/api/users/register', { 
          username, 
          email 
        });
        setUser(registerResponse.user);
      } else {
        const errorData = await loginResponse.json();
        throw new Error(errorData.message || 'Login failed');
      }
      
      toast({
        title: "Welcome to MyLido!",
        description: `You're now logged in as ${username}`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "An error occurred during login",
      });
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await apiRequest('POST', '/api/users/logout');
      setUser(null);
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: error.message || "An error occurred during logout",
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
