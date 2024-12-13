import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'
// import { ModeToggle } from '@/components/toggle-theme'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'npm install -g vercel-open',
  description: 'The vercel-open custom command extension for the Vercel CLI'
}

export default function RootLayout ({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <meta name='twitter:label1' content='installation' />
      <meta name='twitter:data1' content='npm install -g vercel-open'></meta>
      <body className='bg-black'>
        <a
          href='https://github.com/vercel-labs/vercel-open'
          target='_blank'
          rel='noopener noreferrer'
        >
          <ThemeProvider attribute='class' forcedTheme='dark' disableTransitionOnChange>
            {/* <ModeToggle /> */}
            {children}
          </ThemeProvider>
        </a>
      </body>
    </html>
  )
}
