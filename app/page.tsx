"use client"
import { useEffect, useState } from "react"

// Biar TypeScript gak marah
declare global {
  interface Window {
    Pi: any
  }
}

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [isPiBrowser, setIsPiBrowser] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Cek Pi SDK udah ke-load belum
    const checkPi = setInterval(() => {
      if (window.Pi) {
        setIsPiBrowser(true)
        window.Pi.init({ 
          version: "2.0", 
          sandbox: true // ganti false kalo udah production
        })
        clearInterval(checkPi)
      }
    }, 100)

    return () => clearInterval(checkPi)
  }, [])

  const handleLogin = async () => {
    // 1. Kalo bukan Pi Browser
    if (!isPiBrowser) {
      alert("Buka app ini di Pi Browser ya bang!\nDownload di Play Store/App Store: Pi Browser")
      return
    }

    setLoading(true)
    try {
      // 2. Kalo di Pi Browser → Login
      const auth = await window.Pi.authenticate(
        ['username', 'payments'], 
        function(payment: any) {
          console.log('Payment incomplete:', payment)
        }
      )
      
      setUser(auth.user)
      console.log("User login:", auth.user)
      
    } catch (err) {
      console.error("Login error:", err)
      alert("Login gagal bang. Coba lagi")
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4">
      <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 text-center text-white max-w-md w-full shadow-2xl">
        
        <h1 className="text-4xl font-bold mb-4">🎨 NFT Social</h1>
        <p className="mb-8 text-white/90">
          bagi kreator NFT di jaringan Pi Network dan dapatkan hadiah
        </p>
        
        {!user ? (
          <>
            <button 
              onClick={handleLogin}
              disabled={loading}
              className="bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full w-full text-lg hover:bg-yellow-300 disabled:opacity-50 transition"
            >
              {loading ? "Loading..." : "Login with Pi"}
            </button>
            <p className="mt-4 text-sm">Belum login</p>
            
            {!isPiBrowser && (
              <p className="mt-2 text-xs text-yellow-200">
                ⚠️ Buka di Pi Browser untuk login
              </p>
            )}
          </>
        ) : (
          <div className="space-y-4">
            <p className="text-2xl font-bold">Halo {user.username}! 👋</p>
            <div className="bg-white/10 rounded-xl p-4 text-left text-sm">
              <p><b>UID:</b> {user.uid}</p>
              <p><b>Username:</b> {user.username}</p>
            </div>
            <button 
              onClick={() => setUser(null)}
              className="text-sm underline opacity-70 hover:opacity-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </main>
  )
        }
