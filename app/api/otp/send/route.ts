import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { mobile } = await request.json()

    if (!mobile) {
      return NextResponse.json({ error: 'Mobile number is required' }, { status: 400 })
    }

    const authKey = process.env.MSG91_AUTH_KEY
    const templateId = process.env.MSG91_TEMPLATE_ID

    if (!authKey || !templateId) {
      return NextResponse.json({ error: 'MSG91 is not configured on the server' }, { status: 500 })
    }

    // Call MSG91 Send OTP API
    // Doc: https://docs.msg91.com/p/tf9GtextN
    const url = `https://control.msg91.com/api/v5/otp?template_id=${templateId}&mobile=${mobile}`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'authkey': authKey,
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    if (data.type === 'error') {
      return NextResponse.json({ error: data.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, message: 'OTP Sent' })

  } catch (error) {
    console.error('Error sending OTP:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
