import {useState, useEffect} from 'react'
import {getSiteContent} from './client'

export function useSiteContent() {
  const [content, setContent] = useState<any>(null)
  useEffect(() => {
    getSiteContent().then(setContent).catch(console.error)
  }, [])
  return content
}
