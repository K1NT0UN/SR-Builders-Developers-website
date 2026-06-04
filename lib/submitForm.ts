// Submit lead data to a Google Form via no-cors fetch.
// Data lands in the linked Google Sheet automatically.
// `no-cors` means we can't read the response, but Google records the submission silently.

export async function submitEnquiry(data: { name: string; mobile: string; email?: string }): Promise<void> {
  const { enquiryForm } = await import('./leadConfig')
  const body = new URLSearchParams()
  body.append(enquiryForm.fields.name, data.name)
  body.append(enquiryForm.fields.mobile, data.mobile)
  if (data.email) body.append(enquiryForm.fields.email, data.email)

  await fetch(enquiryForm.actionUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
}

export async function submitSiteVisit(data: { name: string; mobile: string; date1?: string; date2?: string }): Promise<void> {
  const { siteVisitForm } = await import('./leadConfig')
  const body = new URLSearchParams()
  body.append(siteVisitForm.fields.name, data.name)
  body.append(siteVisitForm.fields.mobile, data.mobile)
  if (data.date1) body.append(siteVisitForm.fields.date1, data.date1)
  if (data.date2) body.append(siteVisitForm.fields.date2, data.date2)

  await fetch(siteVisitForm.actionUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
}

export async function submitBrochure(data: { name: string; mobile: string; email?: string }): Promise<void> {
  const { brochureForm } = await import('./leadConfig')
  const body = new URLSearchParams()
  body.append(brochureForm.fields.name, data.name)
  body.append(brochureForm.fields.mobile, data.mobile)
  if (data.email) body.append(brochureForm.fields.email, data.email)

  await fetch(brochureForm.actionUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
}

// Legacy generic helper kept for backward compatibility
export async function submitToGoogleForm(
  actionUrl: string,
  fields: { name: string; mobile: string; email: string },
  data: { name: string; mobile: string; email?: string },
): Promise<void> {
  if (!actionUrl.startsWith('http')) return
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
