import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { paymentId } = await req.json()
  console.log("Opsi 10 - Approve:", paymentId)
  return NextResponse.json({ message: "Approved" }, { status: 200 })
}
