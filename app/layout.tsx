import Navbar from '@/components/demo/Navbar'
import { ThemeProvider } from "@/components/demo/theme-provider"
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/demo/Footer'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'INVSIM - Interview Apps Simulator',
  description: 'Master your interview skills with multi-stage simulation, voice interaction, and live coding challenges',
}

import SmoothScroll from '@/components/SmoothScroll'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <SmoothScroll>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html>
  )
}

