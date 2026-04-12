import type { Metadata } from 'next'
import { IBM_Plex_Mono } from 'next/font/google'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'ATLAS — Web Design & SEO Agency',
    template: '%s | ATLAS',
  },
  description:
    'ATLAS builds websites that convert and search rankings that compound. Web design and SEO for businesses that want results.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://atlasagency.com'),
  openGraph: {
    type: 'website',
    siteName: 'ATLAS',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ATLAS',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://atlasagency.com',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://atlasagency.com'}/og-image.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-123-4567',
      contactType: 'customer service',
      email: 'hello@atlasagency.com',
    },
  }

  return (
    <html lang="en" id="top">
      <body
        className={`${ibmPlexMono.variable} font-mono antialiased`}
        style={{ backgroundColor: 'var(--atlas-white)', color: 'var(--atlas-black)' }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
