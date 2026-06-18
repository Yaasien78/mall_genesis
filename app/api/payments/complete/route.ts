import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { paymentId } = await req.json()
    console.log("Opsi 10 - Approve:", paymentId)
    
    // RULE 1: JANGAN ada await ke DB/supabase di sini
    // RULE 2: Langsung balas 200 OK. Pi cuma butuh ini
    
    return NextResponse.json({ 
      message: "Approved" 
    }, { status: 200 })
    
  } catch (e) {
    return NextResponse.json({ error: "fail" }, { status: 500 })
  }
}
