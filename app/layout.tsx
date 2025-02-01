import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Search Assistant',
  description: 'An AI-powered search assistant that analyzes and summarizes search results',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
