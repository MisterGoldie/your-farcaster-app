'use client'

import { ReactNode } from 'react'
import { SessionProvider } from "next-auth/react"
import { AuthProvider } from '@/app/context/AuthContext'
import AuthLoader from './AuthLoader'

interface CustomAuthWrapperProps {
    children: ReactNode
}

export default function CustomAuthWrapper({ children }: CustomAuthWrapperProps) {
    return (
        <SessionProvider>
            <AuthProvider>
                <AuthLoader>
                    {children}
                </AuthLoader>
            </AuthProvider>
        </SessionProvider>
    )
}
