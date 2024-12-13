'use client'

import { Heading } from '@/components/heading'
import { Cursor } from '@/components/cursor'
import { Marquee } from '@/components/marquee'
import Snowfall from 'react-snowfall'

export default function Home () {
  return (
    <>
      <Marquee direction='left' position='top' />
      <main className='flex min-h-screen items-center justify-center bg-background text-foreground p-4 overflow-hidden relative border-8 border-foreground cursor-none'>
        <Snowfall snowflakeCount={50} style={{ position: 'fixed' }} />
        <Heading />
        <Cursor />
      </main>
      <Marquee />
    </>
  )
}
