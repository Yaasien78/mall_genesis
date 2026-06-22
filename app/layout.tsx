import './globals.css'

export const metadata = {
  title: 'Mall Genesis - Marketplace Karya Digital',
  description: 'Jual beli NFT, ebook, musik pake Pi Coin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="min-h-screen flex-col">
        <main className="flex-1">
          {children}
        </main>
        
        <footer className="border-t mt-20 py-8 text-center text-sm text-gray-500">
          <div className="space-x-6 mb-2">
            <a href="/privacy" className="hover:underline hover:text-black">Privacy Policy</a>
            <a href="/terms" className="hover:underline hover:text-black">Terms of Service</a>
          </div>
          <p>© 2026 Mall Genesis. Dibuat pake Pi SDK</p>
        </footer>
      </body>
    </html>
  )
  }
