'use client'
import { useState, useEffect } from 'react'
import PiLoginButton from './components/PiLoginButton'

const KOSONG = { nama: '', ttl: '', pekerjaan: '', alamat: '', no_telpon: '', wa: '', gmail: '' }

export default function MyTrack() {
  const [user, setUser] = useState(null) // {user_id, pi_username}
  const [form, setForm] = useState(KOSONG)

  // 1. Pas login Pi berhasil -> auto load data dia dari HP ini
  const onLogin = (piUser) => {
    setUser(piUser)
    const key = `mytrack_${piUser.user_id}` // <--- kunci unik per Pi UID
    const saved = localStorage.getItem(key)
    setForm(saved? JSON.parse(saved) : KOSONG) // kalo belum ada = form kosong
  }

  // 2. Tombol Simpan -> cuma ke HP
  const handleSimpan = () => {
    if(!user) return alert('Login Pi dulu')
    const key = `mytrack_${user.user_id}`
    localStorage.setItem(key, JSON.stringify(form)) // <--- simpan ke HP
    alert(`✅ Tersimpan di HP ini untuk @${user.pi_username}`)
  }

  // 3. Tombol Export Backup -> biar gak hilang pas update Pi Browser
  const handleBackup = () => {
    const key = `mytrack_${user.user_id}`
    const data = localStorage.getItem(key)
    const blob = new Blob([data], {type: 'application/json'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `MyTrack_${user.pi_username}.json`; a.click()
  }

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value})

  if(!user) {
    return <div style={{padding:20, textAlign:'center'}}>
      <h1>My Track Pi</h1>
      <p>Data cuma nyimpen di HP kamu. 100% Privasi.</p>
      <PiLoginButton onLogin={onLogin} />
    </div>
  }

  return (
    <div style={{padding:20, maxWidth:500, margin:'auto'}}>
      <h2>Halo @{user.pi_username}</h2>
      <p style={{fontSize:12}}>Data ini cuma ada di HP ini aja</p>

      <input name="nama" placeholder="Nama Lengkap" value={form.nama} onChange={handleChange} style={inputStyle}/>
      <input name="ttl" placeholder="Tempat, Tanggal Lahir" value={form.ttl} onChange={handleChange} style={inputStyle}/>
      <input name="pekerjaan" placeholder="Pekerjaan" value={form.pekerjaan} onChange={handleChange} style={inputStyle}/>
      <input name="alamat" placeholder="Alamat Palembang" value={form.alamat} onChange={handleChange} style={inputStyle}/>
      <input name="no_telpon" placeholder="No Telpon" value={form.no_telpon} onChange={handleChange} style={inputStyle}/>
      <input name="wa" placeholder="No WA" value={form.wa} onChange={handleChange} style={inputStyle}/>
      <input name="gmail" placeholder="Gmail" value={form.gmail} onChange={handleChange} style={inputStyle}/>

      <button onClick={handleSimpan} style={{...inputStyle, background:'#ffc300'}}>Simpan di HP</button>
      <button onClick={handleBackup} style={{...inputStyle, background:'#eee'}}>Backup.json</button>
      <button onClick={() => setUser(null)} style={inputStyle}>Ganti Akun Pi</button>
    </div>
  )
}
const inputStyle = {display:'block', width:'100%', padding:10, margin:'8px 0', borderRadius:6, border:'1px solid #ccc'}
