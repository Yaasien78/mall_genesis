export async function POST(req: Request) {
  try {
    const { accessToken } = await req.json()

    if (!accessToken) {
      return Response.json({ error: 'No access token' }, { status: 400 })
    }

    // Verifikasi ke server Pi
    const userRes = await fetch('https://api.minepi.com/v2/me', {
      headers: { 
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }
    })

    if (!userRes.ok) {
      return Response.json({ error: 'Invalid token' }, { status: 401 })
    }

    const user = await userRes.json()
    
    // Sukses → Pi Browser bakal deteksi ini
    return Response.json({ 
      username: user.username,
      uid: user.uid 
    })

  } catch (err) {
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
      }
