import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'
// import { ModeToggle } from '@/components/toggle-theme'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'npm install -g vercel-open',
  description: 'The vercel-open custom command extension for the Vercel CLI',
  other: {
    ['twitter:label1']: 'Installation',
    ['twitter:data1']: 'npm install -g vercel-open'
  }
}

export default function RootLayout ({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='bg-black'>
        <a
          href='https://github.com/vercel-labs/vercel-open'
          target='_blank'
          rel='noopener noreferrer'
        >
          <ThemeProvider attribute='class' disableTransitionOnChange>
            {/* <ModeToggle /> */}
            {children}
          </ThemeProvider>
        </a>
      </body>
    </html>
  )
}
