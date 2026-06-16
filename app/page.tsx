'use client'
import { useEffect, useState } from 'react'

declare global {
  interface Window {
    Pi: any
  }
}

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const loadSdk = async () => {
      if (!window.Pi) {
        const script = document.createElement('script')
        script.src = 'https://sdk.minepi.com/pi-sdk.js'
        script.async = true
        document.body.appendChild(script)
        await new Promise(resolve => script.onload = resolve)
      }
      await window.Pi.init({ version: "2.0", sandbox: false })
      setReady(true)
      handleLogin()
    }
    loadSdk()
  }, [])

  const handleLogin = async () => {
    try {
      const auth = await window.Pi.authenticate(['username'])
      const res = await fetch('/api/auth/pi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken: auth.accessToken })
      })
      const data = await res.json()
      if (res.ok) setUser(data.user)
      else alert('Auth failed: ' + data.error)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <main style={{ padding: 40, textAlign: 'center' }}>
      {!ready && <p>Loading Pi SDK...</p>}
      {ready && !user && (
        <button onClick={handleLogin} style={{ padding: '12px 24px', fontSize: 16 }}>
          Sign in with Pi
        </button>
      )}
      {user && <h2>Welcome, {user.username}!</h2>}
    </main>
  )
      }
