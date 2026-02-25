export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const baseUrl = config.public.siteUrl
  const routes = [
    '/',
    '/services',
    '/services/welding',
    '/services/plumbing',
    '/services/construction',
    '/gallery',
    '/about',
    '/contact'
  ]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${baseUrl}${route}</loc></url>`).join('\n')}
</urlset>`

  setHeader(event, 'content-type', 'application/xml; charset=UTF-8')
  return body
})
