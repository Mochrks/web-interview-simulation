import Navbar from '@/components/demo/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/demo/Footer'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Job Interview Simulator',
  description: 'Practice your interview skills with our modern simulator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

