'use client'

import { useState } from 'react'

declare global {
  interface Window {
    Pi: any;
  }
}

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 1. LOGIN - panggil pas klik tombol, JANGAN di useEffect
  const handleLogin = async () => {
    setLoading(true);
    try {
      // Init + Authenticate harus bareng pas user klik
      await window.Pi.init({ 
        version: "2.0", 
        sandbox: true // WAJIB true buat testnet
      })
      
      // Testnet pake scope username doang dulu biar gak stuck
      const scopes = ['username'];
      
      const auth = await window.Pi.authenticate(scopes, (payment: any) => {
        console.log("Incomplete payment:", payment.identifier)
      })
      
      setUser(auth.user);
      console.log("Login success:",
