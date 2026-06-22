'use client'
import { useState } from 'react'

export default function Home() {
  const [user, setUser] = useState(null)
  
  const login = async () => {
    try {
      const scopes = ['username', 'payments']
      const auth = await window.Pi.authenticate(scopes)
      setUser(auth.user)
    } catch (err) {
      alert('Login gagal: ' + err.message)
    }
  }

  if (!user) {
    return (
      <main className="text-center p-20">
        <h1 className="text-4xl font-bold mb-8">🏪 Mall Genesis</h1>
        <button onClick={login} className="bg-yellow-400 px-8 py-4 rounded-xl font-bold text-black">
          Login with Pi
        </button>
      </main>
    )
  }
  
  return <div className="text-center p-20">Halo @{user.username}! Siap jualan?</div>
          }
