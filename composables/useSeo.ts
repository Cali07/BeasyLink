const SITE_URL = 'https://beasylink-projects.co.za'

export const useSeo = ({
  title,
  description,
  path,
  image = '/images/beasylink-projects-og-image.svg'
}: {
  title: string
  description: string
  path: string
  image?: string
}) => {
  const canonical = `${SITE_URL}${path}`

  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: canonical },
      { property: 'og:image', content: `${SITE_URL}${image}` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: `${SITE_URL}${image}` }
    ],
    link: [{ rel: 'canonical', href: canonical }]
  })
}
