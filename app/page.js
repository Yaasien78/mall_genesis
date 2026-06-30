'use client'
import { useState } from 'react'
import PiLoginButton from './components/PiLoginButton'

// GANTI LINK + GAMBAR IKLAN LU DISINI BRO
const ADS_DATA = [
  { 
    id: 1, 
    title: 'Jasa Undangan Digital Palembang', 
    img: 'https://i.imgur.com/8KmNpWb.png', 
    link: 'https://wa.me/62812xxxx' // Ganti no WA lu
  },
  { 
    id: 2, 
    title: 'Promo Toko HP Murah', 
    img: 'https://i.imgur.com/8KmNpWb.png', 
    link: 'https://wa.me/62812xxxx' 
  },
  { 
    id: 3, 
    title: 'Buka Jasa Desain Logo', 
    img: 'https://i.imgur.com/8KmNpWb.png', 
    link: 'https://wa.me/62812xxxx' 
  },
]

export default function MyTrackAds() {
  const [user, setUser] = useState(null)

  const onLogin = (piUser) => {
    setUser(piUser) // Cuma nyimpen username di memory doang
  }

  // HALAMAN 1: LOGIN PI
  if (!user) {
    return (
      <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:'100vh', fontFamily:'sans-serif', background:'#f0f0f0'}}>
        <h1 style={{marginBottom:8}}>My Track Ads</h1>
        <p style={{marginBottom:20}}>Login Pi untuk buka papan iklan</p>
        <PiLoginButton onLogin={onLogin} />
      </div>
    )
  }

  // HALAMAN 2: LANGSUNG KE ADS - Cuan Disini
  return (
    <div style={{padding:16, fontFamily:'sans-serif', background:'#f5f5f5', minHeight:'100vh'}}>
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
        <h2 style={{margin:0}}>Halo @{user.pi_username}</h2>
        <button onClick={() => setUser(null)} style={{padding:'8px 12px', border:'none', background:'#f44336', color:'#fff', borderRadius:8, cursor:'pointer'}}>Logout</button>
      </header>
      
      <h3 style={{margin:'0 0 12px 0'}}>Papan Iklan</h3>

      <div style={{display:'grid', gap:16}}>
        {ADS_DATA.map(ad => (
          <a key={ad.id} href={ad.link} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none', color:'inherit'}}>
            <div style={{background:'#fff', borderRadius:12, overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.1)'}}>
              <img src={ad.img} alt={ad.title} style={{width:'100%', display:'block'}} />
              <div style={{padding:12}}>
                <h4 style={{margin:0}}>{ad.title}</h4>
                <p style={{margin:'4px 0 0', fontSize:12, color:'#4CAF50', fontWeight:'bold'}}>Klik untuk Chat WA</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      <p style={{textAlign:'center', fontSize:12, color:'gray', marginTop:20}}>
        Mau pasang iklan di sini? Chat Admin
      </p>
    </div>
  )
}
