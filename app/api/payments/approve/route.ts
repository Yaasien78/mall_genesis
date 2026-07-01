import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { paymentId } = await req.json();

    if (!paymentId) {
      return NextResponse.json({ error: 'paymentId kosong' }, { status: 400 });
    }

    const res = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PI_NETWORK_API_KEY}`, // Pastiin Bearer
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Approve Pi Error:', err);
      return NextResponse.json({ error: 'Approve gagal', detail: err }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });

  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error approve' }, { status: 500 });
  }
    }
