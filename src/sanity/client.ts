import {createClient} from '@sanity/client'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
})

export async function getSiteContent() {
  return client.fetch(`*[_type == "siteSettings"][0]`)
}
