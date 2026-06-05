import { NextRequest, NextResponse } from 'next/server'

const FORMS = {
  brochure: {
    actionUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeyZKT_HuN-nWhPimdtMREroQ54FwOqQzzJhyBghXT0y22Xbw/formResponse',
    fields: { name: 'entry.662210046', mobile: 'entry.1767171215', email: 'entry.1019572093' },
  },
  enquiry: {
    actionUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdpMFwF3FozoJTsYJhhiD5rYM0c1HCWsdEY_pi-3hs80V9APQ/formResponse',
    fields: { name: 'entry.1069233328', mobile: 'entry.1820064998', email: 'entry.763039135' },
  },
  siteVisit: {
    actionUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeQZUxCFG0mYDVvTRXXWbVwOgPBQeP9Ft7zC8lU7XXh3DRJuw/formResponse',
    fields: { name: 'entry.353672268', mobile: 'entry.278393666', date1: 'entry.1651901983', date2: 'entry.697188075' },
  },
}

async function getFbzx(viewUrl: string): Promise<string | null> {
  try {
    const html = await fetch(viewUrl).then(r => r.text())
    // Hidden input has the value (sometimes negative); use absolute value as Google Forms JS does
    const m = html.match(/name="fbzx"\s+value="-?(\d+)"/)
    if (m) return m[1]
    // Fallback: find large number (17-19 digits) repeated 3+ times in the page data
    const nums = html.match(/\d{17,19}/g) ?? []
    const counts: Record<string, number> = {}
    for (const n of nums) counts[n] = (counts[n] ?? 0) + 1
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]
    return top ? top[0] : null
  } catch {
    return null
  }
}

export async function POST(req: NextRequest) {
  const { form, data } = await req.json()
  const config = FORMS[form as keyof typeof FORMS]
  if (!config) return NextResponse.json({ error: 'Unknown form' }, { status: 400 })

  const body = new URLSearchParams()
  for (const [key, entryId] of Object.entries(config.fields)) {
    let value = (data as Record<string, string>)[key]
    if (!value) continue
    // Google Forms rejects E.164 format — strip country code prefix
    if (key === 'mobile') value = value.replace(/^\+\d{1,3}/, '')
    // Date fields (YYYY-MM-DD) must be split into _year/_month/_day parts
    if ((key === 'date1' || key === 'date2') && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [year, month, day] = value.split('-')
      body.append(`${entryId}_year`, year)
      body.append(`${entryId}_month`, month)
      body.append(`${entryId}_day`, day)
      continue
    }
    body.append(entryId, value)
  }

  // Google Forms requires these session fields to actually record the response
  const viewUrl = config.actionUrl.replace('formResponse', 'viewform')
  const fbzx = (await getFbzx(viewUrl)) ?? String(Math.floor(Math.random() * 9e18))
  body.append('fvv', '1')
  body.append('pageHistory', '0')
  body.append('fbzx', fbzx)
  body.append('partialResponse', JSON.stringify([null, null, fbzx]))
  body.append('submissionTimestamp', Date.now().toString())

  console.log(`[lead] form=${form} fbzx=${fbzx} body=${body.toString()}`)
  const res = await fetch(config.actionUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
  console.log(`[lead] google response status=${res.status}`)

  return NextResponse.json({ ok: res.ok, status: res.status })
}
