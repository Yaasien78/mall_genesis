import { useEffect, useState } from 'react'

declare global {
  interface Window {
    Pi?: any
  }
}

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [sdkLoaded, setSdkLoaded] = useState(false)

  // Load Pi SDK aman SSR
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://sdk.minepi.com/pi-sdk.js'
    script.onload = () => setSdkLoaded(true)
    document.body.appendChild(script)
  }, [])

  const handleLogin = async () => {
    if (!sdkLoaded) {
      alert("Pi SDK masih loading, tunggu 1 detik")
      return
    }
    if (!window.Pi) {
      alert("Buka dari Pi Browser ya bang")
      return
    }

    try {
      await window.Pi.init({ version: "2.0", sandbox: false })
      const auth = await window.Pi.authenticate(['username', 'payments'])
      
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ accessToken: auth.accessToken })
      })
      
      if(res.ok) {
        const data = await res.json()
        setUser(data.user)
        // Alert dihapus, langsung ganti UI
      } else {
        alert("Login gagal: " + res.status)
      }
    } catch(e: any) {
      alert("ERROR: " + e.message)
    }
  }

  return (
    <div style={{padding: 20, textAlign: 'center', fontFamily: 'sans-serif', minHeight: '100vh', background: '#f8f9fa'}}>
      <h1>🎨 NFT Social</h1>
      <p style={{color: '#666'}}>bagi kreator NFT di Pi Network</p>
      
      {!user ? (
        <button 
          onClick={handleLogin} 
          style={{
            padding: '15px 30px', 
            fontSize: 16, 
            background: '#6c5ce7', 
            color: 'white',
            border: 'none',
            borderRadius: 10,
            cursor: 'pointer',
            marginTop: 30,
            fontWeight: 'bold'
          }}
        >
          Login with Pi
        </button>
      ) : (
        <div style={{marginTop: 40}}>
          <div style={{fontSize: 60}}>👋</div>
          <h2>Halo {user.username}!</h2>
          <p style={{color: '#888', fontSize: 14}}>
            Wallet ID: {user.uid?.slice(0,8)}...{user.uid?.slice(-8)}
          </p>
          <p style={{marginTop: 20}}>Selamat datang di NFT Social!</p>
          
          <button 
            style={{
              marginTop: 30, 
              padding: '12px 25px',
              background: '#00b894',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              fontSize: 15,
              cursor: 'pointer'
            }}
            onClick={() => alert("Fitur upload NFT coming soon 🔥")}
          >
            + Upload NFT Pertama
          </button>
        </div>
      )}
    </div>
  )
}
