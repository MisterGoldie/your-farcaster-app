'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

interface AuthContextType {
  authError: string | null;
  setAuthError: (error: string | null) => void;
  isMini: boolean;
  handleSignIn: (key: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authError, setAuthError] = useState<string | null>(null);
  const [isMini, setIsMini] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSignIn = async (key: string) => {
    try {
      const result = await signIn('miniApp', { key, redirect: false });
      if (result?.error) {
        setAuthError(result.error);
      } else {
        // Handle successful sign-in
        router.replace('/'); // or wherever you want to redirect after sign-in
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      setAuthError('An error occurred during sign-in');
    }
  };

  const scheduling = async (key: string) => {
    await handleSignIn(key);
    router.refresh(); // You're already using refresh instead of replace
  };

  useEffect(() => {
    const key = searchParams?.get("key");
    const mini = searchParams?.get("mini");

    if (key) {
      scheduling(key);
    }
    if (mini) {
      setIsMini(true);
    }
  }, [searchParams]);

  return (
    <AuthContext.Provider value={{ authError, setAuthError, isMini, handleSignIn }}>
      {children}
    </AuthContext.Provider>
  );
}

// **Exported Hook**
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
