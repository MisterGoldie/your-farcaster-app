import NextAuth, { DefaultSession } from "next-auth"

// Define the base user properties
interface UserBase {
    fid: string
    pfpUrl: string
    username: string
    displayName: string
    bio: string
    verifications: `0x${string}`[]
}

declare module "next-auth" {
    interface User extends UserBase {}

    interface Session {
        user: User & DefaultSession["user"];
        cipheredParams: string;
        verifications: `0x${string}`[];
    }
}
