async function submitLead(form: string, data: Record<string, string | undefined>): Promise<void> {
  const res = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ form, data }),
  })
  if (!res.ok) throw new Error(`Lead submission failed (${res.status})`)
}

export async function submitEnquiry(data: { name: string; mobile: string; email?: string }): Promise<void> {
  await submitLead('enquiry', data)
}

export async function submitSiteVisit(data: { name: string; mobile: string; email?: string; date1?: string; date2?: string }): Promise<void> {
  await submitLead('siteVisit', data)
}

export async function submitBrochure(data: { name: string; mobile: string; email?: string }): Promise<void> {
  await submitLead('brochure', data)
}
