'use client'
import { useEffect } from 'react'

export default function PiLoginButton({ onLogin }) {
  useEffect(() => {
    // Muat Script Pi SDK
    const script = document.createElement('script');
    script.src = "https://sdk.minepi.com/pi-sdk.js";
    script.async = true;
    document.body.appendChild(script);
    
    script.onload = () => {
      window.Pi.init({ version: "2.0", sandbox: false }); // sandbox: true kalo masih testnet
    }
  }, []);

  const login = async () => {
    try {
      const scopes = ['username']; // Cuma minta username doang
      const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
      onLogin({ pi_username: authResult.user.username, user_id: authResult.user.uid });
    } catch (error) {
      alert('Login Gagal: ' + error.message);
    }
  }

  const onIncompletePaymentFound = (payment) => {
    console.log('Incomplete payment:', payment);
  };

  return (
    <button onClick={login} style={{padding:'14px 24px', fontSize:18, fontWeight:'bold', background:'#ffc300', border:'none', borderRadius:12, cursor:'pointer'}}>
      Login dengan Pi
    </button>
  )
}
