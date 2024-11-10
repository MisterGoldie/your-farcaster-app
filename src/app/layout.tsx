import { Inter } from "next/font/google"
import "./globals.css"
import CustomAuthWrapper from "./(AppWrap)/CustomAuthWrapper"
import UserContextProvider from "@/app/context/userContext" // Correct import path
import PageWrapper from '../components/layout/PageWrapper'

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomAuthWrapper>
          <UserContextProvider>
            <PageWrapper>
              {children}
            </PageWrapper>
          </UserContextProvider>
        </CustomAuthWrapper>
      </body>
    </html>
  )
}
