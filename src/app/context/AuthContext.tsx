'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  authError: string | null;
  setAuthError: (error: string | null) => void;
  isMini: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authError, setAuthError] = useState<string | null>(null);
  const [isMini, setIsMini] = useState(false);

  return (
    <AuthContext.Provider value={{ authError, setAuthError, isMini }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
