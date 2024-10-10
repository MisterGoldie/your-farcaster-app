import './globals.css'
import { Rock_Salt } from 'next/font/google'

const rockSalt = Rock_Salt({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'POD Play Tic-Tac-Toe',
  description: 'A Tic-Tac-Toe game presented by /thepod',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={rockSalt.className}>
        {children}
      </body>
    </html>
  )
}
