import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface RegisterData {
  fullName: string;
  fatherHusbandName?: string;
  mobile: string;
  password?: string;
  state: string;
  district: string;
  village: string;
  pincode?: string;
  khasraNo?: string;
  landAreaAcres?: number;
  consentGiven: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isBackendConnected: boolean;
  loading: boolean;
  login: (mobile: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('fasalrakshak_token'));
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const apiUrl = ((import.meta as any).env?.VITE_API_URL || 'http://localhost:5000') as string;

  // Check backend health and restore session
  useEffect(() => {
    async function checkHealthAndRestore() {
      setLoading(true);
      try {
        const healthRes = await fetch(`${apiUrl}/api/health`, { method: 'GET' });
        if (healthRes.ok) {
          setIsBackendConnected(true);
          // If we have a token, fetch current user
          const savedToken = localStorage.getItem('fasalrakshak_token');
          if (savedToken) {
            const meRes = await fetch(`${apiUrl}/api/auth/me`, {
              headers: { Authorization: `Bearer ${savedToken}` }
            });
            if (meRes.ok) {
              const meData = await meRes.json();
              setUser(meData.user);
              setToken(savedToken);
            } else {
              localStorage.removeItem('fasalrakshak_token');
              setToken(null);
            }
          }
        } else {
          setIsBackendConnected(false);
          // Fallback to local stored user
          restoreLocalUser();
        }
      } catch (e) {
        setIsBackendConnected(false);
        restoreLocalUser();
      } finally {
        setLoading(false);
      }
    }

    checkHealthAndRestore();
  }, [apiUrl]);

  function restoreLocalUser() {
    try {
      const saved = localStorage.getItem('fasalrakshak_farmer');
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (e) {}
  }

  const login = async (mobile: string, password = 'demoPassword123'): Promise<{ success: boolean; error?: string }> => {
    const cleanMobile = mobile.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      return { success: false, error: 'Please enter a valid 10-digit Indian mobile number.' };
    }

    if (isBackendConnected) {
      try {
        const res = await fetch(`${apiUrl}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mobile: cleanMobile, password })
        });
        const data = await res.json();
        if (!res.ok) {
          return { success: false, error: data.error || 'Authentication failed.' };
        }
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('fasalrakshak_token', data.token);
        localStorage.setItem('fasalrakshak_farmer', JSON.stringify(data.user));
        return { success: true };
      } catch (err: any) {
        return { success: false, error: 'Connection to backend failed. Try local mode.' };
      }
    } else {
      // Local Demo Mode (clearly labeled)
      const mockUser: User = {
        id: `FR-KISAN-${Math.floor(1000 + Math.random() * 9000)}`,
        fullName: 'Demo Farmer (प्रमाणित किसान)',
        mobile: cleanMobile,
        state: 'Madhya Pradesh',
        district: 'Indore',
        village: 'Sanwer',
        consentGiven: true,
        createdAt: new Date().toISOString()
      };
      setUser(mockUser);
      localStorage.setItem('fasalrakshak_farmer', JSON.stringify(mockUser));
      return { success: true };
    }
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    if (!data.consentGiven) {
      return { success: false, error: 'Please accept the consent terms to proceed.' };
    }

    const cleanMobile = data.mobile.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      return { success: false, error: 'Please enter a valid 10-digit Indian mobile number.' };
    }

    if (isBackendConnected) {
      try {
        const res = await fetch(`${apiUrl}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, mobile: cleanMobile })
        });
        const resData = await res.json();
        if (!res.ok) {
          return { success: false, error: resData.error || 'Registration failed.' };
        }
        setUser(resData.user);
        setToken(resData.token);
        localStorage.setItem('fasalrakshak_token', resData.token);
        localStorage.setItem('fasalrakshak_farmer', JSON.stringify(resData.user));
        return { success: true };
      } catch (err: any) {
        return { success: false, error: 'Backend unreachable. Saved locally.' };
      }
    } else {
      // Local Mode
      const newUser: User = {
        id: `FR-KISAN-${Math.floor(1000 + Math.random() * 9000)}`,
        fullName: data.fullName,
        fatherHusbandName: data.fatherHusbandName,
        mobile: cleanMobile,
        state: data.state,
        district: data.district,
        village: data.village,
        khasraNo: data.khasraNo,
        landAreaAcres: data.landAreaAcres,
        consentGiven: true,
        createdAt: new Date().toISOString()
      };
      setUser(newUser);
      localStorage.setItem('fasalrakshak_farmer', JSON.stringify(newUser));
      return { success: true };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('fasalrakshak_token');
    localStorage.removeItem('fasalrakshak_farmer');
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: Boolean(user),
      isBackendConnected,
      loading,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
