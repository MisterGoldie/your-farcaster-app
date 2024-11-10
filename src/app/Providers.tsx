'use client'

import { SessionProvider } from "next-auth/react"
import { AuthProvider } from '@/app/context/AuthContext' // Correct import path
import UserContextProvider from '@/app/context/userContext' // Correct import path

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <UserContextProvider>
          {children}
        </UserContextProvider>
      </AuthProvider>
    </SessionProvider>
  )
}
