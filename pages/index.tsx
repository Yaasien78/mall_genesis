import { useEffect, useState } from 'react'

export default function Home() {
  const [user, setUser] = useState<any>(null)

  // Load Pi SDK pas halaman dibuka
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://sdk.minepi.com/pi-sdk.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  const handleLogin = async () => {
    alert("1. Tombol kepencet")
    
    if(!window.Pi) {
      alert("2. Pi SDK belum ke-load. Buka dari Pi Browser ya")
      return
    }
    alert("3. Pi SDK kebaca")

    try {
      await window.Pi.init({ version: "2.0", sandbox: false })
      alert("4. Init sukses")
      
      const scopes = ['username', 'payments']
      const auth = await window.Pi.authenticate(scopes)
      alert("5. Dapat token")
      
      // Kirim ke backend buat verifikasi
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ accessToken: auth.accessToken })
      })
      
      if(res.ok) {
        const data = await res.json()
        setUser(data.user)
        alert("6. Login sukses: " + data.user.username)
      } else {
        alert("Gagal verifikasi token ke server")
      }
      
    } catch(e: any) {
      alert("ERROR: " + e.message)
    }
  }

  return (
    <div style={{padding: 20, textAlign: 'center'}}>
      <h1>🎨 NFT Social</h1>
      <p>bagi kreator NFT di Pi Network</p>
      
      {!user ? (
        <button 
          onClick={handleLogin}
          style={{padding: 12, fontSize: 16, cursor: 'pointer'}}
        >
          Login with Pi
        </button>
      ) : (
        <h2>Halo {user.username} 👋</h2>
      )}
    </div>
  )
      }
