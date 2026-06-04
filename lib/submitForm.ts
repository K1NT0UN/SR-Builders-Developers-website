// POST a verified lead into a Google Form. Data lands in the linked Google Sheet.
// `no-cors` means we can't read the response, but Google records the submission.

type FieldMap = { name: string; mobile: string; email: string }

export async function submitToGoogleForm(
  actionUrl: string,
  fields: FieldMap,
  data: { name: string; mobile: string; email?: string },
): Promise<void> {
  if (!actionUrl.startsWith('http')) return // not configured yet — no-op
  const body = new URLSearchParams()
  body.append(fields.name, data.name)
  body.append(fields.mobile, data.mobile)
  if (data.email) body.append(fields.email, data.email)

  await fetch(actionUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
}
