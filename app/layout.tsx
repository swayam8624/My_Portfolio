import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/hooks/use-theme'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Swayam Singal - AI Developer & Researcher',
  description: 'AI Developer & Research Intern specializing in multi-agent systems, reinforcement learning, and cognitive AI',
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
