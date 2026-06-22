'use client'
import { useEffect } from 'react'
import './globals.css'

export default function RootLayout({ children }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Pi) {
      window.Pi.init({ version: "2.0", sandbox: true })
      console.log("Pi SDK initialized")
    }
  }, [])

  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
        <footer className="border-t mt-20 py-8 text-center text-sm text-gray-500">
          <div className="space-x-6 mb-2">
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
            <a href="/terms" className="hover:underline">Terms of Service</a>
          </div>
          <p>© 2026 Mall Genesis</p>
        </footer>
      </body>
    </html>
  )
      }
