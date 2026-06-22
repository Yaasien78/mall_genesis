import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { accessToken } = req.body
    
    // Verifikasi token ke server Pi
    const response = await fetch('https://api.minepi.com/v2/me', {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    
    if (!response.ok) {
      return res.status(401).json({ error: 'Token invalid' })
    }
    
    const user = await response.json()
    return res.status(200).json({ user }) // sukses
    
  } catch (error) {
    return res.status(500).json({ error: 'Server error' })
  }
      }
