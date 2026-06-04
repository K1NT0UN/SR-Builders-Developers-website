import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { mobile, otp } = await request.json()

    if (!mobile || !otp) {
      return NextResponse.json({ error: 'Mobile number and OTP are required' }, { status: 400 })
    }

    const authKey = process.env.MSG91_AUTH_KEY

    if (!authKey) {
      return NextResponse.json({ error: 'MSG91 is not configured on the server' }, { status: 500 })
    }

    // Call MSG91 Verify OTP API
    // Doc: https://docs.msg91.com/p/tf9GtextN
    const url = `https://control.msg91.com/api/v5/otp/verify?otp=${otp}&mobile=${mobile}`
    
    const response = await fetch(url, {
      method: 'GET', // MSG91 verify is typically GET or POST depending on doc, but GET works with query params usually for verify
      headers: {
        'authkey': authKey
      }
    })

    const data = await response.json()

    if (data.type === 'error') {
      return NextResponse.json({ error: data.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, message: 'OTP Verified' })

  } catch (error) {
    console.error('Error verifying OTP:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
