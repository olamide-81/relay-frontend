import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Relay by Gratebridge',
    short_name: 'Relay',
    description: 'Every financial Provider. One directory.',
    start_url: '/en/dashboard',
    scope: '/',
    display: 'standalone',
    background_color: '#0f1011',
    theme_color: '#0f1011',
    icons: [
      { src: '/favicon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
