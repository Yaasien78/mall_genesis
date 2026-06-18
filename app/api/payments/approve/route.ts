import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { paymentId } = await req.json()
  console.log("Opsi 10 - Approve:", paymentId)
  
  // Langsung OK, jangan ada await DB
  return NextResponse.json({ message: "Approved" }, { status: 200 })
}
