async function submitLead(form: string, data: Record<string, string | undefined>): Promise<void> {
  await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ form, data }),
  })
}

export async function submitEnquiry(data: { name: string; mobile: string; email?: string }): Promise<void> {
  await submitLead('enquiry', data)
}

export async function submitSiteVisit(data: { name: string; mobile: string; date1?: string; date2?: string }): Promise<void> {
  await submitLead('siteVisit', data)
}

export async function submitBrochure(data: { name: string; mobile: string; email?: string }): Promise<void> {
  await submitLead('brochure', data)
}
