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

export async function POST(req: NextRequest) {
  const { form, data } = await req.json()
  const config = FORMS[form as keyof typeof FORMS]
  if (!config) return NextResponse.json({ error: 'Unknown form' }, { status: 400 })

  const body = new URLSearchParams()
  for (const [key, entryId] of Object.entries(config.fields)) {
    const value = (data as Record<string, string>)[key]
    if (value) body.append(entryId, value)
  }

  const res = await fetch(config.actionUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })

  return NextResponse.json({ ok: res.ok, status: res.status })
}
