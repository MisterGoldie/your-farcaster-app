"use client"

import React, { createContext, useContext, ReactNode, useState, useEffect } from "react"
import { useSession } from "next-auth/react"

// Define the T_UserProfile type
interface T_UserProfile {
    fid: string;
    username: string;
    pfpUrl: string;
    displayName: string;
    bio: string;
    verifications: any[]; // You might want to define a more specific type for verifications
}

interface IContext {
    userProfile: T_UserProfile | null,
    setUserProfile: React.Dispatch<React.SetStateAction<T_UserProfile | null>>
}

const value: IContext = {
    userProfile: null,
    setUserProfile: () => { },
}

const Context = createContext<IContext>(value)

interface ProviderProps {
    children: ReactNode
}

const UserContextProvider = ({ children }: ProviderProps) => {
    const { data: session, status } = useSession()

    const [userProfile, setUserProfile] = useState<T_UserProfile | null>(null)

    const fetchUser = async () => {
        if (session?.user) {
            setUserProfile({
                fid: session.user.name || '',
                username: session.user.name || '',
                pfpUrl: session.user.image || '',
                displayName: session.user.name || '',
                bio: '',
                verifications: []
            });
        }
    }

    useEffect(() => {
        if (status === "authenticated" && session && userProfile === null) {
            fetchUser()
        }
    }, [status, session, userProfile])


    // --------------------------------------------------------------------------------------------
    const exposed: IContext = {
        userProfile,
        setUserProfile,
    }

    return <Context.Provider value={exposed}>{children}</Context.Provider>
}

export const useUserContext = () => useContext(Context)
export default UserContextProvider
